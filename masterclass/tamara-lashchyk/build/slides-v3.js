// v3 of Tamara's masterclass: v2, trimmed to the SOP Affluent range, plus the elements
// Daniel picked from Tamara's old "Empower Her" presentation (see ../Old-Deck-Shortlist.md).
//
// Changes vs v2:
//  - Hook: slides 2-5 are first-person quotes from the Language Bank (Sophie-style "is this me?" opener).
//    The 6 AM / 9 AM / 9 PM scenes move into the presenter notes of those quotes.
//  - Her thesis in her own words ("Being underpaid isn't a money problem...") before the locked thesis.
//  - "Where are you right now?" chat poll after the agenda.
//  - Identity pillar: "lucky to be here" contrasts, the "If you feel..." sequence, "Identity is constructed."
//  - Execution pillar: "I'm afraid every day. But I do it anyway."
//  - Part Two: real compounding math (one missed $5,000 raise) and the 64% stat; 74% stat in Value.
//  - Trims: per-pillar statement slides, "What wasn't working" client steps, pillar outcome slides
//    (the outcome is now the headline of WHAT THIS LOOKS LIKE), duplicate "old way" line, AI list,
//    "Their stories" framing, two lead-ins, and two non-intake objections.

const v2 = require("./slides-v2");
const { SECTIONS } = v2;

const src = v2.slides;
const find = (pred, what) => {
  const i = src.findIndex(pred);
  if (i < 0) throw new Error(`v3: could not find ${what}`);
  return src[i];
};
const byH = (txt) => find((s) => (s.h || "").replace(/==/g, "").includes(txt), txt);
const byEyebrow = (txt, layout) => find((s) => s.eyebrow === txt && (!layout || s.layout === layout), txt);

const PILLARS = ["Value", "Ownership", "Identity", "Communication", "Execution"];
const FOLD = {
  Ownership: "When is it going to be my turn? I hear that one constantly, and notice what's baked into it: it assumes somebody else is running the line.",
  Identity: "Every negotiation feels like a referendum on whether you're enough. That's why it's so emotional.",
  Communication: "So many of you have told me, I want people to take me seriously.",
  Execution: "Ideas without action are just hopes and dreams.",
};

// ── New and replacement slides ─────────────────────────────
const icp = (h, tone, notes) => ({ sec: 1, layout: "icp", eyebrow: "Sound familiar?", tone, h, notes });

const HOOK = [
  src[0], // title
  icp("\"I'll just keep working hard, and ==my work will speak for itself.==\"", "light",
    "Let me paint a picture, and tell me if this sounds familiar. It's 6 AM. You're at the gym, finally doing something for yourself, and your boss calls. He's got a call with Asia and he doesn't have the numbers. So you jump on. You save his bacon. Then you shower and head into the office like nothing happened. Nobody there will ever hear about it, and you tell yourself that's fine, because your work will speak for itself."),
  icp("\"I know I'm probably underpaid, but ==I hate negotiating.==\"", "dark",
    "Be honest. How many of you have said this one out loud? And right behind it come the others. What if they say no? I don't want to make things awkward. I don't want to damage the relationship with my boss. I said every one of those, for years."),
  icp("\"When is it going to be ==my turn?==\"", "light",
    "Nine o'clock team meeting. You put an idea on the table. Crickets. Then Office Bro rolls in late looking like the cat dragged him in, coffee in one hand, bagel in the other. He chews for a while and then lobs out your idea, basically, only dumber. And the room lights up. And you're sitting there thinking, you have got to be kidding me. When is it going to be my turn?"),
  icp("\"I want more. ==This can't be all there is.==\"", "dark",
    "You finally get home around 8:30. Uber Eats shows up and they forgot your side salad. You don't call. You say nothing, same as you said nothing when that guy jumped into your cab this morning. Another long day, and still no promotion, no raise, no recognition. And lying there that night, the thought you don't say out loud: I want more. This can't be all there is. If any of these four landed a little too close to home, you're in the right room."),
  {
    sec: 1, layout: "line", tone: "light", eyebrow: "What most experts won't tell you",
    h: "Being underpaid isn't a money problem. ==It's a playing-small problem.==",
    sub: "And playing small is an identity problem.",
    notes: "Before we do anything else, I want to tell you something most experts won't tell you about being underpaid. [Pause. Let it land.] Being underpaid isn't a money problem. It's a playing-small problem. And playing small is an identity problem. Let me show you what I mean.",
  },
  byH("You don't have a negotiation problem"), // locked thesis
  byH("Your capability has outgrown"), // promise
];

const POLL = {
  sec: 2, layout: "poll", eyebrow: "Quick poll", h: "Where are you ==right now?==",
  items: [
    "I've never negotiated, and I know I'm underpaid",
    "I've negotiated, but I'm still underpaid and I want more",
    "I'm winning, but my pay doesn't reflect it",
  ],
  sub: "Type 1, 2 or 3 in the chat",
  notes: "Before we go further, I want to know who's here with me. Type 1, 2 or 3 in the chat. [Read a few answers out loud and react.] Wherever you are, you're in the right room. By the end of tonight I want every one of you thinking about what it takes to get to 3.",
};

const STAT_64 = {
  sec: 7, layout: "stat2", stat: "64%",
  sub: "of women never negotiate their salary. Not once.",
  source: "Source: [PLACEHOLDER: new source]",
  notes: "Sixty-four percent of women never negotiate their salary. Never. Not once. If you're in that group, no judgment. I was almost in that group myself. But you should know you're leaving money on the table that somebody else is picking up.",
};

const MATH = [
  {
    sec: 7, layout: "stat2", build: "1/3", eyebrow: "The math nobody shows you", stat: "$57,000",
    sub: "What one missed $5,000 raise costs you over 10 years.",
    source: "Assumes the missing $5,000 grows with 3% annual raises.",
    notes: "Here's the math. Say you skip one negotiation and leave $5,000 on the table. Your raises are percentages of your base, so that missing $5,000 grows every year, about 3 percent a year. After ten years, the one conversation you didn't have has cost you about 57 thousand dollars.",
  },
  {
    sec: 7, layout: "stat2", build: "2/3", eyebrow: "The math nobody shows you", stat: "$134,000",
    sub: "The same missed raise over 20 years.",
    source: "Assumes the missing $5,000 grows with 3% annual raises.",
    notes: "Twenty years, about 134 thousand. And that's before your bonus and your retirement match, which are percentages of the same number. And before your next employer asks what you're making now.",
  },
  {
    sec: 7, layout: "stat2", build: "3/3", eyebrow: "The math nobody shows you", stat: "$237,877",
    sub: "Over a 30-year career. From ==one missed conversation.==",
    source: "Assumes the missing $5,000 grows with 3% annual raises.",
    notes: "Over a 30-year career, $237,877. From one missed conversation. I spent my career watching compounding make people rich. It works just as hard against you.",
  },
];

const STAT_74 = {
  sec: 8, layout: "stat2", eyebrow: "Value", stat: "74%",
  sub: "Women who prepare are 74% more likely to earn a raise.",
  source: "Source: [PLACEHOLDER: new source]",
  notes: "Preparation starts with seeing your own value clearly. The women who walk in having done that work are far more likely to walk out with the raise. Most women skip it, because they don't know where to start or they quietly resist the whole thing.",
};

const IDENTITY_CONTRAST = {
  sec: 8, layout: "contrast", eyebrow: "Your identity drives your behavior",
  leftLabel: "When she plays small", rightLabel: "When she knows her value",
  rows: [
    ["She sees herself as lucky to be here, and negotiates like it", "She sees herself as an asset, and negotiates like one"],
    ["She fears rejection, so she hints and hopes", "She knows her power, so she asks clearly"],
    ["She believes her value must be earned, so she overdelivers and stays underpaid", "She walks in expecting to be paid for the value she creates"],
  ],
  notes: "Here's how that plays out. The woman who sees herself as lucky to be here negotiates very differently from the woman who sees herself as an asset. The woman who fears rejection hints and hopes. The woman who knows her power asks clearly, without apologizing. And the woman who believes her value has to be earned will overdeliver forever and stay underpaid. Same skills, different identity, and a very different paycheck.",
};

const IF_FEEL = {
  sec: 8, layout: "ifThen", eyebrow: "People rarely outperform their identity",
  rows: [
    ["If you feel invisible", "you stay quiet"],
    ["If you feel replaceable", "you settle"],
    ["If you believe you're unworthy", "you stay underpaid"],
    ["If you feel valuable", "you ask for more"],
    ["If you feel powerful", "you show up differently"],
  ],
  notes: "Your identity is the operating system running underneath everything else. [Read slowly, one line at a time.] If you feel invisible, you stay quiet. If you feel replaceable, you settle. If you believe you're unworthy, you stay underpaid. Now flip it. If you feel valuable, you ask for more. If you feel powerful, you show up differently.",
};

const CONSTRUCTED = {
  sec: 8, layout: "statement",
  h: "Identity is not fixed. ==Identity is constructed.==",
  sub: "And once you understand that, you can rebuild it on purpose.",
  notes: "So here's the good news, and it's the reason I do this work. Identity is not fixed. Identity is constructed. Which means you can rebuild it, on purpose. I did it at 18, I did it again when I left Wall Street, and I watch women do it every cohort.",
};

const AFRAID = {
  sec: 8, layout: "line", tone: "dark", eyebrow: "Execution",
  h: "\"I'm afraid every day. ==But I do it anyway.==\"",
  sub: "Fear always comes along for the ride. You become a woman who isn't stopped by it.",
  notes: "Does doing this work mean you stop being afraid? No. I'm afraid every day. But I do it anyway. Fear always comes along for the ride. You just become a woman who isn't stopped by it.",
};

// ── Assemble ─────────────────────────────────────────────
const DROP_H = [
  "Wall Street taught me the strategy", // bridge
  "I'll just keep working hard and my work will speak for itself", // duplicates hook quote
  "Different industries, different pay bands", // "Their stories" framing
  "So how do you do this without guessing", // program lead-in
];
const DROP_EYEBROW = ["What AI can't do for you"];
const DROP_WONDER = ["I've already read the books", "I'll do it when things calm down"];

const out = [...HOOK];
let carry = null;
const push = (s) => {
  if (carry) { s = { ...s, notes: `${carry} ${s.notes}` }; carry = null; }
  out.push(s);
};

for (let i = 8; i < src.length; i++) { // src 0-7 are the v2 hook (title, 3 scenes, thesis, promise) + agenda handled below
  const s = src[i];
  const h = (s.h || "").replace(/==/g, "");

  // skip trimmed slides, folding lines forward where they matter
  if (s.sec === 8 && s.layout === "line" && PILLARS.includes(s.eyebrow)) { carry = FOLD[s.eyebrow] || null; continue; }
  if (s.layout === "caseStep" && s.eyebrow === "What wasn't working") { carry = s.notes; continue; }
  if (s.layout === "line" && s.eyebrow === "The outcome") continue; // folded into WHAT THIS LOOKS LIKE below
  if (DROP_H.some((t) => h.includes(t))) {
    if (h.includes("I'll just keep working hard")) carry = "Remember the first thing on our list tonight? I'll just keep working hard and my work will speak for itself. That's the plan most of us were handed.";
    continue;
  }
  if (DROP_EYEBROW.includes(s.eyebrow)) continue;
  if (s.layout === "wonder" && DROP_WONDER.some((t) => h.includes(t))) continue;

  // replacements
  if (s.layout === "stat2" && s.stat === "60%+") { push(STAT_64); continue; }
  if (s.layout === "stat2" && /Year 1|Every year after/.test(s.stat)) continue;
  if (s.layout === "stat2" && s.stat === "$100,000s") { MATH.forEach(push); continue; }

  // AI line keeps the "what AI can't do" talking points in its notes
  if (s.layout === "line" && s.eyebrow === "Why now") {
    push({ ...s, notes: `${s.notes} ${find((x) => x.eyebrow === "What AI can't do for you", "AI list").notes}` });
    continue;
  }

  // WHAT THIS LOOKS LIKE takes the pillar outcome as its headline
  if (s.layout === "bullets" && s.eyebrow === "What this looks like") {
    const outcome = src.slice(i + 1).find((x) => x.layout === "line" && x.eyebrow === "The outcome");
    push({ ...s, h: outcome.h, notes: `${outcome.notes} ${s.notes}` });
    continue;
  }

  // pillar insertions
  if (s.layout === "pillarCard" && s.letter === "I") { push(s); push(IDENTITY_CONTRAST); push(IF_FEEL); continue; }
  if (s.layout === "myth" && s.eyebrow === "The belief Identity breaks") { push(s); push(CONSTRUCTED); continue; }
  if (s.layout === "myth" && s.eyebrow === "The belief Value breaks") { push(s); push(STAT_74); continue; }
  if (s.layout === "myth" && s.eyebrow === "The belief Execution breaks") { push(s); push(AFRAID); continue; }

  push(s);
}

// agenda (src[6]) + poll + "one ask" (src[7]) go right after the hook
out.splice(HOOK.length, 0, src[6], POLL, src[7]);

// sanity: the v2 hook/agenda slots we assumed
if (!/covering today/.test(src[6].h) || !/One ask/.test(src[7].h)) throw new Error("v3: v2 agenda slots moved");

const slides = out;

const meta = {
  header: [
    "# Done Waiting Your Turn: Masterclass Deck Outline (v3)",
    "",
    "**Client:** Tamara Lashchyk · Amplify Your V.O.I.C.E. Experience  ",
    "**Companion file:** `Tamara-Masterclass-v3.pptx` (same content, presenter notes in the notes field)",
    "",
    "## What changed in v3",
    "",
    `- **Slide count:** ${slides.length} (v1 was 112, v2 was 131). Inside the SOP Affluent range of 90 to 120.`,
    "- **New opener (slides 2 to 5):** four first-person quotes from the Language Bank, Sophie-style, so the right woman thinks \"this class is for me.\" The 6 AM, 9 AM and 9 PM scenes now live in the presenter notes of those quotes.",
    "- **From Tamara's old \"Empower Her\" deck (Daniel's picks):** her thesis \"Being underpaid isn't a money problem. It's a playing-small problem.\" (slide 6); the \"Where are you right now?\" chat poll after the agenda; three Identity additions (the \"lucky to be here\" vs. \"asset\" contrasts, the \"If you feel… you…\" sequence, and \"Identity is not fixed. Identity is constructed.\"); \"I'm afraid every day. But I do it anyway.\" in Execution; the real compounding math (one missed $5,000 raise = ~$57,000 over 10 years, ~$134,000 over 20, $237,877 over 30, at 3% growth; math verified); the 64% and 74% stats.",
    "- **Trims:** per-pillar statement slides; \"What wasn't working\" client steps; pillar outcome slides (each outcome is now the headline of that pillar's WHAT THIS LOOKS LIKE slide); the duplicate \"work will speak for itself\" line in Part One; the \"What AI can't do\" list (its talking points moved into the notes of the Why Now slide); the \"Their stories\" framing; the \"Where this comes from\" and \"without guessing\" lead-ins; and the two objections that weren't in the intake (\"I've read the books\", \"when things calm down\"). All five intake objections plus imposter fear and the inner-work objection remain.",
    "- **Humanization:** new copy checked (no em-dashes, no flagged vocabulary). Two of Tamara's own lines use the \"not X, it's Y\" shape (\"Being underpaid isn't a money problem…\" and \"Identity is not fixed…\"). They're kept verbatim because they're her signature phrasing and Daniel picked them, alongside the locked thesis and the mirror line.",
    "- **Confirmed:** Shelly $225K → $435K is correct (Daniel).",
    "- **Unchanged from v2:** photos only on slides 1 to 24's story section plus the three client headshots; Sophie structure; strategy not tactics; brand.",
    "",
    "## Gap flags (still open, marked [PLACEHOLDER])",
    "",
    "- **New sources for the 64% and 74% stats** (Daniel is finding them).",
    "- Next cohort start date, price and seat count.",
    "- Per-deliverable values, the bonus and the total stack value.",
    "- Client headshots and written consent for Shelly, Nina and Erica; their own words or video for the identity-shift lines.",
    "- Additional testimonials, the application URL, logo usage rights and legal review of the disclaimer.",
    "- Fonts: install Cormorant Garamond and DM Sans on the presenting machine.",
    "",
    "---",
    "",
  ],
};

module.exports = { slides, SECTIONS, meta };
