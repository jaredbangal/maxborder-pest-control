# Brand assets

- `logo-original.png` — the artwork as supplied (2000×2000, RGB, **no alpha**).
- `logo-mark.svg` — the same mark traced to nine exact quadrilaterals, ~660 bytes.

The site uses the SVG, not the PNG. Two reasons:

1. The PNG has no transparency, so it would render a white box on the navy
   header and in dark mode.
2. The SVG paths use `currentColor`, so the mark takes the lifted orange on
   navy (where the base orange is only 3.1:1 against the ground) and the base
   orange on cream.

The live component is `client/src/components/ui/LogoMark.tsx`; `Logo.tsx` is the
mark plus wordmark lockup. To change the mark, edit the component — the favicon
(`client/public/favicon.svg`) and social image (`og-image.svg`) carry their own
copies of the same paths.

Traced geometry was verified against the original at 96.3% shape IoU; the
remainder is crop alignment in the comparison, not a difference in the shape.
