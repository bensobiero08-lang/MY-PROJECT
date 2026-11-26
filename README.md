# Ythera Beauty Atelier — website

Website for Ythera Beauty Atelier, Nyingi House, Shop G5B, Kihunguro (opposite Mark Hotel), Ruiru.
Nails, make-up, bridal, lashes, brows and piercing, with bookings sent on WhatsApp (0740 131 544).

It is a plain static site: no build step, no frameworks. Open `index.html` in a browser to preview it.

## Folders

```
index.html            the website (all pages: Home, Services, Videos, Studio, Care & FAQ, Contact)
css/styles.css        look and layout (pink palette, fonts, spacing)
js/script.js          prices, videos, FAQ, booking panel and WhatsApp message
assets/img/           photos, logo, favicon and the printed rate card
assets/video/         compressed salon videos (.mp4) and their cover images (.jpg)
tools/                build-review.ps1: makes a single-file copy for reviewers
vercel.json           hosting settings for Vercel (image/video caching)
```

Kept on this computer only (listed in `.gitignore`, not uploaded):

```
_source/              full-size WhatsApp videos, old logos, screenshots, original rate card
_archive/             earlier prototype pages
dist/                 generated review file
```

## Common changes

- **Prices or services:** edit the `GROUPS` list at the top of `js/script.js`. The rate card, category cards,
  menus and booking totals all update from it.
- **Videos:** add the compressed `.mp4` and a cover `.jpg` with the same name to `assets/video/`,
  then add a line to the `REELS` list in `js/script.js`.
- **FAQ:** edit the `FAQ` list in `js/script.js`.
- **WhatsApp number:** `WA_NUMBER` in `js/script.js`, plus the links in `index.html`.

## Review copy

To make one HTML file with everything inside (for sending on WhatsApp or Drive):

```
powershell -ExecutionPolicy Bypass -File tools\build-review.ps1
```

It is saved to `dist/ythera-website-review.html`.

## Hosting

- **Vercel:** import the GitHub repo, Framework Preset "Other", leave Root Directory as the repo root.
- **GitHub Pages:** Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
