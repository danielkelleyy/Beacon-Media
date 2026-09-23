// v3 of Tamara's masterclass: v2 trimmed toward the SOP Affluent range (90-120).
// Cuts: the per-pillar statement slide (x5) and the "What wasn't working" client step (x3).
// Key lines from cut slides are folded into the presenter notes of the slide that follows,
// so Language Bank phrases ("When is it going to be my turn?", "I want people to take me seriously") stay in the talk.
// Elements from Tamara's old presentation get merged here next, once Daniel picks them from the shortlist.

const v2 = require("./slides-v2");
const { SECTIONS } = v2;

const PILLARS = ["Value", "Ownership", "Identity", "Communication", "Execution"];
const isPillarLine = (s) => s.sec === 8 && s.layout === "line" && PILLARS.includes(s.eyebrow);
const isWasnt = (s) => s.layout === "caseStep" && s.eyebrow === "What wasn't working";

// Lead-ins added to the notes of the next kept slide
const FOLD = {
  Ownership: "When is it going to be my turn? I hear that one constantly, and notice what's baked into it: it assumes somebody else is running the line.",
  Identity: "Every negotiation feels like a referendum on whether you're enough. That's why it's so emotional.",
  Communication: "So many of you have told me, I want people to take me seriously.",
  Execution: "Ideas without action are just hopes and dreams.",
};

const slides = [];
let carry = null;
for (const s of v2.slides) {
  if (isPillarLine(s)) { carry = FOLD[s.eyebrow] || null; continue; }
  if (isWasnt(s)) { carry = s.notes; continue; }
  if (carry) { slides.push({ ...s, notes: `${carry} ${s.notes}` }); carry = null; }
  else slides.push(s);
}

module.exports = { slides, SECTIONS };
