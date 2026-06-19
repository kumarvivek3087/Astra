#!/usr/bin/env bash
#
# local_run.sh — serve the Astra website locally for testing (WSL / Linux).
#
# The site is static .htm pages plus one PHP contact backend
# (contact/submit.php -> MySQL `contact_db`). PHP's built-in server serves
# both the static pages and the PHP endpoint, so it's all we need.
#
# Usage:
#   ./local_run.sh                 # start server on http://localhost:8000
#   ./local_run.sh --port 9000     # use a different port
#   ./local_run.sh --no-db         # skip the MySQL/contact-form setup
#   ./local_run.sh --db-only       # only (re)create the database, then exit
#   ./local_run.sh --no-install    # don't apt-install missing packages
#   ./local_run.sh -h | --help
#
# On first run it auto-installs php, php-mysqli and mariadb-server via apt
# (uses sudo if not root). Pass --no-install to disable that.
#
# Notes:
#   - Run this from inside WSL (e.g. `bash ./local_run.sh`), not Windows shell.
#   - The contact form needs PHP's mysqli extension + a running MySQL/MariaDB.
#     The DB step is best-effort: if it can't be set up, the rest of the site
#     still runs (only the contact form's submit will fail).

set -euo pipefail

# ---------------------------------------------------------------------------
# Config (override via flags or env vars)
# ---------------------------------------------------------------------------
HOST="${HOST:-localhost}"
PORT="${PORT:-8000}"
DB_NAME="${DB_NAME:-contact_db}"
DB_USER="${DB_USER:-root}"          # matches contact/submit.php
DB_PASS="${DB_PASS:-}"              # submit.php uses an empty password
SETUP_DB=1
DB_ONLY=0
INSTALL=1                          # auto-install missing packages via apt
APT_PACKAGES=(php php-cli php-mysqli mariadb-server mariadb-client)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Docroot = the folder that contains index.htm + contact/submit.php.
# The site is sometimes singly-nested (Astra/) and sometimes doubly (Astra/Astra/),
# so probe known candidates first, then fall back to a search.
DOCROOT="${DOCROOT:-}"
if [[ -z "$DOCROOT" ]]; then
    for cand in \
        "$SCRIPT_DIR" \
        "$SCRIPT_DIR/Astra" \
        "$SCRIPT_DIR/Astra/Astra"; do
        if [[ -f "$cand/index.htm" && -f "$cand/contact/submit.php" ]]; then
            DOCROOT="$cand"; break
        fi
    done
fi
# Fallback: search up to 4 levels deep for the right index.htm.
if [[ -z "$DOCROOT" ]]; then
    hit="$(find "$SCRIPT_DIR" -maxdepth 4 -name index.htm \
            -execdir test -f contact/submit.php \; -print 2>/dev/null | head -n1)"
    [[ -n "$hit" ]] && DOCROOT="$(dirname "$hit")"
fi
if [[ -z "$DOCROOT" || ! -f "$DOCROOT/index.htm" ]]; then
    echo "ERROR: could not locate the site's index.htm under $SCRIPT_DIR." >&2
    echo "       Set it explicitly:  DOCROOT=/path/to/site ./local_run.sh" >&2
    exit 1
fi
DOCROOT="$(cd "$DOCROOT" && pwd)"
ROUTER="$SCRIPT_DIR/router.php"
SQL_FILE="$DOCROOT/contact/createDB.sql"

# ---------------------------------------------------------------------------
# Args
# ---------------------------------------------------------------------------
while [[ $# -gt 0 ]]; do
    case "$1" in
        --port)    PORT="$2"; shift 2 ;;
        --no-db)      SETUP_DB=0; shift ;;
        --db-only)    DB_ONLY=1; shift ;;
        --no-install) INSTALL=0; shift ;;
        -h|--help)
            # Print the leading comment header (stop at the first non-comment line).
            awk 'NR==1{next} /^#/{sub(/^# ?/,""); print; next} {exit}' "${BASH_SOURCE[0]}"
            exit 0 ;;
        *) echo "Unknown option: $1" >&2; exit 1 ;;
    esac
done

log()  { printf '\033[1;34m[run]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[warn]\033[0m %s\n' "$*" >&2; }
err()  { printf '\033[1;31m[err]\033[0m %s\n' "$*" >&2; }

# ---------------------------------------------------------------------------
# Dependency install / checks
# ---------------------------------------------------------------------------
# Run a command as root: directly if we already are, else via sudo.
as_root() {
    if [[ "${EUID:-$(id -u)}" -eq 0 ]]; then
        "$@"
    elif command -v sudo >/dev/null 2>&1; then
        sudo "$@"
    else
        err "need root to run: $*  (install sudo or run as root)"
        exit 1
    fi
}

ensure_packages() {
    local missing=()
    command -v php >/dev/null 2>&1 || missing+=(php php-cli)
    php -m 2>/dev/null | grep -qi '^mysqli$' || missing+=(php-mysqli)
    command -v mysql >/dev/null 2>&1 || command -v mariadb >/dev/null 2>&1 || missing+=(mariadb-server mariadb-client)

    if [[ ${#missing[@]} -eq 0 ]]; then
        return 0
    fi

    if [[ "$INSTALL" -eq 0 ]]; then
        warn "Missing packages: ${missing[*]} (auto-install disabled via --no-install)."
        return 0
    fi

    if ! command -v apt-get >/dev/null 2>&1; then
        err "apt-get not found. Install these manually: ${APT_PACKAGES[*]}"
        exit 1
    fi

    log "Installing missing packages: ${APT_PACKAGES[*]}"
    as_root apt-get update -y
    as_root env DEBIAN_FRONTEND=noninteractive apt-get install -y "${APT_PACKAGES[@]}"
}

ensure_packages

if ! command -v php >/dev/null 2>&1; then
    err "php still not found after install. Install manually: sudo apt-get install -y php php-mysqli"
    exit 1
fi
log "php: $(php -v | head -n1)"

if ! php -m | grep -qi '^mysqli$'; then
    warn "PHP 'mysqli' extension is missing — contact/submit.php will fail."
    warn "Install with:  sudo apt-get install -y php-mysqli"
fi

# ---------------------------------------------------------------------------
# Database setup (best-effort)
# ---------------------------------------------------------------------------
find_mysql() {
    if command -v mysql   >/dev/null 2>&1; then echo "mysql";   return 0; fi
    if command -v mariadb >/dev/null 2>&1; then echo "mariadb"; return 0; fi
    return 1
}

setup_database() {
    local client
    if ! client="$(find_mysql)"; then
        warn "No mysql/mariadb client found — skipping DB setup (contact form won't store submissions)."
        warn "Install with:  sudo apt-get install -y mariadb-server"
        return 0
    fi

    # Make sure the server is running (ignore failures — may need sudo / systemd).
    if ! "$client" -u"$DB_USER" ${DB_PASS:+-p"$DB_PASS"} -e 'SELECT 1;' >/dev/null 2>&1; then
        log "Trying to start the database service..."
        sudo service mysql start    >/dev/null 2>&1 || \
        sudo service mariadb start  >/dev/null 2>&1 || \
        warn "Could not auto-start MySQL/MariaDB. Start it manually if the contact form is needed."
    fi

    log "Importing schema from contact/createDB.sql ..."
    # createDB.sql is idempotent only on first run (CREATE DATABASE/TABLE).
    # Guard so re-runs don't abort the script.
    if "$client" -u"$DB_USER" ${DB_PASS:+-p"$DB_PASS"} < "$SQL_FILE" 2>/tmp/astra_db_err; then
        log "Database '$DB_NAME' ready."
    elif "$client" -u"$DB_USER" ${DB_PASS:+-p"$DB_PASS"} -e "USE $DB_NAME; SELECT 1 FROM contacts LIMIT 1;" >/dev/null 2>&1; then
        log "Database '$DB_NAME' already exists — continuing."
    else
        warn "DB import failed (see below). The site will run, but contact-form submits will error."
        sed 's/^/      /' /tmp/astra_db_err >&2 || true
    fi
    rm -f /tmp/astra_db_err
}

if [[ "$SETUP_DB" -eq 1 ]]; then
    setup_database
fi

if [[ "$DB_ONLY" -eq 1 ]]; then
    log "--db-only: database step done, exiting."
    exit 0
fi

# ---------------------------------------------------------------------------
# Serve
# ---------------------------------------------------------------------------
cat <<EOF

  Astra website is starting...

    URL:        http://$HOST:$PORT/
    Docroot:    $DOCROOT
    Test pages: /  /about/  /products/  /courses/  /career/  /contact/

  Press Ctrl+C to stop.

EOF

exec php -S "$HOST:$PORT" -t "$DOCROOT" "$ROUTER"
