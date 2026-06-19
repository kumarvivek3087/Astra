<?php
/**
 * Router for PHP's built-in dev server (php -S ... router.php).
 *
 * Why this exists:
 *  - The site uses `index.htm` (not index.html/index.php) as the directory
 *    index. The built-in server won't auto-serve `index.htm` for a directory
 *    request like `/` or `/about/`, so we map those here.
 *  - Real files (.htm assets, css, js, images) and .php scripts are handed
 *    back to the server by returning `false`, so it serves/executes them
 *    normally.
 */

$docroot = realpath($_SERVER['DOCUMENT_ROOT']);
$reqPath = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$full    = realpath($docroot . $reqPath);

// Outside docroot or non-existent: let the server return its own 404.
if ($full === false || strpos($full, $docroot) !== 0) {
    return false;
}

// Directory request -> serve its index.htm if present.
if (is_dir($full)) {
    $index = $full . DIRECTORY_SEPARATOR . 'index.htm';
    if (is_file($index)) {
        header('Content-Type: text/html; charset=UTF-8');
        readfile($index);
        return true;
    }
}

// Existing file (static asset or .php): let the built-in server handle it.
return false;
