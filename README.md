# thinkMCQ — Package Landing Page

Static, responsive landing page for a thinkMCQ package (built out as the
**Pediatric Surgery** package, code D33). Bootstrap 5 for layout primitives,
the offcanvas drawer and the carousel; everything visual comes from the
brand token stylesheet.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | The page. |
| `assets/css/brand.css` | Brand tokens (palette, type, radius) + every component style. |
| `assets/js/app.js` | Exam-selection sync, carousel dots, mobile nav, Buy Now. |

## Running it

Any static server, e.g.:

```
npx http-server -p 8080 .
```

Bootstrap 5.3.3 and the Montserrat/Lato webfonts load from CDN, so the page
needs network access on first paint. To run fully offline, vendor
`bootstrap.min.css` / `bootstrap.bundle.min.js` into `assets/vendor/` and
repoint the two tags in `index.html`.

## Brand

- `--red` `#CC3627` — the logotype red ("MCQ" and the "!"). Carries price,
  buttons, selected states, kickers, step numbers, card accents.
- `--amber` `#FFC107` — secondary accent for discount/urgency moments.
- `--green` `#28A745` — used once, for the WhatsApp button.
- Montserrat for display/UI, Lato for body copy.

## Sections

Top bar → hero (carousel + price + exam selector + Buy Now) → bento
"What's inside" → dark CTA band with exam pills → "Why purchase" (Study /
Master / Experience / Gain) → overview video → footer. Plus a
"How to purchase" offcanvas drawer (6 steps + video + WhatsApp) and a
mobile-only sticky Buy Now bar below 520px.

The three exam selectors — hero dropdown, CTA pills, sticky bar — are bound
to one value, so a choice made in any of them survives a scroll to another.

## Wiring up for real

These are the deliberate placeholders:

- **Buy Now** navigates to `/cart/add?package=D33&exam=<code>` — point this
  at the real add-to-cart endpoint in `assets/js/app.js`.
- **Carousel slides** are styled text panels; drop in real package imagery.
- **Videos** log to console on click — swap in the real embed.
- **Screenshots** in the drawer are labelled placeholder boxes.
- **WhatsApp number**, cart count and nav/footer hrefs are stubs.

## Breakpoints

1440 desktop → 980 tablet (nav collapses to a toggle, bento to 2 columns)
→ 520 mobile (single column, sticky Buy Now bar). Verified with no
horizontal overflow at 1440 / 834 / 390.
