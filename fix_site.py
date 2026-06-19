import os, re

ROOT = "Astra"

DEPTH = {
    "index.htm": 0,
}

def depth_of(rel):
    # rel like 'about/index.htm' or 'Services/Software.htm' or 'career/srITEngineerInfra/index.htm'
    return rel.count("/")

def process(path, text):
    rel = os.path.relpath(path, ROOT).replace(os.sep, "/")
    d = depth_of(rel)
    pre = "../" * d
    orig = text

    # 1. Footer logo (missing files) -> existing logo
    text = text.replace("Astra-%20LETTER%20LOGO-02%2024-1.png", "AstraTech2.png")
    text = text.replace("Astra-%20LETTER%20LOGO-01%205-1.png", "AstraTech2.png")

    # 2. Remove missing responsive.css stylesheet link
    text = re.sub(r'<link\b[^>]*?responsive\.css[^>]*?>', '', text)

    # 3. Remove broken bare main.js script tag
    text = re.sub(r'<script\s+src="main\.js"[^>]*>\s*</script>', '', text)

    # 4. Mobile/site logo link index-1.htm -> homepage
    text = text.replace('href="index-1.htm"', 'href="%sindex.htm"' % pre)

    # 5. Mobile-menu EmbeddedSystems link missing prefix
    text = text.replace('href="Services/EmbeddedSystems.htm"',
                        'href="%sServices/EmbeddedSystems.htm"' % pre)

    # 6. Absolute paths -> relative (root-relative only works at domain root)
    text = text.replace('href="/Services/', 'href="%sServices/' % pre)
    text = text.replace('="/assets/', '="%sassets/' % pre)
    text = text.replace('href="/career/', 'href="%scareer/' % pre)

    # 7. Dead news/ pages -> about (Latest News already points to about elsewhere)
    text = text.replace('news/index.htm', 'about/index.htm')

    # ---- Page-specific ----
    if rel.startswith("Services/"):
        text = text.replace('src="../wp-content/uploads/2022/06/contact-page.png"',
                            'src="../assets/img/contact_us.png"')
        text = text.replace('src="../recaptcha/api.js"',
                            'src="https://www.google.com/recaptcha/api.js"')

    if rel == "Services/Software.htm":
        text = text.replace('src="../1144687/1902/i/450/depositphotos_19024147-stock-photo-drawing-city-over-book.jpg"',
                            'src="../assets/img/Software/3.jpg"')
        text = text.replace('src="../assets/img/Expert-Led%20Training.avif"',
                            'src="../assets/img/Software/7.webp"')
        text = text.replace('src="../managepro/assets/images/News/14530.png"',
                            'src="../assets/img/Software/8.png"')

    if rel == "courses/index.htm":
        text = text.replace('../../npm/', '../npm/')
        text = text.replace('../../_astro/', '../_astro/')
        text = text.replace('src="../tr?id=1881147869953396&ev=PageView&noscript=1"',
                            'src="https://www.facebook.com/tr?id=1881147869953396&ev=PageView&noscript=1"')

    if rel == "index.htm":
        # remove missing stylesheet + missing astro hydration scripts
        text = re.sub(r'<link\b[^>]*?styles/index\.css[^>]*?>', '', text)
        text = re.sub(r'<script type="module" src="_astro/index\.astro_astro_type_script[^"]*"></script>', '', text)

    if rel == "career/srITEngineerInfra/index.htm":
        # bare root-relative nav/asset links need ../../ at this depth
        text = re.sub(r'href="(about|Services|products|career|contact|courses)/',
                      r'href="../../\1/', text)
        text = re.sub(r'src="assets/', r'src="../../assets/', text)
        # footer logo had literal src=".."
        text = text.replace('<img src=".." alt="" width="200px">',
                            '<img src="../../assets/img/AstraTech2.png" alt="Astra Logo" width="200px">')
        # dead pages with no equivalent -> neutralize
        text = text.replace('../../schoolsolution/index.htm', '#')
        text = text.replace('../../collegesolution/index.htm', '#')
        text = text.replace('../../gallery/index.htm', '#')
        text = text.replace('href="gallery.html"', 'href="#"')
        text = text.replace('href=" - "', 'href="#"')
        # broken gallery images -> existing photos
        text = text.replace('src="../../asse-img7.JPG"', 'src="../../assets/img/working.jpg"')
        text = text.replace('src="../../assets/img/Fomg2.JPG"', 'src="../../assets/img/school.jpg"')
        text = text.replace('src="../../assets/.JPG"', 'src="../../assets/img/vision.jpeg"')
        text = text.replace('src="../../assets/img/.JPG"', 'src="../../assets/img/Self-learning.jpeg"')
        text = text.replace('src="../../assets/y/gallery-img5.JPG"', 'src="../../assets/img/weatherStation.jpg"')
        text = text.replace('src="../../assets/img6.jpg"', 'src="../../assets/img/working.jpg"')

    return text, (text != orig)

changed = []
for dp, _, fs in os.walk(ROOT):
    if 'node_modules' in dp:
        continue
    for f in fs:
        if f.endswith(('.htm', '.html')):
            p = os.path.join(dp, f)
            t = open(p, encoding='utf-8', errors='ignore').read()
            nt, ch = process(p, t)
            if ch:
                open(p, 'w', encoding='utf-8').write(nt)
                changed.append(os.path.relpath(p, ROOT).replace(os.sep, '/'))

print("Modified %d files:" % len(changed))
for c in sorted(changed):
    print("  ", c)
