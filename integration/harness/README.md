# Integration harness

Renders `integration/package-page.html` **inside the live site's own stylesheet**,
next to control elements that deliberately reuse the parent's class names
(`.footer`, `.price`, `.media`, `.hero`, `.section`, `.box`, `.card`, `.pill`, …).

If any control element changes appearance when `thinkmcq-package.css` is toggled,
the scoping has leaked.

## Running it

Drop three files in this folder (not committed — they belong to the live site
and to Bootstrap):

    parent-thinkmcq.css      # the live site's stylesheet
    bootstrap.min.css        # whatever version the live site actually serves
    bootstrap.bundle.min.js  # ditto

then serve the repo root and open `/integration/harness/`.

## What it checks

- computed-style diff of every parent-owned element, with the new stylesheet
  enabled vs disabled (must be zero differences)
- carousel arrows + dots
- exam pill selection and dropdown sync, both directions
- drawer open/close from the hero trigger and the CTA trigger
- sticky bar appearing only under 520px
- z-index of drawer / backdrop / site nav
