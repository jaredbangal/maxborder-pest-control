# Brand assets

**Not currently used by the site.** The header was reverted to the wordmark-only
lockup; these files are kept so the mark can be reinstated without redoing the work.

- `logo-original.png` — the artwork as supplied (2000×2000, RGB, **no alpha**).
- `logo-mark.svg` — the same mark traced to nine exact quadrilaterals, ~660 bytes,
  verified against the original at 96.3% shape agreement.

If it goes back in, use the SVG rather than the PNG. Two reasons:

1. The PNG has no transparency, so it renders a white box on the navy header
   and in dark mode.
2. The SVG paths take `currentColor`, so the mark can pick up the lifted orange
   on navy — the base orange is only 3.1:1 against that ground.

Size it at **44px or larger**. The internal gaps are ~2.4% of the mark's width,
so below that they fall under a device pixel and the cube structure closes up
into a solid blob.
