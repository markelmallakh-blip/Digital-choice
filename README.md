# Digital Choice — website

A static site (HTML/CSS/JS) built with GSAP 3.13 (ScrollTrigger, SplitText and Flip) and Lenis smooth scrolling.

## Pages
| Page | Source | Notes |
| --- | --- | --- |
| `index.html` | `src/pages/index.html` | Home: preloader, hero, logo zoom-through, services, horizontal work, process, founders, contact |
| `services.html` | `src/pages/services.html` | Five services with a sticky index, engagement models, FAQ |
| `work.html` | `src/pages/work.html` | Filterable project grid (GSAP Flip) |
| `case.html?p=<slug>` | `src/pages/case.html` | One template for every case study, filled from `js/data.js` |
| `about.html` | `src/pages/about.html` | Belief, stats, logo equation, values, founders, team |
| `contact.html` | `src/pages/contact.html` | Direct lines and the brief form; `?service=web` pre-selects a service |

## Editing
- **Do not edit the root `.html` files.** They are generated. Edit `src/pages/*` and `src/partials/*`, then run:
  ```bash
  python3 build.py
  ```
- Shared pieces: `src/partials/` holds the nav and menu (`chrome.html`), `footer.html`, `founders.html`, `cta-band.html`, the logo symbols (`symbols.html`) and the preloader (`loader.html`).
- Projects and case-study copy live in `js/data.js`. Add an object there and it shows up on Home, Work and its own case page.
- Styles: `css/style.css` (design system and home page) and `css/pages.css` (inner pages).

## Preview
```bash
python3 -m http.server 5173
```
Then open http://localhost:5173. Press **G** on any page to show the Swiss grid lines more strongly.

## Before launch
- Confirm or replace the placeholder stats (120+, 9, 4.7x, 98%), the ★5.0 rating and the case-study results.
- Confirm `hello@digitalchoice-eg.com`, add the social links (currently `#`) and connect both forms to a backend (`buildForms()` in `js/main.js`).
- Drop the photoshoot images into the team, founder and member placeholders.
- Add Crafted and Animarise visuals and fix the basembahaa.com screenshot; the site returned a server error when it was captured.
