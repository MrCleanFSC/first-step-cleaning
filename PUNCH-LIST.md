# Punch List — What's Next

Working list for the 8 upgrades demoed in the "What's Next" showcase. Check items off as they ship. Grouped Now → Next → Later, same as the showcase. Nothing here requires a rebuild — every item layers onto the 7 pages that already exist.

**Before starting:** a few items need real information from you that I can't invent — flagged inline as `NEEDS FROM YOU`. Send those over whenever, they don't block the other items.

---

## Now (small lift, ship this pass)

### [ ] 1. Interactive before/after slider
Replace the static side-by-side `.v-pair` before/after cards with a drag-to-reveal slider.

- **Touches:** `styles.css` (new `.reveal-slider` component), `main.js` (drag logic), `residential.html`, `about.html`
- **Real pairs available today:** `tile-before/after.jpg` and `fence-before/after.jpg` in `residential.html` — these are true matched pairs (currently rendered as two side-by-side `<img>`s inside `.v-pair`) and convert cleanly.
- **Not convertible as-is:** `tub-ba.jpg` and `tile-ba.jpg` are already single pre-composited before/after images, not two separate photos — leave those as-is, or reshoot as pairs later.
- **Steps:**
  1. Build one reusable slider component (markup + CSS + JS) — the showcase demo is a working reference implementation.
  2. Swap the `tile` and `fence` `.v-pair` blocks in `residential.html` for the slider markup.
  3. Same treatment for the "Our True Visionaries" gallery in `about.html` if it has matched pairs (check current photo set).

### [ ] 2. Magnetic CTA buttons
Subtle cursor-pull + press feedback on primary buttons.

- **Touches:** `main.js` only (styles already exist on `.btn-primary`)
- **Steps:**
  1. Add a mousemove/mouseleave handler scoped to `.btn-primary` (or a new `.magnetic` class) that nudges `transform: translate()` toward the cursor within ~100px, springs back on leave.
  2. Guard the whole thing behind the existing `reduceMotion` flag at the top of `main.js` — it's already there, just reuse it.
- **Effort:** ~20 lines of JS, no new files.

### [ ] 3. Native scroll-driven reveals
Progressive CSS upgrade over the current `IntersectionObserver` reveal system — not a replacement, a fallback-safe layer on top.

- **Touches:** `styles.css` only
- **Steps:**
  1. Add a `@supports (animation-timeline: view())` block that redefines `.reveal` to animate via `animation-timeline: view()` instead of relying purely on the `.in-view` class.
  2. Leave `main.js`'s `IntersectionObserver` code untouched — it still runs and still adds `.in-view`, which is harmless overlap and serves as the fallback for browsers without support (older Firefox, older Safari).
- **Effort:** ~6 lines of CSS.

### [ ] 4. Cross-document view transitions
Smooth morph between pages instead of a hard reload, on all 7 pages at once.

- **Touches:** `styles.css` only (shared across every page)
- **Steps:**
  1. Add `@view-transition { navigation: auto; }` near the top of `styles.css`.
  2. Optionally add `view-transition-name: site-logo` to `.brand-mark` so the logo morphs in place across pages instead of just cross-fading.
- **Effort:** one line to start. This is the cheapest item on the whole list for the impact it has.
- **Note:** Chrome/Edge 126+ and Safari 18.2+ animate it; everything else just does a normal navigation — no fallback code needed, it degrades safely on its own.

### [ ] 5. Sticky mobile action bar
Persistent Call / Text / Quote bar in thumb reach on mobile.

- **Touches:** `main.js` (inject the bar markup on load — one change, applies to all 7 pages automatically since `main.js` is already loaded everywhere) + `styles.css` (bar styles, `@media (max-width: 640px)`)
- **Steps:**
  1. In `main.js`, append the bar's HTML to `document.body` on load, hidden above `640px` via CSS.
  2. Style as `position: sticky; bottom: 0;` matching `.btn-primary` gold for the Quote action.
- **`NEEDS FROM YOU`:** the phone number to use for `tel:` and `sms:` links — homepage schema already lists **(863) 440-4121**, confirm that's the one to expose publicly for one-tap dialing (it already is, on the contact page).

### [ ] 6. Extend structured data to the other 6 pages
**Smaller than the showcase implied** — `index.html` already has a solid `LocalBusiness`/`HomeAndConstructionBusiness` JSON-LD block with real name, phone, email, address (Lakeland, FL), founder, and a 6-item offer catalog. It's just missing from `about.html`, `services.html`, `residential.html`, `work.html`, `contact.html`, and `legal.html`.

- **Touches:** `<head>` of the 6 pages missing it
- **Steps:**
  1. Copy the existing JSON-LD block from `index.html` into the other 5 content pages (skip `legal.html`, low value there).
  2. On `services.html`, expand `hasOfferCatalog` to the full 6 services already listed on that page (Post-Construction Cleanup, Unit Turnover Cleaning, Amenity & Common Area Detailing, Office & Commercial Cleanout, Punch-List & Touch-Up Cleaning, Move-In Ready Certification) — homepage currently lists fewer.
  3. Consider adding `Service` schema per offering on `services.html` for richer eligibility in AI answers.
- **Effort:** mostly copy-paste + one expanded list. Low risk, no design impact.

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
