import os

ROOT = "Astra"

DESC = {
    "about/index.htm": "Learn about Astra Embedded and AI Technologies LLP, a Pune-based company delivering IoT, embedded systems, software, PCB design, training and R&D solutions.",
    "career/index.htm": "Explore careers at Astra Technologies. Join our team building IoT, embedded systems, AI and software solutions in Pune.",
    "privacy/index.htm": "Privacy Policy for Astra Embedded and AI Technologies LLP - how we collect, use and protect your information.",
    "products/index.htm": "Explore products by Astra Technologies - embedded, IoT and AI-driven hardware and software solutions.",
    "terms/index.htm": "Terms and Conditions for using the Astra Embedded and AI Technologies LLP website and services.",
    "career/srITEngineerInfra/index.htm": "Sr. IT Engineer (Infrastructure) opening at Astra Embedded and AI Technologies LLP, Hadapsar, Pune. Apply now.",
}

def add_desc(rel, desc):
    p = os.path.join(ROOT, rel)
    t = open(p, encoding="utf-8", errors="ignore").read()
    if 'name="description"' in t:
        return False
    meta = '<meta name="description" content="%s">' % desc
    if "</title>" in t:
        t = t.replace("</title>", "</title>" + meta, 1)
        open(p, "w", encoding="utf-8").write(t)
        return True
    return False

changed = []
for rel, desc in DESC.items():
    if add_desc(rel, desc):
        changed.append(rel)

# courses page: no <title> and no description; head is minimal.
cp = os.path.join(ROOT, "courses/index.htm")
ct = open(cp, encoding="utf-8", errors="ignore").read()
if "<title>" not in ct:
    head = ('<title>Courses Offered | Astra Technologies</title>'
            '<meta name="description" content="Explore courses offered by Astra Technologies in '
            'embedded systems, IoT, AI/ML, robotics and software development.">')
    ct = ct.replace('<meta charset="UTF-8">', '<meta charset="UTF-8">' + head, 1)
    open(cp, "w", encoding="utf-8").write(ct)
    changed.append("courses/index.htm (title+desc)")

print("Updated:")
for c in changed:
    print("  ", c)
