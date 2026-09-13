"""Regression pass for the MaxBorder site. Rerun this instead of writing a new harness.

    python3 tools/qa/regress.py                                         # local dev (vite on :5173)
    python3 tools/qa/regress.py https://maxborder-pest-control.vercel.app

Checks every live page at desktop and phone width (status, console errors,
horizontal overflow, header/footer logo), the retired-page redirects, wording
the business can't back up, the quote API, and the theme-matched drawer logo.
A valid quote is only submitted locally so production never gets test leads.
"""
import json
import sys
import urllib.error
import urllib.request

from playwright.sync_api import sync_playwright

BASE = (sys.argv[1] if len(sys.argv) > 1 else "http://localhost:5173").rstrip("/")
LOCAL = "localhost" in BASE or "127.0.0.1" in BASE

PAGES = ["/", "/services", "/services/general-pest-control", "/services/rodent-control",
         "/services/mosquito-control", "/about", "/contact", "/privacy"]

REDIRECTS = {"/residential": "/services", "/commercial": "/services", "/plans": "/services",
             "/pests": "/services", "/coverage": "/services", "/how-it-works": "/services",
             "/service-areas": "/", "/faqs": "/contact",
             "/services/mosquito-tick-flea": "/services/mosquito-control"}

# Claims the Fall/Winter 2026 update removed. Matched case-insensitively against visible text.
FORBIDDEN = ["guarantee", "termite", "bed bug", "wildlife", "lawn care", "texas", "42,000", "3,800",
             "4.9", "retention", "free return", "re-service", "non-toxic", "harmless", "100%",
             "pest-free", "eliminat", "certified", "state approved", "since 2009", "fifteen years",
             "fortress", "vanguard", "sentry", "same-day", "48 hour", "48hr", "commercial",
             "free inspection", "most popular", "emergency", "mosquito-free"]

ASSETS = ["/favicon.svg", "/apple-touch-icon.png", "/og-image.png", "/sitemap.xml",
          "/brand/maxborder-on-dark.svg", "/brand/maxborder-on-light.svg"]

fails = []


def check(cond, msg):
    if not cond:
        fails.append(msg)


def post(path, body):
    req = urllib.request.Request(BASE + path, data=json.dumps(body).encode(), method="POST",
                                 headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return r.status, json.load(r)
    except urllib.error.HTTPError as e:
        return e.code, json.load(e)


for path in ASSETS:
    try:
        code = urllib.request.urlopen(BASE + path, timeout=15).status
    except Exception as e:  # noqa: BLE001 — report whatever went wrong
        code = str(e)
    check(code == 200, f"asset {path} -> {code}")

# Quote API: the new required fields are enforced server-side.
code, res = post("/api/quote", {"name": "QA Check", "email": "qa@example.com", "phone": "8015550134"})
missing = set(res.get("fields", {}))
check(code == 400 and {"address", "serviceSlug", "problem", "activityLocation", "preferredTime"} <= missing,
      f"quote without required fields -> {code} {sorted(missing)}")
if LOCAL:
    code, res = post("/api/quote", {
        "name": "QA Check", "email": "qa@example.com", "phone": "8015550134",
        "address": "123 Main St, Layton UT 84041", "serviceSlug": "not-sure", "problem": "Mice",
        "activityLocation": "Garage", "preferredTime": "Weekday mornings", "petsChildren": "One dog"})
    check(code == 201, f"valid quote -> {code} {res}")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    for width in (1440, 390):
        page = browser.new_page(viewport={"width": width, "height": 900})
        errors = []
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))

        for path in PAGES:
            errors.clear()
            resp = page.goto(BASE + path, wait_until="networkidle")
            check(resp.status == 200, f"{width} {path} status {resp.status}")
            info = page.evaluate("""() => {
              const hdr = document.querySelector('header [role=img]');
              const img = hdr && [...hdr.querySelectorAll('img')].find(i => i.offsetParent);
              const ftr = document.querySelector('footer [role=img] img');
              return {
                hdr: !!img && img.complete && img.naturalWidth > 0 && img.getAttribute('src').endsWith('on-dark.svg'),
                ftr: !!ftr && ftr.complete && ftr.naturalWidth > 0,
                overflow: document.documentElement.scrollWidth > innerWidth,
                text: document.body.innerText.toLowerCase(),
              };
            }""")
            check(info["hdr"], f"{width} {path} header logo not rendered")
            check(info["ftr"], f"{width} {path} footer logo not rendered")
            check(not info["overflow"], f"{width} {path} horizontal overflow")
            check(not errors, f"{width} {path} console: {errors[:2]}")
            if width == 1440:
                hits = [w for w in FORBIDDEN if w in info["text"]]
                check(not hits, f"{path} still says: {hits}")
                if path == "/":
                    for price in ("starting at $149", "starting at $199", "starting at $79", "fall pest specials"):
                        check(price in info["text"], f"home missing '{price}'")
        page.close()

    page = browser.new_page(viewport={"width": 1440, "height": 900})
    for old, new in REDIRECTS.items():
        page.goto(BASE + old, wait_until="networkidle")
        landed = page.evaluate("location.pathname")
        check(landed == new, f"redirect {old} -> {landed} (want {new})")
    page.close()

    # The drawer's ground flips with the theme, so its logo must too.
    page = browser.new_page(viewport={"width": 390, "height": 800})
    for theme, want in (("light", "on-light"), ("dark", "on-dark")):
        page.goto(BASE + "/", wait_until="networkidle")
        page.evaluate(f"document.documentElement.setAttribute('data-theme', '{theme}')")
        page.get_by_role("button", name="Open menu").click()
        page.wait_for_timeout(500)
        src = page.evaluate("""() => {
          const logo = document.querySelector('[role=dialog] [role=img]');
          const img = logo && [...logo.querySelectorAll('img')]
            .find(i => getComputedStyle(i).display !== 'none' && i.naturalWidth > 0);
          return img && img.getAttribute('src');
        }""")
        check(bool(src) and want in src, f"drawer logo in {theme} mode: {src}")
    page.close()
    browser.close()

if fails:
    print("FAIL\n  " + "\n  ".join(fails))
    sys.exit(1)
print(f"PASS: {len(PAGES)} pages x 2 widths, {len(REDIRECTS)} redirects, wording scan, quote API, drawer logo, {len(ASSETS)} assets")
