import os, re, html, sys
from urllib.parse import unquote

root = sys.argv[1] if len(sys.argv) > 1 else "."
htmls = []
for dp, _, fs in os.walk(root):
    if 'node_modules' in dp:
        continue
    for f in fs:
        if f.endswith(('.htm', '.html')):
            htmls.append(os.path.join(dp, f))

attr_re = re.compile(r'(?:href|src)\s*=\s*"([^"]*)"')

def is_external(u):
    return u.startswith(('http://', 'https://', 'mailto:', 'tel:', '#', 'data:', 'javascript:'))

missing = {}
for h in htmls:
    txt = open(h, encoding='utf-8', errors='ignore').read()
    txt = re.sub(r'<!--.*?-->', '', txt, flags=re.S)  # ignore commented-out links
    base = os.path.dirname(h)
    for raw in attr_re.findall(txt):
        u = html.unescape(raw).split('#')[0].split('?')[0].strip()
        if not u or is_external(raw):
            continue
        u = unquote(u)
        target = os.path.normpath(os.path.join(base, u))
        if not os.path.exists(target):
            missing.setdefault(h, set()).add(raw)

for h in sorted(missing):
    print("\n### " + h.replace(os.sep, '/'))
    for raw in sorted(missing[h]):
        print("    " + raw)
print("\nFiles with missing refs: %d" % len(missing))
