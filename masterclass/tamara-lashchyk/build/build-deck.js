// Renders slides.js into a branded .pptx with photo placeholders and presenter notes.
// Usage: node build-deck.js [data module] [output]
//   node build-deck.js ./slides ../Tamara-Masterclass-v1.pptx
//   node build-deck.js ./slides-v2 ../Tamara-Masterclass-v2.pptx
const pptxgen = require("pptxgenjs");
const { slides, SECTIONS } = require(process.argv[2] || "./slides");

const OUT = process.argv[3] || "../Tamara-Masterclass-v1.pptx";

// Brand (Intake Q39)
const C = {
  teal: "1E4A4A",
  tealLight: "2B5C5C",
  sage: "8AAF8A",
  sageLight: "B7D3B7",
  hi: "CFE3CF", // highlight bar tint of Sage
  linen: "FAF5EE",
  mist: "E1F5EE",
  ink: "1B2B2B",
  muted: "5E6B68",
  white: "FFFFFF",
  old: "EFEAE2",
  flag: "B85042", // placeholders stand out for review
};
const HF = "Cormorant Garamond";
const BF = "DM Sans";
const W = 13.333, H = 7.5;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Done Waiting Your Turn: Tamara Lashchyk Masterclass";
pres.author = "Beacon Media";

// ── helpers ──────────────────────────────────────────────
function runs(text, base, dark) {
  const parts = String(text).split(/(==.+?==|\[PLACEHOLDER[^\]]*\])/g).filter(Boolean);
  return parts.map((p) => {
    const o = { ...base };
    if (p.startsWith("==")) {
      p = p.slice(2, -2);
      if (dark) o.color = C.sageLight;
      else o.highlight = C.hi;
    } else if (p.startsWith("[PLACEHOLDER")) {
      o.color = dark ? "F2B8A8" : C.flag;
      o.bold = true;
      o.fontFace = BF;
      o.fontSize = (base.fontSize || 16) > 40 ? Math.round(base.fontSize * 0.45) : Math.min(base.fontSize || 16, 16);
    }
    return { text: p, options: o };
  });
}

function fit(text, base) {
  const n = String(text).replace(/==/g, "").length;
  if (n <= 32) return base;
  if (n <= 60) return Math.round(base * 0.86);
  if (n <= 95) return Math.round(base * 0.74);
  return Math.round(base * 0.64);
}

function tx(slide, text, x, y, w, h, o = {}) {
  const dark = !!o.dark;
  const base = {
    fontFace: o.fontFace || BF,
    fontSize: o.fontSize || 16,
    color: o.color || (dark ? C.white : C.ink),
    bold: !!o.bold,
    italic: !!o.italic,
  };
  if (o.charSpacing) base.charSpacing = o.charSpacing;
  slide.addText(runs(text, base, dark), {
    x, y, w, h,
    isTextBox: true,
    margin: o.margin ?? 0,
    align: o.align || "left",
    valign: o.valign || "top",
    lineSpacingMultiple: o.lsm || 1.0,
    fit: "shrink",
  });
}

function head(slide, text, x, y, w, h, size, dark, o = {}) {
  tx(slide, text, x, y, w, h, {
    fontFace: HF, fontSize: fit(text, size), bold: true, dark,
    lsm: 0.95, valign: o.valign || "bottom", align: o.align, italic: o.italic, color: o.color,
  });
}

function label(slide, text, x, y, w, dark) {
  tx(slide, text.toUpperCase(), x, y, w, 0.35, {
    fontSize: 12, bold: true, color: dark ? C.sage : C.sage, charSpacing: 3, valign: "middle",
  });
}

function photo(slide, s, x, y, w, h, dark, rounded = true) {
  if (!s.photo) return;
  slide.addShape(rounded ? pres.shapes.ROUNDED_RECTANGLE : pres.shapes.RECTANGLE, {
    x, y, w, h,
    rectRadius: rounded ? 0.12 : undefined,
    fill: { color: dark ? C.tealLight : C.mist },
    line: { color: C.sage, width: 1.25, dashType: "dash" },
  });
  const pad = Math.min(0.35, w * 0.08);
  tx(slide, "PHOTO PLACEHOLDER", x + pad, y + pad, w - 2 * pad, 0.35, {
    fontSize: 11, bold: true, color: dark ? C.sageLight : C.teal, charSpacing: 3, valign: "middle",
  });
  tx(slide, s.photo, x + pad, y + pad + 0.45, w - 2 * pad, Math.min(h - 2 * pad - 0.45, 2.6), {
    fontSize: w < 4 ? 11 : 12, italic: true, color: dark ? C.mist : C.muted, lsm: 1.1,
  });
}

function eyebrow(slide, text, x, y, dark) {
  tx(slide, text.toUpperCase(), x, y, W - x - 0.9, 0.4, { fontSize: 14, bold: true, color: dark ? C.sage : C.sage, charSpacing: 4, valign: "middle" });
}

function body(slide, text, x, y, w, h, dark, size = 18) {
  if (!text) return;
  tx(slide, text, x, y, w, h, { fontSize: size, dark, color: dark ? C.mist : C.ink, lsm: 1.15 });
}

function bg(slide, color) {
  slide.background = { color };
}

function num(slide, dark) {
  slide.slideNumber = { x: W - 0.9, y: H - 0.45, w: 0.6, h: 0.3, fontFace: BF, fontSize: 9, color: dark ? C.sage : "9AA6A3", align: "right" };
}

function circle(slide, x, y, d, fill, text, color, size) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } });
  tx(slide, text, x, y, d, d, { fontSize: size, bold: true, color, align: "center", valign: "middle", fontFace: HF });
}

// ── layouts ──────────────────────────────────────────────
const L = {
  hero(sl, s) {
    bg(sl, C.teal);
    photo(sl, s, 7.6, 0, W - 7.6, H, true, false);
    head(sl, s.h, 0.7, 0.9, 6.5, 3.1, 50, true);
    if (s.sub) tx(sl, s.sub, 0.7, 4.25, 6.4, 1.3, { fontSize: 20, color: C.mist, lsm: 1.1 });
    if (s.body) tx(sl, s.body, 0.7, 5.8, 6.4, 0.8, { fontSize: 14, color: C.sage, bold: true, charSpacing: 1 });
    return true;
  },
  scene(sl, s) {
    bg(sl, C.tealLight);
    photo(sl, s, 0, 0, W, H, true, false);
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.9, w: 7.8, h: 3.0, rectRadius: 0.1, fill: { color: C.teal, transparency: 4 }, line: { color: C.teal } });
    head(sl, s.h, 0.95, 4.1, 7.1, s.body ? 1.6 : 2.5, 36, true);
    if (s.body) body(sl, s.body, 0.95, 5.8, 7.1, 1.0, true, 16);
    return true;
  },
  statement(sl, s) {
    bg(sl, C.teal);
    head(sl, s.h, 1.2, 1.2, W - 2.4, 3.2, 48, true, { align: "center" });
    if (s.sub) tx(sl, s.sub, 1.8, 4.7, W - 3.6, 1.6, { fontSize: 20, color: C.mist, align: "center", lsm: 1.15 });
    return true;
  },
  split(sl, s, right = false) {
    bg(sl, C.linen);
    const px = right ? W - 5.6 : 0, tx0 = right ? 0.7 : 6.2;
    photo(sl, s, px, 0, 5.6, H, false, false);
    head(sl, s.h, tx0, 0.8, 6.4, 3.0, 40, false);
    body(sl, s.body, tx0, 4.1, 6.3, 2.6, false, 19);
  },
  splitR(sl, s) { L.split(sl, s, true); },
  stat(sl, s) {
    bg(sl, C.linen);
    const hasP = !!s.photo, tw = hasP ? 7.1 : W - 1.4;
    if (s.who) label(sl, s.who, 0.7, 0.55, 4, false);
    head(sl, s.h, 0.7, 0.9, tw, 1.0, 30, false);
    tx(sl, s.stat, 0.7, 2.1, tw, 2.0, {
      fontFace: HF, fontSize: s.statSmall ? fit(s.stat, 44) : 88, bold: true, color: C.teal, valign: "middle",
    });
    body(sl, s.body, 0.7, 4.4, tw - 0.3, 2.3, false, 19);
    if (hasP) photo(sl, s, 8.3, 0.6, 4.35, 6.3, false);
  },
  list(sl, s) {
    bg(sl, C.linen);
    head(sl, s.h, 0.7, 0.6, 7.4, 1.1, 38, false);
    s.body.forEach((t, i) => {
      const y = 2.05 + i * 0.95;
      circle(sl, 0.7, y, 0.55, C.teal, String(i + 1), C.white, 18);
      tx(sl, t, 1.5, y - 0.05, 6.5, 0.7, { fontSize: 18, valign: "middle" });
    });
    photo(sl, s, 8.6, 0.6, 4.05, 6.3, false);
  },
  compare(sl, s) {
    bg(sl, C.white);
    head(sl, s.h, 0.7, 0.5, W - 1.4, 1.0, 36, false);
    const hasP = !!s.photo;
    const cw = hasP ? 4.15 : 5.8, gap = 0.35, y = 1.9, ch = 4.9;
    const x1 = 0.7, x2 = x1 + cw + gap;
    [[x1, s.left, C.old, C.ink, C.muted], [x2, s.right, C.teal, C.white, C.sageLight]].forEach(([x, c, fill, col, lab]) => {
      sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.12, fill: { color: fill }, line: { color: fill } });
      tx(sl, c.label.toUpperCase(), x + 0.4, y + 0.4, cw - 0.8, 0.4, { fontSize: 13, bold: true, color: lab, charSpacing: 2 });
      tx(sl, c.text, x + 0.4, y + 1.0, cw - 0.8, ch - 1.4, { fontFace: HF, fontSize: fit(c.text, 30), color: col, bold: true, lsm: 1.05, valign: "middle" });
    });
    if (hasP) photo(sl, s, x2 + cw + gap, y, W - 0.7 - (x2 + cw + gap), ch, false);
  },
  pillar(sl, s) {
    bg(sl, C.teal);
    const idx = "VOICE".indexOf(s.letter) + 1;
    label(sl, `The V.O.I.C.E. Framework · Part ${idx} of 5`, 0.7, 0.6, 7, true);
    tx(sl, s.letter, 0.5, 1.2, 3.6, 5.0, { fontFace: HF, fontSize: 260, bold: true, color: C.sage, valign: "middle", align: "center" });
    head(sl, s.h, 4.3, 1.9, 4.5, 1.3, s.h.length > 10 ? 36 : 50, true);
    tx(sl, s.sub, 4.3, 3.4, 4.3, 2.4, { fontFace: HF, fontSize: fit(s.sub, 30), color: C.mist, italic: true, dark: true, lsm: 1.05 });
    photo(sl, s, 8.95, 0, W - 8.95, H, true, false);
    return true;
  },
  outcome(sl, s) {
    bg(sl, C.mist);
    photo(sl, s, 0.7, 0.8, 4.6, 5.9, false);
    circle(sl, 6.0, 1.3, 0.9, C.teal, "✓", C.white, 30);
    label(sl, s.sub, 7.1, 1.55, 5.5, false);
    head(sl, s.h, 6.0, 2.5, 6.6, 3.2, 40, false, { valign: "top", color: C.teal });
  },
  voice(sl, s) {
    bg(sl, C.linen);
    head(sl, s.h, 0.7, 0.6, W - 1.4, 1.0, 40, false, { align: "center" });
    const colW = (W - 1.4) / 5;
    s.items.forEach(([letter, txt], i) => {
      const cx = 0.7 + i * colW;
      circle(sl, cx + (colW - 1.7) / 2, 2.2, 1.7, C.teal, letter, C.white, 64);
      const wide = txt.length <= 14;
      tx(sl, txt, wide ? cx - 0.15 : cx + 0.05, 4.2, wide ? colW + 0.3 : colW - 0.1, 1.4, { fontFace: HF, fontSize: txt.length > 14 ? 17 : txt.length > 10 ? 22 : 26, bold: true, color: C.teal, align: "center" });
    });
    if (s.visual && !s.visual.startsWith("Five")) { /* designer note lives in outline */ }
  },
  quote(sl, s) {
    bg(sl, C.linen);
    photo(sl, s, 0.8, 1.2, 3.8, 5.1, false);
    tx(sl, "“", 5.1, 0.6, 1.2, 1.2, { fontFace: HF, fontSize: 110, color: C.sage, bold: true });
    tx(sl, s.h.replace(/^"|"$/g, ""), 5.2, 1.7, 7.4, 3.3, {
      fontFace: HF, fontSize: fit(s.h, 36), italic: true, color: C.teal, bold: true, valign: "middle", lsm: 1.05,
    });
    if (s.sub) tx(sl, s.sub, 5.2, 5.2, 7.2, 1.3, { fontSize: 15, color: C.muted, lsm: 1.1 });
  },
  case(sl, s) {
    bg(sl, C.white);
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 0.7, w: 3.2, h: 0.5, rectRadius: 0.25, fill: { color: C.mist }, line: { color: C.mist } });
    tx(sl, s.stage.toUpperCase(), 0.7, 0.7, 3.2, 0.5, { fontSize: 12, bold: true, color: C.teal, align: "center", valign: "middle", charSpacing: 2 });
    head(sl, s.h, 0.7, 1.6, 7.0, 2.4, 42, false);
    body(sl, s.body, 0.7, 4.3, 6.8, 2.2, false, 20);
    photo(sl, s, 8.3, 0.6, 4.35, 6.3, false);
  },
  offer(sl, s) {
    bg(sl, C.linen);
    label(sl, s.build ? `Inside the experience · ${s.build.replace("/", " of ")}` : "Bonus", 0.7, 0.55, 7, false);
    head(sl, s.h, 0.7, 0.95, 7.2, 1.2, 38, false);
    label(sl, "What it is", 0.7, 2.45, 4, false);
    body(sl, s.what, 0.7, 2.85, 7.1, 1.3, false, 17);
    label(sl, "Why it matters", 0.7, 4.25, 4, false);
    body(sl, s.why, 0.7, 4.65, 7.1, 1.1, false, 17);
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 6.0, w: 4.4, h: 0.6, rectRadius: 0.3, fill: { color: C.teal }, line: { color: C.teal } });
    tx(sl, "Value: " + s.value, 0.9, 6.0, 4.0, 0.6, { fontSize: 14, bold: true, color: C.white, valign: "middle", dark: true });
    photo(sl, s, 8.4, 0.6, 4.25, 6.3, false);
  },
  stack(sl, s) {
    bg(sl, C.teal);
    head(sl, s.h, 0.7, 0.5, W - 1.4, 1.0, 40, true);
    const half = Math.ceil(s.items.length / 2);
    s.items.forEach((t, i) => {
      const col = i < half ? 0 : 1, row = col ? i - half : i;
      const x = 0.7 + col * 6.1, y = 1.85 + row * 0.8;
      circle(sl, x, y, 0.45, C.sage, "✓", C.teal, 16);
      tx(sl, t, x + 0.65, y - 0.05, 5.2, 0.55, { fontSize: 18, dark: true, valign: "middle" });
    });
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 6.0, w: 6.0, h: 0.8, rectRadius: 0.12, fill: { color: C.mist }, line: { color: C.mist } });
    tx(sl, s.total, 1.0, 6.0, 5.6, 0.8, { fontFace: HF, fontSize: 24, bold: true, color: C.teal, valign: "middle" });
    return true;
  },
  objection(sl, s) {
    bg(sl, C.white);
    photo(sl, s, 0, 0, 4.8, H, false, false);
    label(sl, "What you might be thinking", 5.4, 0.8, 7, false);
    head(sl, s.h, 5.4, 1.2, 7.3, 2.4, 38, false, { italic: true });
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.4, y: 3.9, w: 7.25, h: 2.8, rectRadius: 0.12, fill: { color: C.mist }, line: { color: C.mist } });
    body(sl, s.body, 5.75, 4.2, 6.6, 2.3, false, 18);
  },
  checklist(sl, s) {
    bg(sl, C.linen);
    head(sl, s.h, 0.7, 0.5, W - 1.4, 1.0, 40, false);
    s.body.forEach((t, i) => {
      const y = 1.9 + i * 1.0;
      circle(sl, 0.7, y, 0.6, C.teal, "✓", C.white, 20);
      tx(sl, t, 1.6, y - 0.05, 11, 0.7, { fontSize: 20, valign: "middle" });
    });
  },
  cta(sl, s) {
    bg(sl, C.teal);
    head(sl, s.h, 0.7, 0.5, 7.3, 1.7, 40, true);
    s.body.forEach((t, i) => {
      const y = 2.55 + i * 1.05;
      circle(sl, 0.7, y, 0.55, C.sage, String(i + 1), C.teal, 18);
      tx(sl, t, 1.5, y - 0.1, 6.4, 0.9, { fontSize: 16, dark: true, color: C.mist, valign: "middle" });
    });
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.7, y: 5.9, w: 7.1, h: 0.8, rectRadius: 0.12, fill: { color: C.mist }, line: { color: C.mist } });
    tx(sl, s.link, 1.0, 5.9, 6.6, 0.8, { fontSize: 18, bold: true, color: C.teal, valign: "middle" });
    photo(sl, s, 8.4, 0.6, 4.25, 6.3, true);
    return true;
  },
  disclaimer(sl, s) {
    bg(sl, C.white);
    head(sl, s.h, 0.7, 1.4, W - 1.4, 0.8, 30, false);
    body(sl, s.body, 0.7, 2.6, 9.5, 3.5, false, 15);
  },
  // ── v2 typographic layouts (Sophie structure) ──
  divider(sl, s) {
    bg(sl, C.teal);
    tx(sl, s.eyebrow.toUpperCase(), 1, 2.2, W - 2, 0.45, { fontSize: 16, bold: true, color: C.sage, charSpacing: 5, align: "center", valign: "middle" });
    head(sl, s.h, 1, 2.8, W - 2, 1.7, 54, true, { align: "center", valign: "top" });
    if (s.sub) tx(sl, s.sub, 1.8, 4.7, W - 3.6, 1.2, { fontSize: 20, color: C.mist, align: "center", lsm: 1.15 });
    return true;
  },
  line(sl, s) {
    const tone = s.tone || "light", dark = tone === "dark";
    bg(sl, { dark: C.teal, light: C.linen, white: C.white, mist: C.mist }[tone]);
    if (s.eyebrow) eyebrow(sl, s.eyebrow, 0.9, 1.3, dark);
    head(sl, s.h, 0.9, 1.85, W - 2.2, 2.9, 50, dark, { valign: "top" });
    if (s.sub) tx(sl, s.sub, 0.9, 5.0, W - 3.2, 1.6, { fontSize: 22, color: dark ? C.mist : C.muted, lsm: 1.15, dark });
    return dark;
  },
  myth(sl, s) {
    bg(sl, C.white);
    eyebrow(sl, s.eyebrow, 0.9, 0.7, false);
    const arrow = s.arrow !== false;
    const gap = arrow ? 1.0 : 0.4, cw = (W - 1.8 - gap) / 2, y = 1.45, ch = 5.2;
    const x2 = 0.9 + cw + gap;
    [[0.9, s.thinkLabel || "What most think", s.think, C.old, C.ink, C.muted],
     [x2, s.realityLabel || "The reality", s.reality, C.teal, C.white, C.sageLight]].forEach(([x, lab, t, fill, col, lc]) => {
      sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.12, fill: { color: fill }, line: { color: fill } });
      tx(sl, lab.toUpperCase(), x + 0.45, y + 0.45, cw - 0.9, 0.4, { fontSize: 13, bold: true, color: lc, charSpacing: 3 });
      tx(sl, t, x + 0.45, y + 1.1, cw - 0.9, ch - 1.6, { fontFace: HF, fontSize: fit(t, 34), bold: true, color: col, valign: "middle", lsm: 1.05 });
    });
    if (arrow) tx(sl, "→", 0.9 + cw, y, gap, ch, { fontSize: 40, bold: true, color: C.sage, align: "center", valign: "middle" });
  },
  xlist(sl, s) {
    bg(sl, C.white);
    eyebrow(sl, s.eyebrow, 0.9, 0.8, false);
    s.items.forEach((t, i) => {
      const y = 1.55 + i * 1.0;
      circle(sl, 0.9, y, 0.6, C.old, "✕", "8A8A85", 18);
      tx(sl, t, 1.85, y - 0.05, 10.5, 0.7, { fontFace: HF, fontSize: 30, bold: true, color: C.ink, valign: "middle" });
    });
  },
  bullets(sl, s) {
    bg(sl, C.linen);
    eyebrow(sl, s.eyebrow, 0.9, 0.8, false);
    let y0 = 1.7, step = 1.2;
    if (s.h) {
      head(sl, s.h, 0.9, 1.25, W - 1.8, 1.4, 40, false, { valign: "top", color: C.teal });
      y0 = 3.05; step = 0.95;
    }
    s.items.forEach((t, i) => {
      const y = y0 + i * step;
      sl.addShape(pres.shapes.OVAL, { x: 0.95, y: y + 0.22, w: 0.26, h: 0.26, fill: { color: C.sage }, line: { color: C.sage } });
      tx(sl, t, 1.6, y - 0.05, 10.8, 0.8, { fontFace: HF, fontSize: s.h ? 26 : 30, bold: true, color: C.ink, valign: "middle" });
    });
  },
  numbered(sl, s) {
    bg(sl, C.linen);
    eyebrow(sl, s.eyebrow, 0.9, 0.8, false);
    s.items.forEach((t, i) => {
      const y = 1.55 + i * 1.0;
      circle(sl, 0.9, y, 0.6, C.teal, String(i + 1), C.white, 20);
      tx(sl, t, 1.85, y - 0.05, 10.5, 0.7, { fontFace: HF, fontSize: 30, bold: true, color: C.ink, valign: "middle" });
    });
  },
  ask(sl, s) {
    bg(sl, C.mist);
    tx(sl, s.eyebrow.toUpperCase(), 1, 1.7, W - 2, 0.45, { fontSize: 15, bold: true, color: C.teal, charSpacing: 5, align: "center", valign: "middle" });
    tx(sl, s.h, 1.3, 2.4, W - 2.6, 3.0, { fontFace: HF, fontSize: fit(s.h, 50), bold: true, italic: true, color: C.teal, align: "center", valign: "top", lsm: 1.0 });
  },
  pillarCard(sl, s) {
    bg(sl, C.teal);
    eyebrow(sl, `The V.O.I.C.E. Framework · ${s.eyebrow}`, 0.9, 0.9, true);
    tx(sl, s.letter, 0.7, 1.4, 4.0, 5.0, { fontFace: HF, fontSize: 280, bold: true, color: C.sage, valign: "middle", align: "center" });
    head(sl, s.h, 5.0, 2.2, 7.6, 1.3, 60, true);
    tx(sl, s.sub, 5.0, 3.75, 7.4, 2.0, { fontFace: HF, fontSize: fit(s.sub, 36), italic: true, color: C.mist, dark: true, lsm: 1.05 });
    return true;
  },
  wonder(sl, s) {
    bg(sl, C.white);
    eyebrow(sl, s.eyebrow, 0.9, 1.1, false);
    head(sl, s.h, 0.9, 1.65, W - 2.2, 2.6, 46, false, { italic: true, valign: "top" });
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 4.55, w: W - 1.8, h: 1.9, rectRadius: 0.12, fill: { color: C.mist }, line: { color: C.mist } });
    tx(sl, s.sub, 1.3, 4.55, W - 2.6, 1.9, { fontSize: 22, color: C.teal, valign: "middle", lsm: 1.15 });
  },
  stat2(sl, s) {
    bg(sl, C.linen);
    if (s.eyebrow) eyebrow(sl, s.eyebrow, 0.9, 1.1, false);
    const long = String(s.stat).length > 10;
    tx(sl, s.stat, 0.9, 1.6, W - 1.8, 2.5, { fontFace: HF, fontSize: long ? fit(s.stat, 72) : 130, bold: true, color: C.teal, valign: "middle" });
    tx(sl, s.sub, 0.9, 4.35, W - 3, 1.4, { fontSize: 26, color: C.ink, lsm: 1.15 });
    if (s.source) tx(sl, s.source, 0.9, 6.3, W - 3, 0.4, { fontSize: 12, color: C.muted });
  },
  caseStep(sl, s) {
    bg(sl, C.white);
    const hasP = !!s.photo, tw = hasP ? 7.1 : W - 2.2;
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 0.8, w: 1.9, h: 0.5, rectRadius: 0.25, fill: { color: C.teal }, line: { color: C.teal } });
    tx(sl, s.who.toUpperCase(), 0.9, 0.8, 1.9, 0.5, { fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle", charSpacing: 3 });
    eyebrow(sl, s.eyebrow, 3.05, 0.87, false);
    let y = 1.75;
    if (s.stat) {
      tx(sl, s.stat, 0.9, y, tw, 1.6, { fontFace: HF, fontSize: 80, bold: true, color: C.teal, valign: "middle" });
      y += 1.8;
    }
    head(sl, s.h, 0.9, y, tw, s.stat ? 1.4 : 2.6, s.stat ? 36 : 48, false, { valign: "top" });
    tx(sl, s.sub, 0.9, s.stat ? 5.1 : 4.7, tw - 0.3, 1.6, { fontSize: 20, color: C.muted, lsm: 1.15 });
    if (hasP) photo(sl, s, 8.4, 0.6, 4.25, 6.3, false);
  },
  included(sl, s) {
    bg(sl, C.linen);
    eyebrow(sl, s.eyebrow, 0.9, 0.9, false);
    head(sl, s.h, 0.9, 1.4, W - 1.8, 1.3, 50, false, { valign: "top" });
    const cw = (W - 1.8 - 0.6) / 2;
    [[0.9, "What it is", s.what], [0.9 + cw + 0.6, "Why it matters", s.why]].forEach(([x, lab, t]) => {
      sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.0, w: cw, h: 2.6, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.white } });
      tx(sl, lab.toUpperCase(), x + 0.4, 3.3, cw - 0.8, 0.4, { fontSize: 13, bold: true, color: C.sage, charSpacing: 3 });
      tx(sl, t, x + 0.4, 3.8, cw - 0.8, 1.6, { fontSize: 19, color: C.ink, lsm: 1.15 });
    });
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 6.0, w: 4.6, h: 0.6, rectRadius: 0.3, fill: { color: C.teal }, line: { color: C.teal } });
    tx(sl, "Value: " + s.value, 1.1, 6.0, 4.2, 0.6, { fontSize: 14, bold: true, color: C.white, valign: "middle", dark: true });
  },
  checks(sl, s) {
    const tone = s.tone || "light", dark = tone === "dark";
    bg(sl, { dark: C.teal, light: C.linen, white: C.white }[tone]);
    eyebrow(sl, s.eyebrow, 0.9, 0.8, dark);
    const two = s.items.length > 5, half = Math.ceil(s.items.length / 2);
    s.items.forEach((t, i) => {
      const col = two && i >= half ? 1 : 0, row = two && col ? i - half : i;
      const x = 0.9 + col * 6.1, y = 1.55 + row * (two ? 0.85 : 1.0);
      circle(sl, x, y, 0.5, dark ? C.sage : C.teal, "✓", dark ? C.teal : C.white, 16);
      tx(sl, t, x + 0.75, y - 0.1, two ? 5.2 : 11.2, 0.7, { fontSize: two ? 18 : 22, dark, color: dark ? C.white : C.ink, valign: "middle", bold: !two });
    });
    if (s.total) {
      sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 6.1, w: 6.0, h: 0.8, rectRadius: 0.12, fill: { color: C.mist }, line: { color: C.mist } });
      tx(sl, s.total, 1.2, 6.1, 5.6, 0.8, { fontFace: HF, fontSize: 24, bold: true, color: C.teal, valign: "middle" });
    }
    return dark;
  },
  options(sl, s) {
    bg(sl, C.white);
    eyebrow(sl, s.eyebrow, 0.9, 0.8, false);
    const cw = (W - 1.8 - 0.5) / 2, y = 1.5, ch = 5.1;
    [[0.9, s.left, C.old, C.ink, C.muted], [0.9 + cw + 0.5, s.right, C.teal, C.white, C.sageLight]].forEach(([x, o, fill, col, lc]) => {
      sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.12, fill: { color: fill }, line: { color: fill } });
      tx(sl, o.label.toUpperCase(), x + 0.5, y + 0.5, cw - 1, 0.4, { fontSize: 13, bold: true, color: lc, charSpacing: 3 });
      tx(sl, o.title, x + 0.5, y + 1.1, cw - 1, 1.9, { fontFace: HF, fontSize: fit(o.title, 38), bold: true, color: col, valign: "top" });
      tx(sl, o.text, x + 0.5, y + 3.2, cw - 1, 1.5, { fontSize: 19, color: col, lsm: 1.15 });
    });
  },
  steps(sl, s) {
    bg(sl, C.teal);
    eyebrow(sl, s.eyebrow, 0.9, 0.8, true);
    s.items.forEach((t, i) => {
      const y = 1.5 + i * 1.0;
      circle(sl, 0.9, y, 0.6, C.sage, String(i + 1), C.teal, 20);
      tx(sl, t, 1.85, y - 0.05, 10.5, 0.7, { fontFace: HF, fontSize: 30, bold: true, dark: true, color: C.white, valign: "middle" });
    });
    sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y: 5.8, w: W - 1.8, h: 0.8, rectRadius: 0.12, fill: { color: C.mist }, line: { color: C.mist } });
    tx(sl, s.link, 1.2, 5.8, W - 2.4, 0.8, { fontSize: 18, bold: true, color: C.teal, valign: "middle" });
    return true;
  },
  // ── v3 layouts ──
  icp(sl, s) {
    const dark = s.tone === "dark";
    bg(sl, dark ? C.teal : C.linen);
    tx(sl, s.eyebrow.toUpperCase(), 1, 1.3, W - 2, 0.45, { fontSize: 15, bold: true, color: C.sage, charSpacing: 5, align: "center", valign: "middle" });
    tx(sl, "“", 1, 1.8, W - 2, 1.2, { fontFace: HF, fontSize: 120, bold: true, color: C.sage, align: "center", valign: "top" });
    tx(sl, s.h.replace(/^"|"$/g, ""), 1.2, 3.0, W - 2.4, 2.8, {
      fontFace: HF, fontSize: fit(s.h, 56), italic: true, bold: true, dark, color: dark ? C.white : C.teal, align: "center", valign: "top", lsm: 1.0,
    });
    return dark;
  },
  poll(sl, s) {
    bg(sl, C.mist);
    eyebrow(sl, s.eyebrow, 0.9, 0.8, false);
    head(sl, s.h, 0.9, 1.25, W - 1.8, 1.2, 48, false, { valign: "top", color: C.teal });
    s.items.forEach((t, i) => {
      const y = 2.75 + i * 1.05;
      sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y, w: W - 1.8, h: 0.85, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.white } });
      circle(sl, 1.1, y + 0.15, 0.55, C.teal, String(i + 1), C.white, 20);
      tx(sl, t, 1.95, y, W - 3.2, 0.85, { fontFace: HF, fontSize: 26, bold: true, color: C.ink, valign: "middle" });
    });
    tx(sl, s.sub, 0.9, 6.1, W - 1.8, 0.5, { fontSize: 18, bold: true, color: C.teal, valign: "middle" });
  },
  contrast(sl, s) {
    bg(sl, C.white);
    eyebrow(sl, s.eyebrow, 0.9, 0.7, false);
    const cw = (W - 1.8 - 0.4) / 2, x2 = 0.9 + cw + 0.4;
    tx(sl, s.leftLabel.toUpperCase(), 0.9 + 0.3, 1.25, cw, 0.4, { fontSize: 13, bold: true, color: C.muted, charSpacing: 3 });
    tx(sl, s.rightLabel.toUpperCase(), x2 + 0.3, 1.25, cw, 0.4, { fontSize: 13, bold: true, color: C.sage, charSpacing: 3 });
    s.rows.forEach(([l, r], i) => {
      const y = 1.8 + i * 1.6;
      sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.9, y, w: cw, h: 1.4, rectRadius: 0.12, fill: { color: C.old }, line: { color: C.old } });
      sl.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x2, y, w: cw, h: 1.4, rectRadius: 0.12, fill: { color: C.teal }, line: { color: C.teal } });
      tx(sl, l, 1.2, y, cw - 0.6, 1.4, { fontFace: HF, fontSize: 22, bold: true, color: C.ink, valign: "middle" });
      tx(sl, r, x2 + 0.3, y, cw - 0.6, 1.4, { fontFace: HF, fontSize: 22, bold: true, color: C.white, valign: "middle", dark: true });
    });
  },
  ifThen(sl, s) {
    bg(sl, C.teal);
    eyebrow(sl, s.eyebrow, 0.9, 0.8, true);
    s.rows.forEach(([a, b], i) => {
      const y = 1.5 + i * 1.0;
      tx(sl, a, 0.5, y, 6.3, 0.8, { fontFace: HF, fontSize: 26, bold: true, color: C.sageLight, valign: "middle", align: "right", dark: true });
      tx(sl, "→", 6.85, y, 0.7, 0.8, { fontSize: 28, bold: true, color: C.sage, align: "center", valign: "middle" });
      tx(sl, b, 7.6, y, 5.3, 0.8, { fontFace: HF, fontSize: 26, bold: true, color: C.white, valign: "middle", dark: true });
    });
    return true;
  },
};

// ── render ───────────────────────────────────────────────
slides.forEach((s, i) => {
  const sl = pres.addSlide();
  const fn = L[s.layout];
  if (!fn) throw new Error(`Unknown layout ${s.layout} on slide ${i + 1}`);
  const dark = fn(sl, s) === true;
  num(sl, dark);
  const tag = `[${SECTIONS[s.sec].toUpperCase()}${s.build ? ` · BUILD ${s.build}` : ""}]`;
  sl.addNotes(`${tag}\n\n${s.notes}`);
});

pres.writeFile({ fileName: OUT }).then((f) => console.log("wrote", f, slides.length, "slides"));
