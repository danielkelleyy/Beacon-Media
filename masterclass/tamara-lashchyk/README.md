# Tamara Lashchyk: Masterclass Deck

**Current version: v2**

- `Tamara-Masterclass-v2.pptx`: 131 slides. Slides 1–24 keep their photo placeholders. From slide 25 on, the deck follows the Sophie Orozco masterclass structure (typographic slides, part dividers, myths, pillar beats, client arcs, objections). The only photos after slide 24 are one headshot each for Shelly, Nina and Erica. Presenter notes are in each slide's notes field.
- `Tamara-Masterclass-Outline-v2.md`: slide-by-slide review outline, with the v1 → v2 change log and open gap flags.
- `Tamara-Masterclass-v1.pptx` / `Tamara-Masterclass-Outline-v1.md`: the original photo-heavy version, kept for comparison.

Both versions are generated from data files in `build/` (`slides.js` for v1, `slides-v2.js` for v2, which reuses v1 slides 1–24 and v1's presenter notes). To regenerate after editing copy:

```
npm install pptxgenjs          # once, anywhere on NODE_PATH
cd build
node build-deck.js ./slides-v2 ../Tamara-Masterclass-v2.pptx
node build-outline.js ./slides-v2 > ../Tamara-Masterclass-Outline-v2.md
```

Fonts: Cormorant Garamond (headings) and DM Sans (body), from Google Fonts. Install them on the presenting machine.
