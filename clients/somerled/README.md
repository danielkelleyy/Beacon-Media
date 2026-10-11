# Somerled Designs — Funnel Rebuild

Three self-contained HTML pages built from the Somerled marketing audit, ready to paste into GoHighLevel as Custom HTML. Setup steps are the same as the Beacon pages; see the root `README.md`.

| File | Purpose |
| --- | --- |
| `landing.html` | Eyebrow → headline → subheadline → VSL → "Free Design Strategy" (Typeform popup) → Featured In logos → 6 testimonial videos → repeat CTA |
| `confirmation.html` | Qualified applicants: confirm-your-call headline, confirmation video, 5 objection-handling breakout videos |
| `disqualification.html` | Not-a-fit applicants: respectful message plus portfolio and free-resource links |
| `assets/logo-white.png`, `assets/logo-gold.png` | Transparent Somerled wordmark (white for teal backgrounds, gold for light ones) |

## The flow

```
Landing page  ──"Free Design Strategy"──▶  Typeform popup (one form, partial responses on)
                                             ├── Qualified    → confirmation.html (with booking step)
                                             └── Disqualified → disqualification.html
```

## Swap list

| Token | Where | Replace with |
| --- | --- | --- |
| `TYPEFORM_FORM_ID` | landing (2 buttons) | Typeform form ID |
| `WISTIA_VSL_ID` | landing hero | VSL media ID |
| `WISTIA_TESTIMONIAL_1` … `_6` | landing testimonials | Testimonial video media IDs |
| `WISTIA_CONFIRM_ID` | confirmation hero | Confirmation video media ID |
| `WISTIA_BREAKOUT_1` … `_5` | confirmation breakouts | Breakout video media IDs |
| `href="#"` | disqualification buttons | Portfolio URL, free resource URL |

**Video placeholders.** Every video is a styled `.video-ph` box. To go live, replace the box with the Wistia snippet in the HTML comment above the main video on each page. Load `player.js` once per page, and give each video its own `embed/<ID>.js` script line.

**Featured In.** The logos load from `assets/featured/` under these file names: `business-insider.png`, `people.png`, `architectural-digest.png`, `home-accents-today.png`, `bravo.png`, `the-spruce.png`, `the-business-journals.png`, `pr-newswire.png`. Transparent PNGs work best. They're shown in one muted tone so they read as a set. Until a file exists, the outlet's name appears as text in its place.

**Fonts and colors.** Brand colors were sampled from Somerled's current site and live in each file's `:root` block. Outfit and Figtree are Google Font stand-ins for Somerled's brand typefaces, set via `--font-heading` and `--font-body`.
