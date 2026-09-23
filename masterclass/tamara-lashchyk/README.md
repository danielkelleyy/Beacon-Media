# Tamara Lashchyk: Masterclass Deck

- `Tamara-Masterclass-v1.pptx`: built deck, 112 slides. Photo placeholders are dashed boxes with shot direction. Presenter notes are in each slide's notes field.
- `Tamara-Masterclass-Outline-v1.md`: slide-by-slide review outline (Mastering Webinars SOP Step 6 format), plus diagnosis, gap flags and the humanization log.

Both files are generated from `build/slides.js`. To regenerate after editing copy:

```
npm install pptxgenjs          # once, anywhere on NODE_PATH
cd build
node build-deck.js ../Tamara-Masterclass-v1.pptx
node build-outline.js > ../Tamara-Masterclass-Outline-v1.md
```

Fonts: Cormorant Garamond (headings) and DM Sans (body), from Google Fonts. Install them on the presenting machine.
