# First Step Cleaning

Marketing site for First Step Cleaning, LLC — post-construction, unit turnover, and residential cleaning based in Lakeland, FL. Live at [firststepcleaning1.com](https://firststepcleaning1.com).

## Stack

Plain HTML, CSS, and vanilla JavaScript. No build step, no framework, no package manager — every page is static and can be opened directly or served as-is.

- `index.html`, `about.html`, `services.html`, `residential.html`, `work.html`, `contact.html`, `legal.html` — the site's 7 pages. Each repeats its own `<head>`, header, and footer markup (no templating layer), so a change to shared chrome (nav links, footer columns, the JSON-LD business block) needs to be applied to every page individually.
- `styles.css` — all styles, one file, organized top to bottom roughly in page order (reset/variables → header/nav → hero → per-section styles → footer → responsive breakpoints → a few trailing feature-specific blocks).
- `main.js` — all behavior, one file, loaded on every page. Section comments (`// ---------- Name ----------`) mark each independent piece (header scroll state, mobile menu, scroll reveal, particle field, magnetic buttons, the sticky mobile action bar, the before/after sliders, the two Netlify-backed forms). Most blocks no-op harmlessly on pages that don't have the element they target.
- `images/` — `crew/` (team photos), `residential/` (before/after and finished-space photos used on the residential page), `work/` (portfolio photos). Every file in here is referenced from at least one page.

## Local development

No install step. From the repo root:

```
python3 -m http.server 8000
```

then open `http://localhost:8000/index.html`. Opening the HTML files directly (`file://`) mostly works too, but a local server is more accurate for anything that fetches or paths off the page origin.

## Deployment

GitHub Pages, building from `main`. `CNAME` points the custom domain (`firststepcleaning1.com`) at it — pushing to `main` deploys automatically, no CI workflow to trigger manually.

**Forms:** both forms on `contact.html` (`quoteForm`, `feedbackForm`) are marked up for Netlify Forms (`data-netlify="true"`), and `main.js` posts to them via `fetch`. That only works if this repo (or its `main` branch output) is also connected to a Netlify site — Netlify has to see the build to register the forms. If form submissions aren't arriving, that connection is the first thing to check.

## Structured data

`LocalBusiness` / `HomeAndConstructionBusiness` JSON-LD is inlined in the `<head>` of every indexed page (all but `legal.html`, which is `noindex`). It's the same block duplicated six times rather than templated — deliberately: static, page-embedded JSON-LD is what search/AI crawlers reliably see, and a JS-injected version risks not being picked up. If the business details change (phone, address, service catalog), update all six.

## Where things stand

`PUNCH-LIST.md` tracks in-progress and proposed work — what's shipped, what's blocked on real data (pricing, service-area confirmation), and what's intentionally deferred.
