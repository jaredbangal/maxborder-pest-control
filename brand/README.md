# Brand assets

- `logo-original.png` — the artwork as supplied (2000×2000, RGB, **no alpha**).
- `logo-mark.svg` — the same badge traced to a plate plus a 14-vertex
  letterform, ~350 bytes, verified against the original at 99.3% shape agreement.

The site uses the SVG, not the PNG. The PNG has no transparency and its black
canvas is opaque, so dropping it into the header would draw a black box around
the badge. As paths, the plate and the letter each take a palette token, so the
badge renders correctly on the navy header and in both themes.

The live component is `client/src/components/ui/LogoMark.tsx`; `Logo.tsx` is the
badge plus wordmark lockup. The favicon (`client/public/favicon.svg`) and the
social image (`og-image.svg`) carry their own copies of the same path, so a
change to the mark needs updating in those two files as well.
