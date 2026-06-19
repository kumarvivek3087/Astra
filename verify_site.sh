#!/usr/bin/env bash
# Smoke test of the locally-served site after fixes.
base="http://localhost:8000"
check() {
  local code
  code=$(curl -s -o /dev/null -w '%{http_code}' "$base$1")
  printf '%s  %s\n' "$code" "$1"
}
echo "== Pages (expect 200) =="
for p in / /about/ /products/ /courses/ /career/ /contact/ /privacy/ /terms/ \
         /Services/Software.htm /Services/Training.htm /Services/EmbeddedSystems.htm \
         /Services/PCBDesign.htm /Services/ProjectConsultancy.htm /Services/RnD.htm \
         /Services/AcademicGuidance.htm /career/srITEngineerInfra/; do
  check "$p"
done
echo "== Previously-broken assets now fixed (expect 200) =="
check "/assets/img/AstraTech2.png"
check "/assets/img/contact_us.png"
check "/assets/img/Software/3.jpg"
check "/assets/img/Software/7.webp"
check "/assets/img/Software/8.png"
echo "== Contact form POST -> submit.php (expect 302 success) =="
curl -s -o /dev/null -w 'HTTP %{http_code} -> %{redirect_url}\n' \
  -d "name=Smoke&phone=123&email=smoke@test.com&subject=Hi&message=Hello after fixes" \
  "$base/contact/submit.php"
echo "== Contact form POST with bad email (expect 302 error) =="
curl -s -o /dev/null -w 'HTTP %{http_code} -> %{redirect_url}\n' \
  -d "name=Bad&phone=1&email=notanemail&subject=x&message=y" \
  "$base/contact/submit.php"
echo "== Rows now in contact_db.contacts =="
mysql -uroot -e "SELECT COUNT(*) AS rows_in_contacts FROM contact_db.contacts;" 2>/dev/null || echo "(could not query DB)"
