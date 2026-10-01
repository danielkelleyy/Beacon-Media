# Tamara Lashchyk: Masterclass Deck

**Current version: v4**

- `Tamara-Masterclass-v4.pptx`: 120 slides, restyled to match Sophie Orozco's deck in Tamara's brand, with the Bob Proctor future-pacing visualization (slides 19–20) and a full word-for-word presenter script (~7,200 words, about an hour live). Outline: `Tamara-Masterclass-Outline-v4.md`. Built with `build/build-deck-sophie.js` from `build/slides-v4.js`.
- `Tamara-Masterclass-v3.pptx`: 119 slides. v2's structure, trimmed, with a first-person "Sound familiar?" opener and the elements Daniel picked from Tamara's old Empower Her deck (see `Old-Deck-Shortlist.md`). Outline: `Tamara-Masterclass-Outline-v3.md`.
- `Tamara-Masterclass-v2.pptx`: 131 slides. Slides 1–24 keep their photo placeholders. From slide 25 on, the deck follows the Sophie Orozco masterclass structure (typographic slides, part dividers, myths, pillar beats, client arcs, objections). The only photos after slide 24 are one headshot each for Shelly, Nina and Erica. Presenter notes are in each slide's notes field.
- `Tamara-Masterclass-Outline-v2.md`: slide-by-slide review outline, with the v1 → v2 change log and open gap flags.
- `Tamara-Masterclass-v1.pptx` / `Tamara-Masterclass-Outline-v1.md`: the original photo-heavy version, kept for comparison.

Both versions are generated from data files in `build/` (`slides.js` for v1, `slides-v2.js` for v2, `slides-v3.js` for v3; each builds on the one before). To regenerate after editing copy:

```
npm install pptxgenjs          # once, anywhere on NODE_PATH
cd build
node build-deck-sophie.js ./slides-v4 ../Tamara-Masterclass-v4.pptx
node build-outline.js ./slides-v4 > ../Tamara-Masterclass-Outline-v4.md
# v1–v3 use the original builder: node build-deck.js ./slides-v3 ../Tamara-Masterclass-v3.pptx
```

Fonts: Cormorant Garamond (headings) and DM Sans (body), from Google Fonts. Install them on the presenting machine.
