// Renders slides.js into the SOP Step 6 slide-by-slide review outline.
// Usage: node build-outline.js [data module] > outline.md
//   node build-outline.js ./slides > ../Tamara-Masterclass-Outline-v1.md
//   node build-outline.js ./slides-v2 > ../Tamara-Masterclass-Outline-v2.md
const DATA = process.argv[2] || "./slides";
const { slides, SECTIONS, meta } = require(DATA);
const VER = (DATA.match(/v(\d)/) || [, "1"])[1];
const V2 = VER !== "1";

const VISUAL = {
  hero: "Deep Teal background. Headline left, full-height photo on the right.",
  scene: "Full-bleed photo. Headline on a Deep Teal panel, bottom left.",
  statement: "Deep Teal background, centered statement, no photo. Let it breathe.",
  split: "Linen background. Full-height photo on the left, headline and body on the right.",
  splitR: "Linen background. Headline and body on the left, full-height photo on the right.",
  stat: "Linen background. Big stat callout in Deep Teal with one line of context, photo on the right.",
  list: "Linen background. Numbered rows in teal circles, photo on the right.",
  compare: "White background. Two-column reframe: neutral card on the left, Deep Teal card on the right.",
  pillar: "Deep Teal background. Giant Sage letter, pillar name and branded headline, full-height photo on the right.",
  outcome: "Sage Mist background. Rounded photo on the left, check icon and outcome statement on the right.",
  voice: "Linen background. Five teal circles with the V.O.I.C.E. letters in a row.",
  quote: "Linen background. Large italic pull quote in Cormorant Garamond, rounded photo on the left.",
  case: "White background. \"Where [Name] Started\" pill, headline and body, client photo on the right.",
  offer: "Linen background. Deliverable name, What it is / Why it matters, value pill, photo on the right.",
  stack: "Deep Teal background. Two-column checklist of every deliverable, total value box.",
  objection: "White background. Full-height photo on the left, objection as an italic headline, answer in a Sage Mist card.",
  checklist: "Linen background. Checkmark rows.",
  cta: "Deep Teal background. Numbered application steps, link box, application screenshot on the right.",
  disclaimer: "White background, small type.",
  divider: "Part divider. Deep Teal, centered eyebrow and title. No photo.",
  line: "Typographic statement: small eyebrow, big headline, one supporting line. No photo.",
  myth: "White background. What Most Think card → The Reality card (Deep Teal). No photo.",
  xlist: "White background. ✕ rows, one per old-way habit. No photo.",
  bullets: "Linen background. Sage dot rows. No photo.",
  numbered: "Linen background. Numbered teal circles. No photo.",
  ask: "Sage Mist background. ASK YOURSELF eyebrow and a centered italic question. No photo.",
  pillarCard: "Deep Teal. Giant Sage letter, pillar name and definition. No photo.",
  wonder: "White background. Objection as an italic headline, short answer in a Sage Mist card. No photo.",
  stat2: "Linen background. Very large stat, one line of context, source line. No photo.",
  caseStep: "White background. Client name pill, stage eyebrow, headline and body. Headshot on the Where It Started slide only.",
  included: "Linen background. WHAT'S INCLUDED eyebrow, deliverable name, What It Is and Why It Matters cards, value pill. No photo.",
  checks: "Checkmark rows (two columns when long). No photo.",
  options: "White background. Option 1 (neutral) and Option 2 (Deep Teal) cards. No photo.",
  steps: "Deep Teal. Numbered application steps and a link box. No photo.",
  icp: "Typographic first-person quote, centered, with a large open-quote mark. Alternates Linen and Deep Teal. No photo.",
  poll: "Sage Mist background. Poll question and three numbered answer cards. No photo.",
  contrast: "White background. Two columns of paired cards: plays small (neutral) vs. knows her value (Deep Teal). No photo.",
  ifThen: "Deep Teal. Five \"If you feel… → you…\" rows. Designer: reveal one row per click. No photo.",
};

const clean = (t) => String(t).replace(/==/g, "");
const out = [];
const p = (...l) => out.push(...l);

if (meta) {
p(...meta.header);
} else if (V2) {
p(
  `# Done Waiting Your Turn: Masterclass Deck Outline (v${VER})`,
  "",
  "**Client:** Tamara Lashchyk · Amplify Your V.O.I.C.E. Experience  ",
  `**Companion file:** \`Tamara-Masterclass-v${VER}.pptx\` (same content, presenter notes in the notes field)`,
  "",
  `## What changed from v1${VER === "3" ? " (v2 and v3)" : ""}`,
  "",
  "- **Photos:** slides 1 to 24 (hook, agenda, authority and origin story) keep their photo placeholders. From slide 25 on, every photo is gone except one headshot per client story (Shelly, Nina, Erica), each flagged for written consent.",
  "- **Structure from slide 25 on follows the Sophie Orozco masterclass:** typographic slides (eyebrow, one big line, one supporting line), PART ONE to PART FOUR dividers, an Old Way ✕ list, a five-myth series (What Most Think → The Reality), stat slides with source lines, and for each V.O.I.C.E. pillar a card, a statement, the belief it breaks, ASK YOURSELF, WHAT THIS LOOKS LIKE and the outcome. Each client gets a four-step arc (Where It Started, What Wasn't Working, What Changed, Where She Is Now), followed by WHAT'S INCLUDED cards, YOU MIGHT BE WONDERING objections, YOU HAVE TWO OPTIONS and HOW TO APPLY.",
  `- **Slide count:** ${slides.length} (v1 was 112${VER === "3" ? ", v2 was 131" : ""}).`,
  ...(VER === "3" ? ["- **v3 trim:** removed the statement slide in each V.O.I.C.E. pillar (5) and the \"What wasn't working\" step in each client arc (3). Their key lines now sit in the presenter notes of the next slide, so \"When is it going to be my turn?\" and \"I want people to take me seriously\" are still said out loud.", "- **Next:** elements from Tamara's old presentation, once Daniel picks from the shortlist."] : []),
  "- **Presenter notes:** Tamara's fuller v1 notes are reused wherever the beat carried over. New beats (myths 2 to 4, ASK YOURSELF, WHAT THIS LOOKS LIKE, the client arcs) have new notes in her voice.",
  "- **New objections:** \"earn the right\" and \"greedy/difficult\" moved into the myth series, so the objection section adds two from the intake instead: \"I've already read the books\" (Q8) and \"Will the inner-work stuff really help my career?\" (Q8).",
  "- **Unchanged:** Step 1 diagnosis (Affluent, EmberFlow reference), strategy not tactics, brand, humanization rules. The new copy was run through the humanization checklist: no em-dashes, no new \"not X, it's Y\" reversals, no flagged vocabulary.",
  "- **Removed an inference:** v1 notes said Erica was early in her career. The intake doesn't say that, so it's gone.",
  "",
  "## Gap flags (still open, marked [PLACEHOLDER])",
  "",
  "- Next cohort start date, price and seat count. The founding cohort started Sept 15, 2026.",
  "- Per-deliverable values, the bonus and the total stack value (intake Q30 and Q31 are blank).",
  "- A source citation for \"60%+ of women have never negotiated their salary.\"",
  "- Client headshots and written consent for Shelly, Nina and Erica. Swap the paraphrased identity-shift lines for their own words or video if possible.",
  "- Additional testimonials, the application URL, logo usage rights (slide 11) and legal review of the disclaimer (slide 9).",
  "- Fonts: install Cormorant Garamond and DM Sans on the presenting machine.",
  "",
  "---",
  ""
);
} else {
p(
  "# Done Waiting Your Turn: Masterclass Deck Outline (v1)",
  "",
  "**Client:** Tamara Lashchyk · Amplify Your V.O.I.C.E. Experience  ",
  "**Built per:** Mastering Webinars SOP v1, Messaging Brief (Sections A to D), Intake Document, AI Tells & Humanization Checklist  ",
  "**Companion file:** `Tamara-Masterclass-v1.pptx` (same content, built slides with photo placeholders and presenter notes in the notes field)",
  "",
  "## Step 1 diagnosis (confirmed by Daniel)",
  "",
  "- **Audience:** Affluent. $150K to $300K+ corporate women, high-touch coaching offer, risk-forward language with no over-guaranteeing. The Enemy section borrows the In-Market Old Way vs. New Way frames because she misdiagnoses her problem as a skills gap.",
  "- **Reference deck:** Telemedicine (EmberFlow), the Affluent row in `deck-links.md`.",
  `- **Slide count:** ${slides.length} (Affluent range 90 to 120). Build/reveal sequences used for authority, compounding cost, Old Way vs. New Way, the offer stack and each case study.`,
  "- **Pillars:** the SOP template assumes 3 pillars. Tamara's mechanism has 5, so the V.O.I.C.E. Framework keeps all 5 (never renamed or shortened, per Messaging Brief B.3).",
  "- **Strategy, not tactics:** each pillar covers the belief it breaks, the reframe, why it matters and the outcome. No scripts, prep steps, templates or exercises. The how-to is positioned as what happens inside the program.",
  "- **Proposed title:** \"Done Waiting Your Turn\" (built from the Language Bank line \"When is it going to be my turn?\"). Swap freely.",
  "",
  "## Gap flags (marked [PLACEHOLDER] in the deck, nothing invented)",
  "",
  "- **Next cohort:** the founding cohort started Sept 15, 2026. Need the next start date, price and seat count (slides 91, 95 to 97, 110 and 111).",
  "- **Bonuses and values:** intake Q30 and Q31 are blank. Per-deliverable values, the bonus and the total stack value are placeholders (slides 81 to 91).",
  "- **\"60%+ of women have never negotiated\" (Q20):** needs a source citation before it goes live (slide 34).",
  "- **Compounding chart (slide 37):** optional chart needs real illustrative numbers. None are invented.",
  "- **Client photos and consent:** Shelly, Nina and Erica. Identity-shift quotes are paraphrased from the intake and should be replaced with their own words or video if possible.",
  "- **Extra testimonials** (slide 78), **application URL** and **calendar screenshot** (slides 110 and 111).",
  "- **Logos** (slide 11): confirm usage rights for J.P. Morgan, Merrill Lynch / Bank of America and Deutsche Bank.",
  "- **Disclaimer** (slide 9): have compliance/legal review the wording.",
  "- **Fonts:** the .pptx uses Cormorant Garamond (headings) and DM Sans (body). Install both from Google Fonts on the presenting machine, or PowerPoint will substitute.",
  "",
  "## Humanization pass log",
  "",
  "Ran the full AI Tells & Humanization Checklist over every headline, body line and presenter note.",
  "",
  "- **Em-dashes:** zero in the deck copy.",
  "- **Lexicon flags:** none (delve, leverage, harness, foster, landscape, journey, empower, etc. all absent). Brand-banned words (girl boss, empowerment) absent.",
  "- **\"Not X, it's Y\" reversals:** kept on purpose only where it is the locked thesis or her signature line (\"You don't have a negotiation problem. You have an identity problem.\" and \"Your greatest asset isn't in your portfolio. It's in the mirror.\"). Rewrote 9 others across 7 slides: the Value reframe, the misdiagnosis note, the boundaries slide, the \"referendum\" note, \"who this is for\", the favor objection and the imposter objection.",
  "- **Triplets / dramatic full stops:** broke up \"Five years. Costa Rica. India. No titles.\", \"Two internships. A recession. So I bagged groceries.\", \"The mechanic. The landscaper. The housekeeper.\" and a triplet in the origin notes. Locked message repetition was kept (the guarantee line \"thinking differently, communicating differently and showing up differently\" and \"No promotion. No raise. No recognition.\" come straight from the intake and brief).",
  "- **Narrative hook clichés:** removed \"the line that changed my life\" and \"here's the thing nobody tells you.\"",
  "- **Echoed openers:** cut \"Here's…\" sentence starts in the notes from 14 to 3.",
  "- **Epistemic hedging:** added hedges around opinionated claims (\"I could be wrong about how fast\", \"from what I've seen\", \"in my experience\", \"I could usually tell within a few seconds\").",
  "- **Language Bank:** every Language Bank phrase appears at least once (work speaks for itself, what if they say no, damage the relationship, when is it going to be my turn, keep getting overlooked, take me seriously, feel like I belong, earn the right). This is intentional message repetition.",
  "- **Read-aloud check:** the notes are written as spoken lines with her NY edge, some self-deprecation and a light spiritual touch. Tamara should still read them out loud and cut anything that doesn't sound like her.",
  "",
  "---",
  ""
);
}

let cur = 0;
slides.forEach((s, i) => {
  if (s.sec !== cur) {
    cur = s.sec;
    const n = slides.filter((x) => x.sec === cur).length;
    p(`## Section ${cur}: ${SECTIONS[cur]} (${n} slides)`, "");
  }
  p(`### SLIDE ${i + 1} · ${SECTIONS[s.sec].toUpperCase()}${s.build ? `   {BUILD ${s.build}}` : ""}`, "");
  if (s.h) p(`**Headline:** ${clean(s.h)}  `);
  if (s.sub) p(`**Subhead:** ${clean(s.sub)}  `);
  if (s.stat) p(`**Stat callout:** ${s.stat}  `);
  if (s.body) {
    if (Array.isArray(s.body)) { p("**Body:**  "); s.body.forEach((b) => p(`- ${clean(b)}`)); }
    else p(`**Body:** ${clean(s.body)}  `);
  }
  if (s.eyebrow) p(`**Eyebrow:** ${s.eyebrow}  `);
  if (s.think) p(`**${s.thinkLabel || "What most think"}:** ${s.think}  `, `**${s.realityLabel || "The reality"}:** ${s.reality}  `);
  if (s.who) p(`**Client:** ${s.who}  `);
  if (s.source) p(`**Source line:** ${s.source}  `);
  if (s.left && s.left.title) p(`**${s.left.label}:** ${s.left.title}. ${s.left.text}  `, `**${s.right.label}:** ${s.right.title}. ${s.right.text}  `);
  else if (s.left) p(`**Left column (${s.left.label}):** ${s.left.text}  `, `**Right column (${s.right.label}):** ${s.right.text}  `);
  if (s.rows) { p("**Rows:**  "); s.rows.forEach(([a, b]) => p(`- ${a} → ${b}`)); }
  if (s.leftLabel) p(`**Columns:** ${s.leftLabel} | ${s.rightLabel}  `);
  if (s.items) { p("**Items:**  "); s.items.forEach((x) => p(`- ${Array.isArray(x) ? x.join(" = ") : clean(x)}`)); }
  if (s.what) p(`**What it is:** ${s.what}  `, `**Why it matters:** ${s.why}  `, `**Value:** ${s.value}  `);
  if (s.total) p(`**Total:** ${s.total}  `);
  if (s.link) p(`**Link:** ${s.link}  `);
  p(`**Photo placeholder:** ${s.photo || "None (typographic slide)"}  `);
  const hl = ((s.h || "").match(/==(.+?)==/) || [])[1];
  p(`**Visual direction:** ${VISUAL[s.layout]}${hl ? ` Highlight bar on "${hl}".` : ""}${s.visual ? " " + s.visual : ""}  `);
  p(`**Presenter notes:** ${s.notes}`, "");
});

process.stdout.write(out.join("\n"));
