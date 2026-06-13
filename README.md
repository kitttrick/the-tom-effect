# The Tom Effect — Photography Portfolio

Personal portfolio site for [The Tom Effect](https://ttephoto.co.uk), a car photography side hustle based near Guildford, Surrey. Built from scratch to replace a slow, generic photography site.

Live at: **ttephoto.co.uk**

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| HTML/CSS/JS | Vanilla, no framework | Performance — no bundle overhead |
| Fonts | Google Fonts (Big Shoulders Display, Bebas Neue, Space Grotesk) | Loaded via `<link rel="preconnect">` to minimise render-blocking |
| Icons | Font Awesome 6 (CDN) | Footer social icons only |
| Contact form | [Formspree](https://formspree.io) | Zero-backend form submission — no server required |
| Background FX | HTML Canvas (vanilla JS) | Animated rain effect — canvas chosen over CSS for frame rate control |
| Hosting | Vercel | Free tier, auto-deploy on push to `main`, custom domain support |

---

## Project structure

```
the-tom-effect/
├── index.html              # Single-page app — all tabs live here
├── css/
│   └── style.css           # All styles, organised by component
├── js/
│   └── main.js             # Rain animation, lightbox, tab switching, form handler
├── images/
│   ├── tte-logo.PNG        # Logo — do not rename or move
│   ├── favicon.PNG         # Favicon — do not rename or move
│   └── portfolio/
│       ├── 01.jpg          # Portfolio images, sequentially numbered
│       └── ...20.jpg
├── setup.sh                # Image copy/rename script (see below)
└── .gitignore
```

---

## Design decisions

**Performance first.** The previous site took approximately two minutes to load. This build uses no frameworks, no build step, and no external dependencies beyond fonts and EmailJS. All portfolio images use native lazy loading (`loading="lazy"`), so only visible images load on page open.

**Single page, tabbed navigation.** Portfolio, Pricing, and Contact are separate tab panels toggled by vanilla JS — no routing, no scroll jacking.

**Aesthetic direction.** "Tokyo on a rainy night" — dark, moody, neon-accented. Primary accent colour is mint (`#c7ffe8`). The animated canvas background simulates rain with two layers (distant and close-range drops) at different speeds, opacities, and widths to give depth. Neon drops (mint/cyan glow) appear at low frequency to keep it atmospheric rather than distracting.

**One-directional border glow on nav and footer.** `box-shadow` spreads in all directions, which caused glow to bleed into the header above the nav. Solved by removing `box-shadow` from the element and using a `::after` pseudo-element (a thin absolutely-positioned div) at the bottom of the nav only. Same technique used for the footer top border.

**No backend.** The contact form submits via EmailJS using `emailjs.sendForm()`. Field names in the HTML (`user_name`, `user_email`, `message`) must match the EmailJS template variable names exactly.

**Images in the repo.** For simplicity, portfolio images are committed directly. If the portfolio grows significantly, consider migrating to Cloudinary or similar.

---

## Adding or changing portfolio images

Images live in `images/portfolio/` and are referenced sequentially in `index.html` as `01.jpg` through `20.jpg`.

To replace or add images, update `setup.sh` with the new filenames and re-run it from the project root:

```bash
chmod +x setup.sh && ./setup.sh
```

The script copies images from `~/Documents/toms images for webby/` and renames them to the numbered format the site expects.

**Always compress images before committing.** Original camera files can be 20–33MB each — far too large for web. After running `setup.sh`, compress the portfolio folder with ImageMagick:

```bash
cd images/portfolio
for img in *.jpg; do
  convert "$img" -resize "2000x2000>" -quality 82 -strip "$img"
done
```

This resizes anything larger than 2000px on its longest side, strips embedded metadata, and applies quality 82 compression — bringing files down to roughly 200KB–1.2MB without visible quality loss. Original full-res files are kept separately and are not affected.

If adding more than 20 images, add new `<div class="portfolio-item">` entries to the portfolio grid in `index.html` to match.

---

## Contact form (Formspree)

The contact form submits to Formspree via a `fetch` POST — no backend, no SDK, no auth tokens to expire. The endpoint is set in `js/main.js`:

```js
fetch('https://formspree.io/f/maqzlrqo', { ... })
```

Formspree forwards submissions to `thetomeffect@gmail.com`. If the Formspree account or form ever needs to change, update the endpoint URL in `handleSubmit` in `main.js`.

If the form errors, a fallback message automatically appears below the submit button with a direct mailto link to `thetomeffect@gmail.com`.

---

## Deployment

Hosted on Vercel, auto-deployed from the `main` branch. To deploy manually or set up from scratch:

1. Import the repo at [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Other** (it's a static site)
3. No build command needed — output directory is `/` (root)
4. Add custom domain `ttephoto.co.uk` in Vercel project settings, then update DNS at the domain registrar

---

## Local development

No build step required. Just open `index.html` in a browser, or run a simple local server:

```bash
npx serve .
```
