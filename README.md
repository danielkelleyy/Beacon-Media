# Beacon Media — Custom Landing Funnel

Three self-contained HTML pages (no build step, no framework) designed to be pasted directly into GoHighLevel as Custom HTML:

- `pages/landing.html` — the opt-in page. CTA opens a Typeform application as a popup.
- `pages/confirmation.html` — shown to applicants Typeform marks as qualified.
- `pages/disqualification.html` — shown to applicants Typeform marks as not a fit.

Each file is fully self-contained (inline CSS, minimal inline JS) so you can copy-paste the whole file as-is — no assets to upload except your logo and images (see below).

## The flow

```
Landing page (GHL)
   │  click "Apply To Work with us 1 on 1"
   ▼
Typeform application (built/owned by you in Typeform)
   │  Typeform logic jumps route the respondent to one of two Endings
   ├── Qualified Ending  → redirect to Confirmation page (GHL)
   └── Disqualified Ending → redirect to Disqualification page (GHL)
```

Qualification logic lives entirely in Typeform (logic jumps + per-Ending "redirect on completion" URLs), not in these HTML pages.

## 1. Publish the Confirmation and Disqualification pages first

You need their live URLs before you can configure Typeform's redirects.

1. In GHL, create a new page in your Funnel or Website (one for confirmation, one for disqualification).
2. Remove/disable the page's default header, footer, and any theme wrapper so nothing but your custom markup renders.
3. Add a **Custom Code / HTML** element (or the "Custom HTML" section type, depending on your GHL builder version) covering the full page.
4. Paste the entire contents of `pages/confirmation.html` (or `disqualification.html`) into that element.
5. Publish and copy the live page URL.

## 2. Set up the Typeform redirects

1. In your Typeform, build the "Ending" screens for qualified vs. disqualified outcomes (or use logic jumps into two separate Endings).
2. On each Ending screen, turn on **"Redirect to an external link"** (Typeform Pro/Business) and paste in:
   - Qualified Ending → your published Confirmation page URL from Step 1.
   - Disqualified Ending → your published Disqualification page URL from Step 1.
3. Copy your Typeform's form ID (the string in `https://form.typeform.com/to/XXXXXXXX` — `XXXXXXXX` is the ID).

## 3. Publish the Landing page

1. In `pages/landing.html`, replace every instance of `TYPEFORM_FORM_ID` (there are two — one per CTA button) with your real Typeform form ID.
2. Replace `WISTIA_MEDIA_ID` (one instance, appears twice inside the same embed block) with your real Wistia media hashed ID.
3. Follow the same GHL steps as above (new page, strip default header/footer/theme, add Custom Code / HTML element, paste the whole file, publish).

## Swapping in your real logo

Every page currently uses a placeholder wordmark (an inline SVG star + "BEACON" text) in two places per file: the header (`.logo.logo--dark`) and the footer (`.logo.logo--light`). Once you have the actual logo image files:

1. Upload the black-on-white version and the white-on-black version somewhere reachable by URL (GHL's Media Library, or any CDN/image host — GHL Custom HTML can't reference a local file path).
2. In each of the 3 HTML files, replace the `<svg>...</svg><span>BEACON</span>` pair inside `<a class="logo logo--dark" ...>` with `<img src="YOUR_BLACK_LOGO_URL" alt="Beacon Media" height="28">`, and the one inside `<a class="logo logo--light" ...>` with `<img src="YOUR_WHITE_LOGO_URL" alt="Beacon Media" height="28">`.

## Swapping in brand colors / fonts

Each file defines its palette and typography once, near the top of its `<style>` block, in a `:root { ... }` section (e.g. `--color-accent`, `--font-heading`). Edit these variables — the same names are used across all 3 files, so update all 3 if you're changing brand colors.

## Replacing placeholder copy

Every bracketed string like `[PLACEHOLDER: ...]` is exactly that — sample copy standing in for the real thing. Search each file for `[PLACEHOLDER` and replace with real content before publishing live. The testimonial cards on the landing page use invented sample content (not real client results) and must be replaced with genuine Beacon Media testimonials before this goes live, for compliance as much as anything else.

## Images

Any image you add beyond what's already inline (SVG icons) — logo files, testimonial headshots, etc. — needs to be hosted externally (GHL Media Library or a CDN) and referenced by full URL. GHL's Custom HTML has no access to a local filesystem, so relative paths like `./logo.png` will not resolve.

## Tracking pixels / analytics

Each file has a clearly marked HTML-comment slot near the top of `<head>` for pasting Meta Pixel, Google Ads, or GTM snippets. The confirmation and disqualification pages also have a second marked slot intended for a conversion event (e.g. a `Lead` or `CompleteRegistration` fire) — add that script there once your pixel is in place.
