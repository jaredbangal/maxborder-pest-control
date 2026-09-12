# Brand assets

## What's here

- `kit/` — the logo kit exactly as supplied (hexagon M mark + MAXBORDER / PEST
  CONTROL lockup, light- and dark-ground versions, PNG and SVG). Treat it as the
  source of truth; never edit it in place.
- `archive/` — the previous M badge (`m-badge-original.png`, `m-badge-traced.svg`),
  kept for reference only. Nothing on the site uses it.

## Colors (from the kit)

| Role                          | Hex       |
| ----------------------------- | --------- |
| Mark + "MAX"                  | `#EF8B4C` |
| Lettering on a light ground   | `#12203A` |
| Lettering on a dark ground    | `#F7F3EA` |
| Light ground in the previews  | `#FFFDF8` |

The site's UI orange (`#C2410C`, the `orange` token) is darker than the logo
orange. That's on purpose: the UI orange carries white text and has to pass
contrast, and the logo art uses the kit's colours as supplied. Keep the two
separate.

## What the site uses

Everything the site serves lives in `client/public/`:

| File                                  | Used for                                                    |
| ------------------------------------- | ----------------------------------------------------------- |
| `brand/maxborder-on-dark.svg`         | Header and footer (always navy), dark-mode drawer and loaders |
| `brand/maxborder-on-light.svg`        | Light-mode drawer and loaders, noscript fallback            |
| `brand/maxborder-mark-on-dark.svg`    | Mark only, for dark grounds                                 |
| `brand/maxborder-mark-on-light.svg`   | Mark only, for light grounds                                |
| `favicon.svg`                         | Browser tab: mark on a rounded navy tile                    |
| `apple-touch-icon.png`                | iOS home screen (180×180, full-bleed navy)                  |
| `og-image.png`                        | Link previews on social apps and messages (1200×630)        |

`client/src/components/ui/Logo.tsx` renders the lockup. `variant="light"` is
for surfaces that are navy in both themes and always shows the on-dark art. The
default variant renders both versions and CSS in `styles/index.css`
(`.logo-on-light-ground` / `.logo-on-dark-ground`) shows the one that matches
the current theme.

## Why the site files aren't the kit files

The kit SVGs are traced from a 2048×512 raster: about 12,500 points and 220 KB
each (64 KB gzipped, which is bigger than the PNG), with a lot of empty canvas
around the artwork. The web versions are the same two paths per file with
three changes:

1. Points thinned from 12,548 to 654 (Ramer–Douglas–Peucker, tolerance 0.45
   units).
2. The viewBox cropped to the artwork (`0 0 1534 347` for the lockup,
   `0 0 298 347` for the mark) so the logo lines up with the edge of the page.
3. Coordinates rounded to one decimal.

Result: about 8 KB per file (about 3 KB gzipped).

Measured against the kit file, rendered at full size (1534 px wide):

| Version                  | Orange match | Lettering match |
| ------------------------ | ------------ | --------------- |
| Kit, cropped only        | 99.5%        | 99.9%           |
| Web file (tolerance 0.45)| 95.6%        | 98.4%           |

The first row is the measurement's noise floor. The differences sit along the
edges, less than half a unit out. The header draws the logo at 212 px wide and
the social image at 560 px, so on the site the edges move by less than 0.2 px,
which you can't see. Nothing was clipped by the crop.

If you ever print the logo large (signage, vehicle wraps, shirts), use the
files in `kit/`, not the web versions.

## Changing the logo

1. Put the new kit in `kit/`.
2. Regenerate the four `client/public/brand/*.svg` files.
3. Regenerate `favicon.svg`, `apple-touch-icon.png` and `og-image.png`, which
   each carry their own copy of the mark.
4. If the aspect ratio changes, update `LOCKUP` in `Logo.tsx` and the
   `width`/`height` on the noscript `<img>` in `client/index.html`.
