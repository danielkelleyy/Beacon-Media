// Renders a deck in the visual system of Sophie Orozco's masterclass, translated into Tamara's brand.
// Header bars with centered labels, centered statements with the key phrase in an accent color,
// framed dark dividers, big centered stats, myth cards joined by an arrow.
// Presenter notes get a "SLIDE N | SECTION [~mm:ss]" header like Sophie's.
//
// Usage: node build-deck-sophie.js ./slides-v4 ../Tamara-Masterclass-v4.pptx
const pptxgen = require("pptxgenjs");
const { slides, SECTIONS, meta = {} } = require(process.argv[2] || "./slides-v4");
const OUT = process.argv[3] || "../Tamara-Masterclass-v4.pptx";

// Tamara's brand (Intake Q39). Accent plays the role of Sophie's coral.
const C = {
  teal: "1E4A4A",
  frame: "4F7A72",
  sage: "8AAF8A",
  sageLight: "B7D3B7",
  accent: "5C8A64", // deeper sage, readable on Linen at headline sizes
  linen: "FAF5EE",
  mist: "E1F5EE",
  muted: "5E6B68",
  border: "D9D2C5",
  white: "FFFFFF",
  photo: "EEF4EC",
  flag: "B85042",
};
const HF = "Cormorant Garamond";
const BF = "DM Sans";
const W = 13.333, H = 7.5;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE";
pres.title = "Done Waiting Your Turn: Tamara Lashchyk Masterclass";
pres.author = "Beacon Media";

// ── text helpers ─────────────────────────────────────────
function runs(text, base, dark) {
  return String(text).split(/(==.+?==|\[PLACEHOLDER[^\]]*\])/g).filter(Boolean).map((p) => {
    const o = { ...base };
    if (p.startsWith("==")) {
      p = p.slice(2, -2);
      o.bold = true;
      o.color = dark ? C.sageLight : C.accent;
    } else if (p.startsWith("[PLACEHOLDER")) {
      o.color = dark ? "F2B8A8" : C.flag;
      o.bold = true;
      o.italic = false;
      o.fontFace = BF;
      o.fontSize = (base.fontSize || 16) > 40 ? Math.round(base.fontSize * 0.45) : Math.min(base.fontSize || 16, 16);
    }
    return { text: p, options: o };
  });
}
const strip = (t) => String(t || "").replace(/==/g, "");
function fit(text, base) {
  const n = strip(text).length;
  if (n <= 32) return base;
  if (n <= 60) return Math.round(base * 0.88);
  if (n <= 95) return Math.round(base * 0.76);
  return Math.round(base * 0.66);
}
function tx(sl, text, x, y, w, h, o = {}) {
  const dark = !!o.dark;
  const base = {
    fontFace: o.fontFace || BF, fontSize: o.fontSize || 16,
    color: o.color || (dark ? C.white : C.teal), bold: !!o.bold, italic: !!o.italic,
  };
  if (o.charSpacing) base.charSpacing = o.charSpacing;
  sl.addText(runs(text, base, dark), {
    x, y, w, h, isTextBox: true, margin: o.margin ?? 0, align: o.align || "left",
    valign: o.valign || "top", lineSpacingMultiple: o.lsm || 1.05, fit: "shrink",
  });
}
const bg = (sl, color) => { sl.background = { color }; };
const small = (sl, text, x, y, w, color, align = "center") =>
  tx(sl, String(text).toUpperCase(), x, y, w, 0.35, { fontSize: 12, bold: true, color, charSpacing: 3, align, valign: "middle" });
function rule(sl, cx, y, color = C.sage, w = 0.8) {
  sl.addShape(pres.shapes.LINE, { x: cx - w / 2, y, w, h: 0, line: { color, width: 1.5 } });
}
function frame(sl) {
  sl.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.35, w: W - 0.7, h: H - 0.7, fill: { type: "none" }, line: { color: C.frame, width: 1 } });
}
function bar(sl, label) {
  sl.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: W, h: 0.62, fill: { color: C.teal }, line: { color: C.teal } });
  sl.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0.62, w: W, h: 0.04, fill: { color: C.sage }, line: { color: C.sage } });
  tx(sl, strip(label).toUpperCase(), 0.5, 0, W - 1, 0.62, { fontSize: 13, bold: true, color: C.white, charSpacing: 3, align: "center", valign: "middle" });
}
function photo(sl, s, x, y, w, h) {
  if (!s.photo) return;
  sl.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: C.photo }, line: { color: C.sage, width: 1, dashType: "dash" } });
  const pad = Math.min(0.3, w * 0.07);
  tx(sl, "PHOTO", x + pad, y + pad, w - 2 * pad, 0.3, { fontSize: 10, bold: true, color: C.accent, charSpacing: 3 });
  tx(sl, s.photo, x + pad, y + pad + 0.35, w - 2 * pad, Math.min(h - 2 * pad - 0.35, 2.4), { fontSize: 10.5, italic: true, color: C.muted, lsm: 1.1 });
}
function circle(sl, x, y, d, fill, text, color, size) {
  sl.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } });
  tx(sl, text, x, y, d, d, { fontSize: size, bold: true, color, align: "center", valign: "middle" });
}
function centered(sl, s, o = {}) {
  // Sophie's centered statement: eyebrow, short rule, headline, supporting line
  const dark = !!o.dark, top = o.top ?? 2.0;
  if (s.eyebrow) small(sl, s.eyebrow, 1, top - 0.55, W - 2, dark ? C.sage : C.accent);
  rule(sl, W / 2, top, dark ? C.sage : C.sage);
  tx(sl, s.h, 1.2, top + 0.3, W - 2.4, 2.4, { fontFace: HF, fontSize: fit(s.h, o.size || 46), dark, color: dark ? C.white : C.teal, align: "center", valign: "middle", lsm: 1.0 });
  if (s.sub) tx(sl, s.sub, 2.0, top + 2.9, W - 4, 1.3, { fontSize: 17, dark, color: dark ? C.mist : C.muted, align: "center", lsm: 1.2 });
}

// ── layouts ──────────────────────────────────────────────
const L = {
  titleCard(sl, s) {
    bg(sl, C.teal); frame(sl);
    small(sl, s.eyebrow, 1, 1.75, W - 2, C.sage);
    rule(sl, W / 2, 2.25);
    tx(sl, s.h, 1, 2.5, W - 2, 1.4, { fontFace: HF, fontSize: 60, dark: true, align: "center", valign: "middle" });
    tx(sl, s.sub, 2.2, 4.1, W - 4.4, 1.0, { fontFace: HF, fontSize: 24, italic: true, bold: true, color: C.sageLight, dark: true, align: "center" });
    tx(sl, s.body, 1, 5.4, W - 2, 0.4, { fontSize: 13, color: C.mist, align: "center", dark: true });
    return true;
  },
  divider(sl, s) {
    bg(sl, C.teal); frame(sl);
    small(sl, s.eyebrow, 1, 2.35, W - 2, C.sage);
    rule(sl, W / 2, 2.85);
    tx(sl, s.h, 1.2, 3.05, W - 2.4, 1.5, { fontFace: HF, fontSize: fit(s.h, 50), dark: true, align: "center", valign: "middle" });
    if (s.sub) tx(sl, s.sub, 2, 4.75, W - 4, 1.0, { fontFace: HF, fontSize: 21, italic: true, color: C.sageLight, dark: true, align: "center" });
    return true;
  },
  pillarCard(sl, s) {
    bg(sl, C.teal); frame(sl);
    small(sl, `The V.O.I.C.E. Framework · ${s.eyebrow}`, 1, 1.05, W - 2, C.sage);
    tx(sl, s.letter, 1, 1.45, W - 2, 1.9, { fontFace: HF, fontSize: 130, color: C.sage, align: "center", valign: "middle", dark: true });
    rule(sl, W / 2, 3.55);
    tx(sl, s.h, 1, 3.75, W - 2, 1.0, { fontFace: HF, fontSize: 48, dark: true, align: "center", valign: "middle" });
    tx(sl, s.sub, 2, 4.9, W - 4, 1.0, { fontFace: HF, fontSize: 24, italic: true, color: C.mist, dark: true, align: "center" });
    return true;
  },
  statement(sl, s) { bg(sl, C.linen); centered(sl, s); },
  line(sl, s) {
    const dark = s.tone === "dark";
    bg(sl, dark ? C.teal : C.linen);
    if (dark) frame(sl);
    centered(sl, s, { dark });
    return dark;
  },
  ask(sl, s) { bg(sl, C.mist); centered(sl, { ...s, h: s.h }, { size: 42 }); },
  icp(sl, s) {
    bg(sl, C.linen);
    small(sl, s.eyebrow, 1, 1.25, W - 2, C.accent);
    tx(sl, "“", 1, 1.65, W - 2, 1.3, { fontFace: HF, fontSize: 120, bold: true, color: C.sage, align: "center" });
    tx(sl, s.h.replace(/^"|"$/g, ""), 1.4, 2.9, W - 2.8, 2.6, {
      fontFace: HF, fontSize: fit(s.h, 50), italic: true, color: C.teal, align: "center", valign: "top", lsm: 1.0,
    });
  },
  proctor(sl, s) {
    bg(sl, C.linen);
    photo(sl, s, 0, 0, 5.4, H);
    tx(sl, s.h.replace(/^"|"$/g, ""), 6.1, 1.2, 6.6, 4.2, { fontFace: HF, fontSize: 40, italic: true, color: C.teal, valign: "middle", lsm: 1.05 });
    rule(sl, 6.5, 5.75, C.sage);
    tx(sl, s.sub, 6.1, 5.95, 6.4, 0.5, { fontFace: HF, fontSize: 24, color: C.teal });
  },
  quote(sl, s) {
    bg(sl, C.linen);
    photo(sl, s, 0, 0, 5.0, H);
    tx(sl, "“", 5.7, 0.9, 1.2, 1.2, { fontFace: HF, fontSize: 100, bold: true, color: C.sage });
    tx(sl, s.h.replace(/^"|"$/g, ""), 5.7, 2.0, 7.0, 3.2, { fontFace: HF, fontSize: fit(s.h, 34), italic: true, color: C.teal, valign: "middle", lsm: 1.05 });
    if (s.sub) {
      rule(sl, 6.1, 5.55, C.sage);
      tx(sl, s.sub, 5.7, 5.75, 6.9, 0.8, { fontSize: 13, color: C.muted });
    }
  },
  split(sl, s, right = false) {
    bg(sl, C.linen);
    const px = right ? W - 5.4 : 0, x0 = right ? 0.8 : 6.0, w0 = 6.5;
    photo(sl, s, px, 0, 5.4, H);
    rule(sl, x0 + w0 / 2, 2.0);
    tx(sl, s.h, x0, 2.25, w0, 2.3, { fontFace: HF, fontSize: fit(s.h, 42), color: C.teal, align: "center", valign: "middle", lsm: 1.0 });
    if (s.body) tx(sl, s.body, x0 + 0.3, 4.8, w0 - 0.6, 1.8, { fontSize: 16, color: C.muted, align: "center", lsm: 1.2 });
  },
  splitR(sl, s) { L.split(sl, s, true); },
  scene(sl, s) {
    bg(sl, C.teal);
    photo(sl, s, 0, 0, W, H);
    sl.addShape(pres.shapes.RECTANGLE, { x: 2.2, y: 3.6, w: W - 4.4, h: 2.9, fill: { color: C.teal }, line: { color: C.teal } });
    rule(sl, W / 2, 3.95);
    tx(sl, s.h, 2.6, 4.1, W - 5.2, 1.3, { fontFace: HF, fontSize: fit(s.h, 38), dark: true, align: "center", valign: "middle" });
    if (s.body) tx(sl, s.body, 2.8, 5.45, W - 5.6, 0.9, { fontSize: 15, color: C.mist, align: "center", dark: true });
    return true;
  },
  stat(sl, s) {
    // authority builds: "WHO AM I?" bar, photo left, stat right
    bg(sl, C.linen); bar(sl, "Who am I?");
    photo(sl, s, 0.6, 1.1, 4.4, 5.8);
    const x0 = 5.5, w0 = 7.2;
    tx(sl, s.h, x0, 1.4, w0, 0.9, { fontFace: HF, fontSize: fit(s.h, 30), color: C.teal, align: "center", valign: "middle" });
    tx(sl, s.stat, x0, 2.4, w0, 1.9, { fontFace: HF, fontSize: s.statSmall ? fit(s.stat, 44) : 96, bold: true, color: C.accent, align: "center", valign: "middle" });
    rule(sl, x0 + w0 / 2, 4.55);
    tx(sl, s.body, x0 + 0.4, 4.8, w0 - 0.8, 1.6, { fontSize: 18, color: C.teal, align: "center", lsm: 1.2 });
  },
  stat2(sl, s) {
    bg(sl, C.linen);
    if (s.eyebrow) small(sl, s.eyebrow, 1, 0.9, W - 2, C.accent);
    const long = strip(s.stat).length > 10;
    tx(sl, s.stat, 1, 1.4, W - 2, 2.3, { fontFace: HF, fontSize: long ? fit(s.stat, 70) : 130, bold: true, color: C.accent, align: "center", valign: "middle" });
    rule(sl, W / 2, 3.95, C.teal, 0.7);
    tx(sl, s.sub, 2, 4.2, W - 4, 1.3, { fontSize: 22, color: C.teal, align: "center", lsm: 1.2 });
    if (s.source) tx(sl, s.source, 2, 6.3, W - 4, 0.4, { fontSize: 11, italic: true, color: C.muted, align: "center" });
  },
  list(sl, s) {
    bg(sl, C.linen); bar(sl, "In this masterclass, you'll discover");
    s.body.forEach((t, i) => {
      const y = 1.35 + i * 1.1;
      circle(sl, 1.6, y, 0.55, C.teal, String(i + 1), C.white, 16);
      tx(sl, t, 2.45, y - 0.05, 9.5, 0.65, { fontSize: 21, color: C.teal, valign: "middle" });
    });
  },
  poll(sl, s) {
    bg(sl, C.linen); bar(sl, s.eyebrow);
    tx(sl, s.h, 1, 1.1, W - 2, 1.0, { fontFace: HF, fontSize: 44, color: C.teal, align: "center", valign: "middle" });
    s.items.forEach((t, i) => {
      const y = 2.5 + i * 1.05;
      sl.addShape(pres.shapes.RECTANGLE, { x: 1.6, y, w: W - 3.2, h: 0.85, fill: { color: C.white }, line: { color: C.border, width: 1 } });
      circle(sl, 1.85, y + 0.15, 0.55, C.teal, String(i + 1), C.white, 16);
      tx(sl, t, 2.7, y, W - 4.6, 0.85, { fontSize: 20, color: C.teal, valign: "middle" });
    });
    tx(sl, s.sub, 1, 5.9, W - 2, 0.5, { fontSize: 17, bold: true, color: C.accent, align: "center", valign: "middle" });
  },
  disclaimer(sl, s) {
    bg(sl, C.linen);
    small(sl, s.h, 1, 2.0, W - 2, C.accent);
    rule(sl, W / 2, 2.55);
    tx(sl, s.body, 2.2, 2.85, W - 4.4, 2.6, { fontSize: 15, color: C.muted, align: "center", lsm: 1.3 });
  },
  xlist(sl, s) {
    bg(sl, C.linen); bar(sl, s.eyebrow);
    s.items.forEach((t, i) => {
      const y = 1.45 + i * 1.0;
      tx(sl, "✕", 2.3, y, 0.5, 0.65, { fontSize: 20, bold: true, color: C.accent, valign: "middle", align: "center" });
      tx(sl, t, 3.0, y, 8.5, 0.65, { fontSize: 22, color: C.teal, valign: "middle" });
    });
  },
  bullets(sl, s) {
    bg(sl, C.linen); bar(sl, s.eyebrow);
    let y0 = 1.5, step = 1.05;
    if (s.h) {
      tx(sl, s.h, 1, 1.0, W - 2, 1.3, { fontFace: HF, fontSize: fit(s.h, 38), color: C.teal, align: "center", valign: "middle" });
      rule(sl, W / 2, 2.5);
      y0 = 2.8; step = 0.92;
    }
    s.items.forEach((t, i) => {
      const y = y0 + i * step;
      tx(sl, "•", 2.2, y, 0.4, 0.65, { fontSize: 22, bold: true, color: C.accent, valign: "middle", align: "center" });
      tx(sl, t, 2.8, y, 8.8, 0.65, { fontSize: 20, color: C.teal, valign: "middle" });
    });
  },
  checks(sl, s) {
    bg(sl, C.linen); bar(sl, s.eyebrow);
    const two = s.items.length > 5, half = Math.ceil(s.items.length / 2);
    s.items.forEach((t, i) => {
      const col = two && i >= half ? 1 : 0, row = two && col ? i - half : i;
      const x = (two ? 1.0 : 1.8) + col * 5.9, y = 1.35 + row * (two ? 0.85 : 1.0);
      tx(sl, "✓", x, y, 0.5, 0.6, { fontSize: 22, bold: true, color: C.accent, valign: "middle", align: "center" });
      tx(sl, t, x + 0.65, y, two ? 5.1 : 9.6, 0.6, { fontSize: two ? 18 : 20, color: C.teal, valign: "middle" });
    });
    if (s.total) {
      sl.addShape(pres.shapes.RECTANGLE, { x: W / 2 - 3.2, y: 6.05, w: 6.4, h: 0.8, fill: { color: C.teal }, line: { color: C.teal } });
      tx(sl, s.total, W / 2 - 3, 6.05, 6.0, 0.8, { fontFace: HF, fontSize: 24, color: C.white, align: "center", valign: "middle", dark: true });
    }
  },
  steps(sl, s) {
    bg(sl, C.linen); bar(sl, s.eyebrow);
    s.items.forEach((t, i) => {
      const y = 1.35 + i * 1.0;
      circle(sl, 1.8, y, 0.55, C.teal, String(i + 1), C.white, 16);
      tx(sl, t, 2.65, y - 0.05, 9.5, 0.65, { fontSize: 21, color: C.teal, valign: "middle" });
    });
    sl.addShape(pres.shapes.RECTANGLE, { x: 1.8, y: 5.6, w: W - 3.6, h: 0.8, fill: { color: C.white }, line: { color: C.border, width: 1 } });
    tx(sl, s.link, 2.1, 5.6, W - 4.2, 0.8, { fontSize: 17, bold: true, color: C.teal, align: "center", valign: "middle" });
  },
  myth(sl, s) {
    bg(sl, C.linen); bar(sl, s.eyebrow);
    const arrow = s.arrow !== false;
    const gap = arrow ? 0.9 : 0.4, cw = 5.0, y = 1.4, ch = 4.9;
    const x1 = (W - (2 * cw + gap)) / 2, x2 = x1 + cw + gap;
    sl.addShape(pres.shapes.RECTANGLE, { x: x1, y, w: cw, h: ch, fill: { color: C.white }, line: { color: C.border, width: 1 } });
    sl.addShape(pres.shapes.RECTANGLE, { x: x2, y, w: cw, h: ch, fill: { color: C.teal }, line: { color: C.teal } });
    small(sl, s.thinkLabel || "What most think", x1 + 0.4, y + 0.35, cw - 0.8, C.muted, "left");
    small(sl, s.realityLabel || "The reality", x2 + 0.4, y + 0.35, cw - 0.8, C.sage, "left");
    tx(sl, s.think, x1 + 0.4, y + 0.9, cw - 0.8, ch - 1.3, { fontFace: HF, fontSize: fit(s.think, 30), color: C.teal, valign: "middle" });
    tx(sl, s.reality, x2 + 0.4, y + 0.9, cw - 0.8, ch - 1.3, { fontFace: HF, fontSize: fit(s.reality, 30), dark: true, valign: "middle" });
    if (arrow) tx(sl, "→", x1 + cw, y, gap, ch, { fontSize: 30, bold: true, color: C.accent, align: "center", valign: "middle" });
  },
  contrast(sl, s) {
    bg(sl, C.linen); bar(sl, s.eyebrow);
    const cw = 5.4, gap = 0.4, x1 = (W - (2 * cw + gap)) / 2, x2 = x1 + cw + gap;
    small(sl, s.leftLabel, x1, 1.0, cw, C.muted);
    small(sl, s.rightLabel, x2, 1.0, cw, C.accent);
    s.rows.forEach(([l, r], i) => {
      const y = 1.5 + i * 1.65;
      sl.addShape(pres.shapes.RECTANGLE, { x: x1, y, w: cw, h: 1.45, fill: { color: C.white }, line: { color: C.border, width: 1 } });
      sl.addShape(pres.shapes.RECTANGLE, { x: x2, y, w: cw, h: 1.45, fill: { color: C.teal }, line: { color: C.teal } });
      tx(sl, l, x1 + 0.35, y, cw - 0.7, 1.45, { fontFace: HF, fontSize: 22, color: C.teal, valign: "middle", align: "center" });
      tx(sl, r, x2 + 0.35, y, cw - 0.7, 1.45, { fontFace: HF, fontSize: 22, dark: true, valign: "middle", align: "center" });
    });
  },
  ifThen(sl, s) {
    bg(sl, C.linen); bar(sl, s.eyebrow);
    s.rows.forEach(([a, b], i) => {
      const y = 1.35 + i * 1.0;
      tx(sl, a, 0.6, y, 6.0, 0.75, { fontFace: HF, fontSize: 28, color: C.muted, align: "right", valign: "middle" });
      tx(sl, "→", 6.7, y, 0.6, 0.75, { fontSize: 24, bold: true, color: C.accent, align: "center", valign: "middle" });
      tx(sl, b, 7.45, y, 5.3, 0.75, { fontFace: HF, fontSize: 28, bold: true, color: C.teal, valign: "middle" });
    });
  },
  voice(sl, s) {
    bg(sl, C.linen); bar(sl, s.h);
    s.items.forEach(([letter, t], i) => {
      const y = 1.3 + i * 1.08;
      circle(sl, 3.2, y, 0.75, C.teal, letter, C.white, 24);
      tx(sl, t, 4.25, y, 7.5, 0.75, { fontFace: HF, fontSize: 30, color: C.teal, valign: "middle" });
    });
  },
  caseStep(sl, s) {
    bg(sl, C.linen);
    const hasP = !!s.photo;
    const x0 = hasP ? 5.0 : 2.6, w0 = hasP ? 7.6 : W - 5.2;
    if (hasP) photo(sl, s, 0.8, 0.8, 3.7, 5.9);
    small(sl, s.eyebrow, x0, 0.9, w0, C.accent, "left");
    tx(sl, s.who, x0, 1.3, w0, 0.9, { fontFace: HF, fontSize: 48, color: C.teal, valign: "middle" });
    sl.addShape(pres.shapes.LINE, { x: x0, y: 2.35, w: 0.8, h: 0, line: { color: C.sage, width: 1.5 } });
    let y = 2.6;
    if (s.stat) { tx(sl, s.stat, x0, y, w0, 1.1, { fontFace: HF, fontSize: 52, bold: true, color: C.accent, valign: "middle" }); y += 1.25; }
    tx(sl, s.h, x0, y, w0, 1.4, { fontFace: HF, fontSize: fit(s.h, 34), color: C.teal, valign: "top" });
    tx(sl, s.sub, x0, y + 1.5, w0 - 0.3, 1.5, { fontSize: 16, color: C.muted, lsm: 1.2 });
  },
  included(sl, s) {
    bg(sl, C.linen); bar(sl, s.eyebrow);
    tx(sl, s.h, 1, 1.0, W - 2, 1.1, { fontFace: HF, fontSize: fit(s.h, 46), color: C.teal, align: "center", valign: "middle" });
    rule(sl, W / 2, 2.35);
    const cw = 5.3, gap = 0.5, x1 = (W - (2 * cw + gap)) / 2;
    [[x1, "What it is", s.what], [x1 + cw + gap, "Why it matters", s.why]].forEach(([x, lab, t]) => {
      sl.addShape(pres.shapes.RECTANGLE, { x, y: 2.75, w: cw, h: 2.75, fill: { color: C.white }, line: { color: C.border, width: 1 } });
      small(sl, lab, x + 0.35, 3.0, cw - 0.7, C.accent, "left");
      tx(sl, t, x + 0.35, 3.45, cw - 0.7, 1.9, { fontSize: 17, color: C.teal, lsm: 1.2 });
    });
    tx(sl, "Value: " + s.value, 1, 5.85, W - 2, 0.5, { fontSize: 15, bold: true, color: C.accent, align: "center", valign: "middle" });
  },
  options(sl, s) {
    bg(sl, C.linen); bar(sl, s.eyebrow);
    const cw = 5.3, gap = 0.5, x1 = (W - (2 * cw + gap)) / 2, y = 1.35, ch = 5.0;
    [[x1, s.left, false], [x1 + cw + gap, s.right, true]].forEach(([x, o, dark]) => {
      sl.addShape(pres.shapes.RECTANGLE, { x, y, w: cw, h: ch, fill: { color: dark ? C.teal : C.white }, line: { color: dark ? C.teal : C.border, width: 1 } });
      small(sl, o.label, x + 0.4, y + 0.45, cw - 0.8, dark ? C.sage : C.muted);
      tx(sl, o.title, x + 0.4, y + 1.0, cw - 0.8, 1.9, { fontFace: HF, fontSize: fit(o.title, 34), dark, color: dark ? C.white : C.teal, align: "center", valign: "middle" });
      tx(sl, o.text, x + 0.5, y + 3.1, cw - 1.0, 1.4, { fontSize: 17, dark, color: dark ? C.mist : C.muted, align: "center", lsm: 1.2 });
    });
  },
  wonder(sl, s) {
    bg(sl, C.linen); bar(sl, s.eyebrow);
    tx(sl, s.h, 1.3, 1.4, W - 2.6, 2.3, { fontFace: HF, fontSize: fit(s.h, 42), italic: true, color: C.teal, align: "center", valign: "middle" });
    rule(sl, W / 2, 4.05);
    tx(sl, s.sub, 2, 4.35, W - 4, 1.6, { fontSize: 20, color: C.teal, align: "center", lsm: 1.2 });
  },
};

// ── notes headers with running time ──────────────────────
const WPM = meta.wpm || 140;
const NS = meta.noteSections || SECTIONS;
let seconds = 0, lastLabel = null;
const stamp = (sec) => `${Math.floor(sec / 60)}:${String(Math.round(sec % 60)).padStart(2, "0")}`;

slides.forEach((s, i) => {
  const sl = pres.addSlide();
  const fn = L[s.layout];
  if (!fn) throw new Error(`No Sophie-style layout for "${s.layout}" (slide ${i + 1})`);
  const dark = fn(sl, s) === true;
  sl.slideNumber = { x: W - 0.95, y: H - 0.42, w: 0.6, h: 0.3, fontFace: BF, fontSize: 9, color: dark ? C.sage : "9AA6A3", align: "right" };

  const label = s.noteSection || NS[s.sec] || "";
  const time = label !== lastLabel ? `  [~${stamp(seconds)}]` : "";
  const build = s.build ? `  {BUILD ${s.build}}` : "";
  sl.addNotes(`SLIDE ${i + 1}  |  ${label}${time}${build}\n\n${s.notes || ""}`);
  lastLabel = label;
  seconds += (String(s.notes || "").split(/\s+/).length / WPM) * 60;
});

pres.writeFile({ fileName: OUT }).then((f) => console.log("wrote", f, slides.length, "slides, ~" + Math.round(seconds / 60) + " min of script"));
