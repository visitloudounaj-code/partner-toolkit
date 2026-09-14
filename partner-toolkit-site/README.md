# Visit Loudoun — 2026 Partner Toolkit (Web)

A static, single-page web version of the Visit Loudoun 2026 Partner Toolkit, built
in plain HTML and CSS using Visit Loudoun brand colors and typography.

**Audience:** Loudoun tourism partners — wineries, breweries, lodging, restaurants,
attractions, venues and wedding professionals.

---

## Contents

| Path | Purpose |
|------|---------|
| `index.html` | The entire site. One page, six anchored sections. |
| `assets/css/styles.css` | All styling. Brand palette is defined as CSS custom properties at the top. |
| `assets/js/nav.js` | Highlights the sticky nav link for the section in view. Progressive enhancement — the site works fully without it. |
| `assets/img/` | Drop logo and photography here. Currently empty. |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. |

No build step, no dependencies, no framework. Open `index.html` in a browser and it works.

---

## Sections

1. **Brand** — DC's Wine Country® brand study, logo files, tagline usage rules, ways to use the brand
2. **Website** — DTN advertising, event submission, Extranet, listings, image submission
3. **Social Media & Media** — all Visit Loudoun channels, hashtags, PR contact
4. **Programs** — membership, newsletter, Loudoun Deals, Threshold 360, Love Loudoun Wedding Showcase, CTA certification, Loudoun.Live
5. **Contacts** — Visit Loudoun staff by area of responsibility
6. **Visitor Services** — Visitor Center and printed guides

---

## Publishing to GitHub Pages

1. Create a repository and push this folder's contents to the root of the default branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose **Deploy from a branch**, select your default branch and the `/ (root)` folder.
4. Save. The site publishes at `https://<org-or-user>.github.io/<repo>/` within a minute or two.

The `.nojekyll` file is already included so GitHub Pages serves the `assets/` folder
without running Jekyll over it.

---

## Brand implementation notes

### Colors

The full Visit Loudoun palette is declared as CSS custom properties in
`assets/css/styles.css`. Each section is assigned an accent from the palette:

| Section | Accent |
|---------|--------|
| Brand | DeepMerlot `#77092E` |
| Website | EarthyNoir `#3E495B` |
| Social & Media | ClearSky `#608FBB` |
| Programs | RipeVine `#325A1E` |
| Contacts | BoldSage `#7B8F86` |
| Visitor Services | ToastyBrick `#9D5950` |

Lighter accents (ClearSky, BoldSage, ToastyBrick) are paired with a darkened
`--accent-ink` variant wherever they carry text, so body and link contrast stays
legible. The accent itself is used for borders and rules.

### Typography

- **Headlines — Lora.** Loaded free from Google Fonts. This is the brand's primary serif.
- **Body — Acumin Pro, falling back to Arial.** Acumin Pro is Adobe-licensed and cannot
  be self-hosted here, so the site loads the substitution the Visit Loudoun brand
  guidelines already document: Acumin Pro → Arial.

**To load real Acumin Pro**, add an Adobe Fonts web project containing Acumin Pro,
whitelist the GitHub Pages domain in that project, then add the kit `<link>` to the
`<head>` of `index.html`:

```html
<link rel="stylesheet" href="https://use.typekit.net/YOUR-KIT-ID.css">
```

No CSS change is needed — `--font-body` already lists `"Acumin Pro"` first.

### Logo

The masthead currently shows a dashed placeholder block. To swap in the real logo,
drop the file into `assets/img/` and replace the `.logo-slot` div in `index.html`:

```html
<img src="assets/img/visit-loudoun-logo.svg" alt="Visit Loudoun" width="240">
```

Per the brand guidelines, the logo must be used as provided and cannot be modified
without permission.

---

## Layout system

**Spacing scale.** Every margin and padding uses a token (`--space-1` through
`--space-10`, 4px→72px) declared at the top of the stylesheet. Nothing uses a
one-off pixel value, so the vertical rhythm stays consistent across sections and
cards. Current rhythm: section padding 72px, section head margin 40px, card
padding 32px, grid gap 20px, and 20px between blocks inside a card.

**Cards are flex columns** with the contact block pinned to the bottom
(`margin-top: auto`). That keeps every contact line in a grid row aligned on the
same baseline instead of floating wherever the copy happens to end. If you add a
card, keep `.contact` as the last child and it aligns automatically.

**Contacts have two treatments.** Sections 2–5 use grids whose cards are about
344px wide, too narrow for an inline `Name · email · phone` run — it wrapped in
the middle of an address. Those sections stack one value per line:

```
CONTACT
Jennifer Christie
christie@visitloudoun.org
703-669-2006
```

Sections 1 and 6 use full-width cards where the inline run still fits on one
line, so they keep it. The stacked rule is keyed off the section class, so
moving a card between sections picks up the right treatment automatically.

**The nav centers itself and scrolls when it has to.** `.sectionnav .wrap` is the
scroll container; the `<ul>` inside is `width: max-content` with `margin: 0 auto`.
When the links fit, the auto margins center them. Below roughly 800px they no
longer fit, the auto margins resolve to zero, and the nav scrolls sideways from
the left with nothing clipped. A fade on the right edge hints at the scroll.

> **Notes when editing the CSS:**
>
> - `.card` is `display: flex`, and **flex containers do not collapse margins**.
>   Adjacent margins add together rather than overlapping, which is why
>   `.card__sub` carries `margin-top: 0` and relies on the preceding block's
>   bottom margin.
> - **Zero a `<ul>`'s block margins** when you restyle one — the browser default
>   is `1em` top and bottom, which silently adds 34px of height.
> - The stacked-contact rule uses `:is(...)`, giving it specificity (0,2,0).
>   **Media queries add no specificity**, so a plain `.contact { … }` inside a
>   `@media` block will lose to it. Repeat the full `:is(...)` selector when
>   overriding it responsively.

## Accessibility and behavior

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and a skip link
- Every section labelled via `aria-labelledby`
- Visible focus rings on all links
- **All text meets WCAG AA contrast**, verified by sampling every text node against
  its painted background at desktop and mobile sizes
- **44px minimum tap targets on mobile** — contact emails and phone numbers become
  full-width stacked rows rather than 17px inline links
- `prefers-reduced-motion` respected (smooth scrolling and transitions disabled)
- Responsive from 360px up; verified at 360, 375, 768, 1024, 1280 and 1440
- Print stylesheet included — printing expands every link to its full URL, so a
  printed copy stays as usable as the PDF it replaces
- All emails are `mailto:` links and all phone numbers are `tel:` links
- `assets/js/nav.js` is progressive enhancement only. It highlights the current
  section on scroll; with JavaScript off, every link and section still works.

---

## Maintenance

Content lives directly in `index.html` as plain HTML. To update a program description,
contact or link, edit the relevant `<article class="card">` block. The structure of
every card is identical:

```html
<article class="card">
  <h3>Card title</h3>
  <div class="card__body"><p>Description.</p></div>
  <ul class="links"><li><a href="…">Link label</a></li></ul>
  <div class="contact">
    <span class="contact__label">Contact</span>
    <span class="contact__name">Name</span>
    <span class="contact__sep">·</span>
    <a href="mailto:…">email</a>
    <span class="contact__sep">·</span>
    <a href="tel:+1…">000-000-0000</a>
  </div>
</article>
```

### Known items to verify before publishing

- **Instagram and TikTok URLs were constructed from the handles.** The source PDF listed
  `@VisitLoudoun` for both without a hyperlink. Confirm both resolve before going live.
- **Facebook Industry contact email** in the source PDF read `grooms@visitloudou.org`
  (missing the "n"). Corrected here to `grooms@visitloudoun.org`.
- **Threshold 360** description says "Google Business Profile" — the source PDF used the
  former product name, "Google My Business".
- **Brand Study** is dated 2022 based on the linked filename. The toolkit text does not
  state a year.
- **Dropbox asset links** are long-lived share URLs. Confirm they are still live and that
  sharing permissions allow external partners to download.
