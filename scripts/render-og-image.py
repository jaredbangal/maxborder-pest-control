"""Renders client/public/og-image.png, the 1200x630 link-preview card.

    python3 scripts/render-og-image.py

Edit SUBLINE (or the markup) and rerun whenever the card's wording changes.
Needs Playwright with Chromium, plus network access for the Google Fonts.
"""
import pathlib
import tempfile

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
LOCKUP = ROOT / "client/public/brand/maxborder-on-dark.svg"
OUT = ROOT / "client/public/og-image.png"

SUBLINE = "Licensed Utah pest control &middot; Serving Davis &amp; Salt Lake Counties"

HTML = f"""<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Karla:wght@500&display=swap" rel="stylesheet">
<style>
  body {{ margin: 0; width: 1200px; height: 630px; background: #12203A; position: relative;
         overflow: hidden; font-family: Karla, sans-serif; }}
  .ring {{ position: absolute; border-radius: 50%; }}
  .outer {{ left: 705px; top: -90px; width: 640px; height: 640px; border: 2px dashed rgba(239,139,76,.35); }}
  .inner {{ left: 787px; top: 12px; width: 430px; height: 430px; border: 1.5px dotted rgba(247,243,234,.25); }}
  img {{ position: absolute; left: 90px; top: 95px; width: 560px; }}
  h1 {{ position: absolute; left: 90px; top: 268px; margin: 0; font: 62px/1.02 'Archivo Black', sans-serif;
        color: #F7F3EA; letter-spacing: -0.5px; }}
  h1 span {{ color: #EF8B4C; }}
  .rule {{ position: absolute; left: 90px; top: 440px; width: 88px; height: 4px; background: #EF8B4C; }}
  p {{ position: absolute; left: 90px; top: 468px; margin: 0; font-size: 22px; color: rgba(247,243,234,.72); }}
</style></head><body>
  <div class="ring outer"></div><div class="ring inner"></div>
  <img src="{LOCKUP.as_uri()}" alt="">
  <h1>Pests stop at<br>the <span>border</span>.</h1>
  <div class="rule"></div>
  <p>{SUBLINE}</p>
</body></html>"""

with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False) as f:
    f.write(HTML)
    page_path = pathlib.Path(f.name)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1200, "height": 630})
    page.goto(page_path.as_uri(), wait_until="networkidle")
    page.evaluate("document.fonts.ready")
    page.screenshot(path=str(OUT))
    browser.close()

page_path.unlink()
print(f"wrote {OUT.relative_to(ROOT)} ({OUT.stat().st_size // 1024} KB)")
