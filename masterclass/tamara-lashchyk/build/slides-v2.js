// v2 of Tamara's masterclass.
// Slides 1-24 are reused from v1 unchanged (photos kept through the origin story).
// From slide 25 on, the deck follows the Sophie Orozco masterclass structure:
// typographic slides, part dividers, myth series, ASK YOURSELF / WHAT THIS LOOKS LIKE beats,
// case-study arcs, WHAT'S INCLUDED cards and YOU MIGHT BE WONDERING objections.
// The only photos after slide 24 are one headshot per client arc (Shelly, Nina, Erica).
//
// Extra fields used by the v2 layouts:
//   eyebrow  small uppercase label above the headline
//   tone     "dark" | "light" | "white" | "mist" background for typographic layouts
//   think / reality   the two cards on a myth slide
//   items    list items (xlist, bullets, numbered, checks, steps)
//   stat / source     stat slide number and citation line

const v1 = require("./slides");
const { SECTIONS } = v1;
const N = (n) => v1.slides[n - 1].notes; // reuse Tamara's fuller v1 notes by v1 slide number

const pillar = (i, letter, name, def, notes) => ({
  sec: 8, layout: "pillarCard", eyebrow: `Pillar ${i} of 5`, letter, h: name, sub: def, notes,
});
const look = (items, notes) => ({ sec: 8, layout: "bullets", eyebrow: "What this looks like", items, notes });
const ask = (h, notes) => ({ sec: 8, layout: "ask", eyebrow: "Ask yourself", h, notes });
const outcome = (h, notes) => ({ sec: 8, layout: "line", tone: "dark", eyebrow: "The outcome", h, notes });
const wonder = (h, sub, notes) => ({ sec: 13, layout: "wonder", eyebrow: "You might be wondering", h, sub, notes });

const slides = [
  ...v1.slides.slice(0, 24),

  {
    sec: 5, layout: "line", tone: "light", eyebrow: "Where this comes from",
    h: "Wall Street taught me the strategy. ==The mirror taught me the rest.==",
    sub: "Together they became the V.O.I.C.E. Framework. First, let me show you why what you've already tried keeps stalling.",
    notes: "Those two chapters of my life, the deals and the inner work, are what I bring to you. Before I show you the framework, I want to show you why the things you've already tried keep running out of gas. Let's get into it.",
  },

  // ───────────── PART ONE ─────────────
  {
    sec: 6, layout: "divider", eyebrow: "Part one", h: "Why Working Harder Stopped Working",
    notes: "Let's start with what isn't working, because I don't want you spending another year on it.",
  },
  {
    sec: 6, layout: "line", tone: "light", eyebrow: "The old way",
    h: "\"I'll just keep working hard and ==my work will speak for itself.==\"",
    sub: "Most of us were raised on this plan.",
    notes: N(25),
  },
  {
    sec: 6, layout: "xlist", eyebrow: "The old way",
    items: [
      "Working harder and waiting to be noticed",
      "Waiting for the annual performance review",
      "Hoping your boss recognizes what you did",
      "Asking a mentor or a friend what they'd do",
      "Memorizing a better script",
    ],
    notes: "Every one of these makes sense. I did most of them myself. And every one of them leaves the decision about your worth in somebody else's hands.",
  },
  {
    sec: 6, layout: "myth", eyebrow: "Myth 1",
    think: "\"I have a negotiation problem. I need better tactics and the right words.\"",
    reality: "Your capability has outgrown the identity you've accepted. A better script can't close that gap.",
    notes: N(26),
  },
  {
    sec: 6, layout: "myth", eyebrow: "Myth 2",
    think: "\"My work will speak for itself.\"",
    reality: "Work is silent. Somebody decides what it's worth, and right now that somebody isn't you.",
    notes: "Your work has never once walked into a comp meeting and argued for you. Somebody talks about it in that room. The question is whether it's you, or whether you're relying on your boss's memory in December. Trust me, you don't want to rely on that.",
  },
  {
    sec: 6, layout: "myth", eyebrow: "Myth 3",
    think: "\"I have to earn the right to ask for more.\"",
    reality: "You earned it years ago. You're waiting on a permission slip nobody is going to sign.",
    notes: "I have to earn the right to ask. Honey, you earned it years ago. You're still waiting for somebody to sign the permission slip, and I promise you nobody in HR is walking around with a pen looking for it.",
  },
  {
    sec: 6, layout: "myth", eyebrow: "Myth 4",
    think: "\"Asking will make me look greedy, difficult or ungrateful.\"",
    reality: "Asking to be paid for the value you create is professional. The men down the hall do it behind closed doors.",
    notes: "Remember what my aunt said? Men do it all the time, behind closed doors. Nobody calls them greedy. They call them good at business. You get to be good at business too.",
  },
  {
    sec: 6, layout: "myth", eyebrow: "Myth 5",
    think: "\"The right script will fix this.\"",
    reality: "People buy the woman before they buy the words. The room hears doubt before it hears the script.",
    notes: N(30),
  },
  {
    sec: 6, layout: "bullets", eyebrow: "How the gap shows up",
    items: [
      "You minimize what you've actually accomplished",
      "You hesitate to ask for more",
      "You over-explain yourself",
      "You avoid the conversations you know you need to have",
    ],
    notes: N(31),
  },
  {
    sec: 6, layout: "line", tone: "dark", eyebrow: "And it follows you home",
    h: "It doesn't ==stay at the office.==",
    sub: "The mechanic, the landscaper, the housekeeper, sometimes your own husband and kids. The same weak boundary shows up everywhere.",
    notes: N(32),
  },

  // ───────────── PART TWO ─────────────
  {
    sec: 7, layout: "divider", eyebrow: "Part two", h: "What Waiting Really Costs",
    notes: N(33),
  },
  {
    sec: 7, layout: "stat2", stat: "60%+",
    sub: "of women have never negotiated their salary",
    source: "Source: [PLACEHOLDER: add citation]",
    notes: N(34),
  },
  {
    sec: 7, layout: "stat2", build: "1/3", eyebrow: "The math nobody shows you", stat: "Year 1",
    sub: "Your salary today is the base every future raise is built on.",
    notes: N(35),
  },
  {
    sec: 7, layout: "stat2", build: "2/3", eyebrow: "The math nobody shows you", stat: "Every year after",
    sub: "Raises, bonuses, retirement contributions and your next offer letter all stack on that number.",
    notes: N(36),
  },
  {
    sec: 7, layout: "stat2", build: "3/3", eyebrow: "The math nobody shows you", stat: "$100,000s",
    sub: "One more year of waiting can cost you hundreds of thousands of dollars over a career.",
    notes: N(37),
  },
  {
    sec: 7, layout: "line", tone: "dark", eyebrow: "The cost nobody talks about",
    h: "The emotional cost ==compounds faster.==",
    sub: "Every time you stay quiet, minimize what you did or wait to be noticed, you practice the exact pattern that's keeping you stuck.",
    notes: N(38),
  },
  {
    sec: 7, layout: "line", tone: "light", eyebrow: "Why now",
    h: "With AI, you no longer need to be ==the smartest person in the room.==",
    sub: "What matters now is what technology can't replicate.",
    notes: N(39),
  },
  {
    sec: 7, layout: "numbered", eyebrow: "What AI can't do for you",
    items: [
      "Think strategically and exercise judgment",
      "Communicate with influence",
      "Build real relationships",
      "Advocate for your ideas",
      "Lead with confidence",
    ],
    notes: N(40),
  },
  { ...v1.slides[40] }, // Executive presence statement

  // ───────────── PART THREE: V.O.I.C.E. ─────────────
  {
    sec: 8, layout: "divider", eyebrow: "Part three", h: "The V.O.I.C.E. Framework™",
    sub: "Twenty-six years of Wall Street negotiation plus five years of deep identity work",
    notes: N(42),
  },
  { ...v1.slides[42] }, // five-letter overview
  { ...v1.slides[43] }, // Negotiation is the vehicle

  // V
  pillar(1, "V", "Value", "Learn to see your value ==before you ask others to.==", N(45)),
  {
    sec: 8, layout: "line", tone: "light", eyebrow: "Value",
    h: "You've learned to equate ==hard work with value.==",
    sub: "Long hours and weekends feel like value because they cost you so much. They rarely show up on the page that decides your pay.",
    notes: "Long hours, weekends, saving your boss's bacon at 6 AM. It feels like value because it costs you so much. But look at what actually gets discussed when comp gets decided. It's results.",
  },
  { sec: 8, layout: "myth", eyebrow: "The belief Value breaks", think: "\"My value is how hard I work.\"", reality: "Companies pay for value. Effort alone never makes it into the comp discussion.", notes: N(46) },
  ask("If your work had to speak for itself in a comp meeting tomorrow, ==what would it actually say?==",
    "Sit with that one for a second. Most women I work with realize they've never done that math for themselves. Your value is measurable, and until you can see it, you're asking someone else to do math you haven't done. Inside the program we get specific about it. Tonight, just notice the answer."),
  look([
    "You stop apologizing for your wins",
    "You know your market value before anyone names a number",
    "You talk about your work in terms of results",
    "Review season stops being where you find out what you're worth",
  ], "Small shifts. You'll probably notice them before your boss does."),
  outcome("She knows her value and can ==articulate it with confidence.==", N(48)),

  // O
  pillar(2, "O", "Ownership", "If you want a bigger job, ==make your job bigger.==", N(49)),
  {
    sec: 8, layout: "line", tone: "light", eyebrow: "Ownership",
    h: "\"When is it going to be ==my turn?==\"",
    sub: "Notice what the question assumes: that somebody else is handing out turns.",
    notes: "I hear this one constantly, and I get it. But listen to what's baked into the question. It assumes somebody else is running the line, and you're waiting to get called.",
  },
  { sec: 8, layout: "myth", eyebrow: "The belief Ownership breaks", think: "\"If I do great work, someone will notice and promote me.\"", reality: "Nobody is coming to hand it to you. You're the CEO of your career.", notes: N(50) },
  ask("Where in your career are you still ==waiting to be chosen?==", N(51)),
  look([
    "You create opportunities instead of applying for them",
    "You stop waiting for the annual review to raise your hand",
    "Your influence grows past your job description",
    "You decide where your career goes next",
  ], "This is what it looks like when the CEO finally comes out of the lobby and takes the corner office."),
  outcome("She stops waiting to be chosen and ==starts choosing herself.==", N(52)),

  // I
  pillar(3, "I", "Identity", "Become ==the woman first.==", N(53)),
  {
    sec: 8, layout: "line", tone: "light", eyebrow: "Identity",
    h: "Every negotiation feels like ==a referendum on whether you're enough.==",
    sub: "That's why it's so emotional. Old beliefs, old money stories and old programming are quietly setting your ceiling.",
    notes: N(55),
  },
  { sec: 8, layout: "myth", eyebrow: "The belief Identity breaks", think: "\"I'll feel confident once I get the title and the number.\"", reality: "Your career will rarely exceed the identity you've accepted for yourself.", notes: N(54) },
  ask("What did you learn about money ==before you were ten years old?==",
    "For me it was a house with no savings and the lights getting shut off. You have your own version. You don't have to answer out loud. Just notice what comes up, because whatever it is, it's probably been sitting in on your negotiations."),
  look([
    "You stop asking whether you deserve more",
    "You take a compliment without deflecting it",
    "A no stops feeling like a verdict on you",
    "You walk into the room and feel like you belong there",
  ], "I want to walk into a room and feel like I belong. So many of you have said that to me. This is where it starts."),
  outcome("She no longer questions whether she deserves more. ==She expects it.==", N(56)),

  // C
  pillar(4, "C", "Communication", "Make your value ==impossible to ignore.==", N(57)),
  {
    sec: 8, layout: "line", tone: "light", eyebrow: "Communication",
    h: "\"I want people to ==take me seriously.==\"",
    sub: "That happens when the way you communicate catches up with what you can do.",
    notes: N(59),
  },
  { sec: 8, layout: "myth", eyebrow: "The belief Communication breaks", think: "\"I just need the perfect words.\"", reality: "People respond to who's saying the words far more than the words themselves.", notes: N(58) },
  ask("When you over-explain, ==who are you really trying to convince?==",
    "Over-explaining reads as doubt to the person across the table. And in my experience, the person we're really trying to convince is usually ourselves."),
  look([
    "Your ideas get credited to you",
    "You speak with authority without feeling like you're performing",
    "You get through the hard conversation without over-explaining",
    "Decision makers start coming to you",
  ], "And yes, that includes the meeting where Office Bro tries to pitch your idea back to you."),
  outcome("Her communication finally ==reflects her capability.==", N(60)),

  // E
  pillar(5, "E", "Execution", "Courage ==in action.==", N(61)),
  {
    sec: 8, layout: "line", tone: "light", eyebrow: "Execution",
    h: "Ideas without action are ==just hopes and dreams.==",
    sub: "Execution closes the gap between knowing and doing.",
    notes: N(63),
  },
  { sec: 8, layout: "myth", eyebrow: "The belief Execution breaks", think: "\"I'll act when I feel ready.\"", reality: "Confidence shows up after action. Rarely before.", notes: N(62) },
  ask("What conversation have you been ==putting off?==",
    "You probably thought of one immediately. That's the one."),
  look([
    "You have the conversation instead of rehearsing it in the shower",
    "You practice before it counts, with people in your corner",
    "Discomfort stops being a reason to wait",
    "You collect proof that you can do hard things",
  ], "Every one of these builds on the last. Confidence is a stack, a bit like compounding."),
  outcome("She builds the confidence that ==only comes from action.==", N(64)),

  { ...v1.slides[64] }, // V.O.I.C.E. together
  {
    sec: 8, layout: "line", tone: "light", eyebrow: "Why it works",
    h: "Most programs start at C. ==We start with who you are.==",
    sub: "Scripts only touch communication. The V.O.I.C.E. Framework works on the woman saying them.",
    notes: N(66),
  },
  { ...v1.slides[66] }, // Which letter hit you hardest?

  // ───────────── PART FOUR: CASE STUDIES ─────────────
  {
    sec: 9, layout: "divider", eyebrow: "Part four", h: "Women Who Closed the Gap",
    notes: N(68),
  },
  {
    sec: 9, layout: "line", tone: "dark", eyebrow: "Their stories",
    h: "Different industries, different pay bands, ==the same gap.==",
    sub: "Every career is different. These show what the work looked like for them.",
    notes: "I'm sharing these so you can see what the work looks like from the inside. Their results are theirs, and yours will be your own. But I'd bet you recognize yourself in at least one of them.",
  },
  // Shelly
  {
    sec: 9, layout: "caseStep", who: "Shelly", eyebrow: "Where it started",
    h: "Highly accomplished. ==Knew she was underpaid.==",
    sub: "An accomplished executive who believed her work should speak for itself.",
    photo: "Shelly headshot. [PLACEHOLDER: client photo + written consent]",
    notes: N(69),
  },
  {
    sec: 9, layout: "caseStep", who: "Shelly", eyebrow: "What wasn't working",
    h: "Waiting for her work ==to speak for itself.==",
    sub: "Negotiating felt deeply uncomfortable, so she kept delivering and kept hoping someone would notice.",
    notes: "Sound familiar? She was doing the old way perfectly. And it was costing her a fortune.",
  },
  {
    sec: 9, layout: "caseStep", who: "Shelly", eyebrow: "What changed",
    h: "She saw her value, ==and then she said it.==",
    sub: "We shifted her strategy and the way she saw herself. Once she understood her market value, she could communicate it with confidence.",
    notes: "We worked on her strategy, sure. But mostly we worked on how she saw herself and the value she brought. Once she saw it, she could say it.",
  },
  {
    sec: 9, layout: "caseStep", who: "Shelly", eyebrow: "Where she is now",
    stat: "$225K → $435K",
    h: "She stopped ==waiting for permission.==",
    sub: "She now makes every career decision from ownership instead of fear. [PLACEHOLDER: swap for Shelly's own words or video]",
    notes: "Her compensation went from 225 thousand to 435 thousand. And honestly, the number isn't the part I'm proudest of. Shelly stopped waiting for permission. She makes every career decision from ownership now, not fear. That shift is what she gets to keep.",
  },
  // Nina
  {
    sec: 9, layout: "caseStep", who: "Nina", eyebrow: "Where it started",
    h: "Exceptional work. ==Overlooked anyway.==",
    sub: "Years of success, and she still questioned her value.",
    photo: "Nina headshot. [PLACEHOLDER: client photo + written consent]",
    notes: N(72),
  },
  {
    sec: 9, layout: "caseStep", who: "Nina", eyebrow: "What wasn't working",
    h: "Minimizing her own ==accomplishments.==",
    sub: "She kept delivering, kept shrinking her wins and kept getting passed over for bigger opportunities.",
    notes: "Oh, it was a team effort. You've said it. Nina said it every single time, and every single time somebody else got the opportunity.",
  },
  {
    sec: 9, layout: "caseStep", who: "Nina", eyebrow: "What changed",
    h: "She learned to articulate ==the impact she created.==",
    sub: "She began communicating with more authority and stopped minimizing what she'd done.",
    notes: "She learned to clearly lay out the business impact she was creating. Same work, same woman, completely different conversation.",
  },
  {
    sec: 9, layout: "caseStep", who: "Nina", eyebrow: "Where she is now",
    stat: "$185K → $215K",
    h: "Acting like ==the leader she already was.==",
    sub: "And positioned for executive leadership. [PLACEHOLDER: swap for Nina's own words or video]",
    notes: "Her comp went from 185 to 215 thousand, and she's positioned for executive leadership now. The real change? She stopped seeing herself as someone hoping to be noticed. She started acting like the leader she already was, and the title is catching up.",
  },
  // Erica
  {
    sec: 9, layout: "caseStep", who: "Erica", eyebrow: "Where it started",
    h: "She dramatically ==underestimated her market value.==",
    sub: "She had no idea what the market was willing to pay for what she did.",
    photo: "Erica headshot. [PLACEHOLDER: client photo + written consent]",
    notes: "Erica's story is a little different, and I include it on purpose. She had no idea what she was worth. None.",
  },
  {
    sec: 9, layout: "caseStep", who: "Erica", eyebrow: "What wasn't working",
    h: "Asking whether she ==deserved more.==",
    sub: "When you don't know your market value, every number sounds generous.",
    notes: "When you don't know what you're worth, any offer sounds like a gift. That was Erica.",
  },
  {
    sec: 9, layout: "caseStep", who: "Erica", eyebrow: "What changed",
    h: "She learned what the market ==was willing to pay.==",
    sub: "Then she built the confidence to negotiate, and approached every opportunity differently.",
    notes: "Once she understood what the market would actually pay, and she had the nerve to ask for it, everything shifted.",
  },
  {
    sec: 9, layout: "caseStep", who: "Erica", eyebrow: "Where she is now",
    stat: "$28K → $80K",
    h: "She started ==expecting it.==",
    sub: "She expects to be paid for the value she creates. [PLACEHOLDER: swap for Erica's own words or video]",
    notes: "She went from 28 thousand to 80 thousand. Nearly triple. And underneath it, she stopped asking whether she deserved more and started expecting to be paid for the value she creates. Which, if you remember, is the Identity outcome.",
  },
  {
    sec: 9, layout: "line", tone: "dark", eyebrow: "The thread",
    h: "None of them waited for ==permission to go first.==",
    sub: "The money is one result. The woman is the transformation. [PLACEHOLDER: additional testimonials]",
    notes: N(78),
  },

  // ───────────── THE PROGRAM ─────────────
  {
    sec: 10, layout: "line", tone: "light", eyebrow: "The program",
    h: "So how do you do this ==without guessing?==",
    sub: "Knowing the framework is one thing. Living it while you're doing your job is another.",
    notes: "Knowing the framework is one thing. Doing it on a Tuesday, with your boss, while Office Bro is eating a bagel across the table, is another.",
  },
  {
    sec: 10, layout: "divider", eyebrow: "The program", h: "The Amplify Your V.O.I.C.E. Experience",
    sub: "An intimate, high-touch 8-week executive coaching experience for ambitious corporate women",
    notes: N(79),
  },
  {
    sec: 10, layout: "myth", eyebrow: "Who this is for", arrow: false,
    thinkLabel: "This is for you if…", realityLabel: "This isn't for you if…",
    think: "You're an ambitious corporate woman who's capable of more, ready to go deeper than tactics, and willing to invest in yourself.",
    reality: "You want a résumé review, a list of scripts, or a quick fix without doing the inner work.",
    notes: N(80),
  },
  ...v1.slides.slice(80, 89).map((s, i) => ({
    sec: 10, layout: "included", build: s.build, h: s.h, what: s.what, why: s.why, value: s.value, notes: s.notes,
    eyebrow: s.build ? `What's included · ${s.build.replace("/", " of ")}` : "Bonus",
  })),
  {
    sec: 10, layout: "checks", tone: "dark", eyebrow: "Everything you get",
    items: v1.slides[89].items, total: v1.slides[89].total,
    notes: N(90),
  },
  {
    sec: 10, layout: "stat2", eyebrow: "Your investment", stat: "[PLACEHOLDER: price]",
    sub: "One successful negotiation can return many times this investment. And you keep the skills for the rest of your career.",
    notes: N(91),
  },

  // ───────────── COMMITMENT + URGENCY ─────────────
  {
    sec: 11, layout: "line", tone: "light", eyebrow: "What I can't promise",
    h: "I can't guarantee how another person ==or organization will respond.==",
    sub: "Anyone who tells you otherwise is selling you something.",
    notes: N(92),
  },
  { ...v1.slides[92] }, // What I can promise
  {
    sec: 11, layout: "line", tone: "light", eyebrow: "My commitment",
    h: "Transformation is something ==we create together.==",
    sub: "If you show up, do the work, participate in the coaching and fully engage, I'll be there every step of the way to challenge you and support you.",
    notes: N(94),
  },
  {
    sec: 12, layout: "stat2", eyebrow: "The cohort is intentionally small", stat: "[PLACEHOLDER: # seats]",
    sub: "So I can personally coach every woman in the room. Once the seats are filled, enrollment closes.",
    notes: N(95),
  },
  {
    sec: 12, layout: "stat2", eyebrow: "The next cohort begins", stat: "[PLACEHOLDER: start date]",
    sub: "Applications are reviewed in the order they come in.",
    notes: N(96),
  },
  {
    sec: 12, layout: "bullets", eyebrow: "Waiting is the most expensive choice",
    items: [
      "Every future raise built on a lower base",
      "Bonuses and retirement contributions calculated from it",
      "Another year of saying nothing, and getting better at it",
      "[PLACEHOLDER: future cohorts priced higher, if still true]",
    ],
    notes: N(97),
  },

  // ───────────── YOUR QUESTIONS ─────────────
  {
    sec: 13, layout: "divider", eyebrow: "Your questions", h: "You Might Be Wondering",
    notes: N(98),
  },
  wonder("\"My industry is different.\"", "Your industry sets the numbers. Knowing your value and advocating for yourself works in all of them.", v1.slides[98].notes),
  wonder("\"I'm not good at negotiating, and I hate asking for favors.\"", "What you're having is a business conversation about value. Replacing you is expensive, and your company knows it.", v1.slides[99].notes),
  wonder("\"I don't have time.\"", "Staying where you are costs more than eight weeks ever will. One courageous conversation can change a career.", v1.slides[100].notes),
  wonder("\"What if they say no? I don't want to damage the relationship with my boss.\"", "A well-prepared, professional conversation shouldn't damage a healthy relationship. A no is information.", v1.slides[101].notes),
  wonder("\"Is it really worth the investment?\"", "Do the math on one negotiation. Then remember you'll have many more.", v1.slides[102].notes),
  wonder("\"I've already read the books and listened to the podcasts.\"", "Then you have the information. What's left is the part a book can't do with you: changing how you see yourself.",
    "You've done the reading. Most of the women I work with have a whole shelf. And if information were enough, you wouldn't be here tonight. The identity work, the practice and the coaching are the parts a book can't do with you."),
  wonder("\"Will the inner-work stuff really help my career?\"", "Identity drives how you communicate, advocate and lead. Shelly, Nina and Erica's raises came from that shift.",
    "Fair question from a room full of rational, successful women. I spent 26 years on Wall Street. I'm not going to ask you to hug a tree. The identity work is what makes the strategy land, and you just saw what it did for three women."),
  wonder("\"What if I get found out? What if I'm not as good as they think?\"", "Almost every high achiever I've worked with has felt this, including me. Your results are real.", v1.slides[105].notes),
  wonder("\"I'll do it when things calm down.\"", "Things don't calm down. Waiting for the right time is the same pattern, dressed up as patience.", v1.slides[106].notes),

  // ───────────── RECAP + CTA ─────────────
  {
    sec: 14, layout: "checks", tone: "light", eyebrow: "Here's everything we covered",
    items: [
      "You don't have a negotiation problem. You have an identity problem.",
      "The five myths that keep smart women underpaid",
      "Why the cost of waiting compounds, financially and emotionally",
      "The V.O.I.C.E. Framework: Value, Ownership, Identity, Communication, Execution",
      "How Shelly, Nina and Erica closed the gap",
    ],
    notes: "Let's recap. The problem is identity, not negotiation skills. You saw the five myths that keep smart women underpaid, and why waiting costs you money and a lot more than money. You saw the V.O.I.C.E. Framework. And you saw what happened for Shelly, Nina and Erica when they closed the gap. That's a lot. Take a breath.",
  },
  {
    sec: 14, layout: "line", tone: "dark", eyebrow: "The question",
    h: "You already have the capability. ==The open question is who walks into the room.==",
    notes: N(109),
  },
  {
    sec: 15, layout: "options", eyebrow: "You have two options",
    left: { label: "Option 1", title: "Keep going alone", text: "Keep the same plan and wait another year to be noticed." },
    right: { label: "Option 2", title: "Apply for the Amplify Your V.O.I.C.E. Experience", text: "Close the gap with me and a small group of women who get it." },
    notes: "You can keep doing what you've been doing. You already know where that goes. Or you can get help built for exactly where you are.",
  },
  {
    sec: 15, layout: "checks", tone: "white", eyebrow: "On your application call, we'll",
    items: [
      "Look at where you are in your career",
      "Talk about what's keeping you stuck",
      "Get clear on what you want next",
      "See if the program is the right fit, for both of us",
    ],
    notes: "It's a real conversation, with no pressure. If it's not the right fit, I'll tell you.",
  },
  {
    sec: 15, layout: "steps", eyebrow: "How to apply",
    items: [
      "Go to [PLACEHOLDER: application URL]",
      "Answer a few short questions about your career",
      "I review every application personally",
      "If it's a fit, we'll invite you to a conversation",
    ],
    link: "[PLACEHOLDER: application URL] · Next cohort: [PLACEHOLDER: start date]",
    notes: v1.slides[109].notes + " The group is small and the seats go in order. If you felt something tonight, that's your cue.",
  },
  {
    sec: 15, layout: "statement", h: "When is it going to be ==your turn?==",
    sub: "I'm rooting for you.  ·  Tamara Lashchyk  ·  tamaralashchyk.com",
    notes: N(112) + " [Open Q&A.]",
  },
];

module.exports = { slides, SECTIONS };
