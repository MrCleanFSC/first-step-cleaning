# Punch List — What's Next

Working list for the 8 upgrades demoed in the "What's Next" showcase. Check items off as they ship. Grouped Now → Next → Later, same as the showcase. Nothing here requires a rebuild — every item layers onto the 7 pages that already exist.

**Before starting:** a few items need real information from you that I can't invent — flagged inline as `NEEDS FROM YOU`. Send those over whenever, they don't block the other items.

---

## Now (small lift, ship this pass)

### [x] 1. Interactive before/after slider — **shipped**
Replaced the static side-by-side `.v-pair` cards with a drag-to-reveal slider for the two true matched pairs: **stone tile** and **fence** (both in `residential.html`).

- Reusable `.reveal-slider` component in `styles.css`, drag/keyboard logic in `main.js` (works for any number of sliders on a page, each independent).
- **Left as-is, on purpose:** `tub-ba.jpg` and `tile-ba.jpg` are pre-composited single images, not separate photos — can't slide without a reshoot.
- **Also left as-is:** the "Our True Visionaries" pairs on `about.html` (Stacey front/back, JB & Chris front/back) — those are front/back shirt shots, not dirty→clean transformations, so a slider doesn't fit the content. No change made there.
- Verified: both sliders drag independently, arrow-key nudge works, no console errors.

### [x] 2. Magnetic CTA buttons — **shipped**
Cursor-pull + press feedback added to every `.btn-primary` site-wide via `main.js`, guarded behind the existing `reduceMotion` flag. `.btn-primary`'s transition in `styles.css` was tightened (`.18s` spring easing) so the pull reads as snappy rather than laggy.

### [x] 3. Native scroll-driven reveals — **shipped**
Added the `@supports (animation-timeline: view())` layer over `.reveal` in `styles.css`. The `IntersectionObserver` in `main.js` is untouched and still runs as the fallback for browsers without support.

### [x] 4. Cross-document view transitions — **shipped**
`@view-transition { navigation: auto; }` added near the top of `styles.css` — applies to all 7 pages at once. Also scoped `view-transition-name: site-logo` to the **header** logo only (`#siteHeader .brand-mark`) — it had to be scoped, not applied to `.brand-mark` generally, since the footer logo shares that class and two elements sharing one `view-transition-name` on the same page is invalid and silently kills the transition.

### [x] 5. Sticky mobile action bar — **shipped**
Bar is injected by `main.js` into every page (`document.body`), styled in `styles.css` under `@media (max-width: 640px)`. Uses `position: fixed` rather than the originally-planned `sticky` — for a bar appended directly to `<body>`, `fixed` is the reliable choice; `sticky` doesn't behave predictably at that level. Links use the real number from the homepage schema: `tel:+18634404121` / `sms:+18634404121`. "Quote" links to `contact.html#quoteForm`, which jumps straight to the form. Body gets 58px of bottom padding on mobile so the bar never covers content, and it auto-hides while the full-screen mobile nav is open.

### [x] 6. Extend structured data to the other 6 pages — **shipped**
Copied the `LocalBusiness` JSON-LD block from `index.html` into `about.html`, `services.html`, `residential.html`, `work.html`, and `contact.html` (`legal.html` skipped — it's already `noindex`, confirmed in its own `<meta name="robots">`). Also caught and fixed a real gap while doing this: **Pressure Washing** is an actual service on `residential.html` but was missing from the offer catalog entirely — added it everywhere, so the catalog is now 9 services + the free-estimate offer, consistent on every indexed page. Validated: all 6 JSON-LD blocks parse as valid JSON.

---

## Next (worth a scoped sprint)

### [ ] 7. Instant ballpark quote estimator
Live price range on `contact.html`, above the existing quote form.

- **Touches:** `contact.html` (markup, reusing existing `.field`/`select` styling), `main.js` (calc logic), `styles.css` (estimator panel)
- **`NEEDS FROM YOU`:** real per-unit rate ranges by project type. The showcase demo used placeholder numbers (`$38–$48/unit`) purely to show the interaction — do not ship those live. Send over actual ballpark pricing per project type (New Apartment Community, Condominium Development, Office/Commercial, Mixed-Use, New-Construction/Move-In Home) and I'll wire it in.
- **Steps:** build once rates are confirmed; keep the "Ballpark only — final quote after walkthrough" disclaimer, it protects you from someone holding you to an estimate.

### [ ] 8. Live recent-activity strip
Rotating "Unit 214 turned over 3 hrs ago" line near the homepage stats.

- **Touches:** `index.html` (markup near `.stats`), `main.js` (rotation logic + data)
- **`NEEDS FROM YOU`:** a decision on how this gets fed. Two options:
  - **Manual:** you (or whoever manages the site) edits a small JSON array after each completed job. Zero infrastructure, but it's only as fresh as someone remembers to update it.
  - **Semi-automatic:** a simple form/spreadsheet that generates the JSON file, so it doesn't require touching code.
  - Flag which you'd rather have — a ticker that goes stale reads worse than no ticker at all.

### [ ] 9. Speculation Rules prerendering
One block that prerenders a page when someone hovers its nav link, so the click feels instant.

- **Touches:** `styles.css`/head — actually a `<script type="speculationrules">` block, likely easiest added once and referenced, or inlined per page
- **Effort:** low, but sequenced after the others since it's pure performance polish, not visible functionality.

---

## Later (bigger investment)

### [ ] 10. Scroll-driven case study page
One flagship project (a real turnover) told as a single scrolling before → during → after narrative. New page, not a retrofit — needs photo/video selection and copy before any code.

### [ ] 11. AI concierge for developer/PM questions
Only worth doing if it's trained on real answers about your actual capacity, turnaround times, and service area — not a generic bolt-on chatbot. Bigger scope: needs a content pass (a real FAQ/knowledge base) before it's a chatbot.

---

## Open questions before I start building

1. **Sticky mobile bar** — OK to use (863) 440-4121 for tap-to-call/text publicly? *(It's already public on the contact page, so likely yes — just confirming.)*
2. **Quote estimator** — what are real ballpark per-unit/per-project rates by project type?
3. **Activity ticker** — manual JSON updates, or do you want a lighter-weight way to feed it?

None of these block items 1–6 above — those are ready to build now with what's already in the repo.
