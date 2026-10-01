// v4 of Tamara's masterclass: v3 content, restyled after Sophie's deck (build-deck-sophie.js),
// with the Bob Proctor future-pacing visualization and fully scripted presenter notes (~60 min).
//
// Changes vs v3:
//  - Title slide becomes a framed text-only title card (Sophie style).
//  - "Before we begin." + Bob Proctor quote inserted between the authority section and the origin story.
//  - "Most programs start at C" folded into the notes of the V.O.I.C.E. recap slide (keeps the deck at 120).
//  - Final slide becomes a framed closing card.
//  - Every slide's notes rewritten as a word-for-word script. The builder adds a
//    "SLIDE N | SECTION [~mm:ss]" header to each one.

const v3 = require("./slides-v3");
const { SECTIONS } = v3;

const NOTE_SECTIONS = {
  1: "TITLE + HOOK", 2: "WHAT I'M COVERING", 3: "RESULTS DISCLAIMER", 4: "WHO I AM", 5: "ORIGIN STORY",
  6: "THE OLD WAY", 7: "WHY NOW", 8: "THE V.O.I.C.E. FRAMEWORK", 9: "CLIENT STORIES", 10: "THE PROGRAM",
  11: "MY COMMITMENT", 12: "URGENCY", 13: "YOUR QUESTIONS", 14: "RECAP", 15: "APPLY",
};

const clean = (t) => String(t || "").replace(/==/g, "");

// ── structure ──────────────────────────────────────────────
const base = v3.slides.filter((s) => !clean(s.h).startsWith("Most programs start at C"));

const BEFORE = { sec: 5, noteSection: "VISUALIZATION PREFACE", layout: "statement", h: "Before we ==begin.==" };
const PROCTOR = {
  sec: 5, noteSection: "VISUALIZATION", layout: "proctor",
  h: "\"Thoughts become things. If you can see it in your mind, ==you will hold it in your hand.==\"",
  sub: "Bob Proctor",
  photo: "Bob Proctor, black-and-white portrait. [PLACEHOLDER: confirm image rights or license a photo]",
};

const structured = [];
base.forEach((s, i) => {
  if (i === 0) {
    structured.push({
      sec: 1, layout: "titleCard", eyebrow: "Live masterclass",
      h: "Done Waiting ==Your Turn==",
      sub: "Why smart, capable women stay underpaid, and the identity shift that changes it",
      body: "with Tamara Lashchyk",
    });
    return;
  }
  if (i === base.length - 1) {
    structured.push({
      sec: 15, layout: "divider", eyebrow: "Apply now",
      h: "When is it going to be ==your turn?==",
      sub: "I'm rooting for you.  ·  Tamara Lashchyk  ·  tamaralashchyk.com",
    });
    return;
  }
  structured.push({ ...s });
  if (clean(s.h).startsWith("I learned negotiation across a real desk")) structured.push(BEFORE, PROCTOR);
});

// ── presenter notes, in slide order: [anchor that must appear on the slide, script] ──
const NOTES = [
  // 1. TITLE + HOOK
  ["Done Waiting", `Hi, and welcome. I'm Tamara Lashchyk, and I'm really glad you're here. Grab a coffee, or a glass of wine, depending on what time it is where you are. I'm not judging. Over the next hour I'm going to show you why so many smart, capable women stay underpaid, and I promise the reason isn't the one you've been told. Stay with me to the end, because that's where it all comes together. Let's start with you.`],
  ["my work will speak for itself", `Let me paint a picture, and you tell me if it sounds familiar. It's six in the morning. You're at the gym, finally doing something for yourself, and your boss calls. He's got a call with Asia and he doesn't have the numbers. So you jump on. You save his bacon. Then you shower, head into the office, and nobody there ever hears about it. Your boss certainly doesn't bring it up in your review. And you tell yourself that's fine. I'll just keep working hard, and my work will speak for itself.`],
  ["I hate negotiating", `Be honest with me. How many of you have said this one out loud? I know I'm probably underpaid, but I hate negotiating. And right behind it come the others. What if they say no? I don't want to make things awkward. I don't want to damage the relationship with my boss. (Pause.) I said every one of those for years. I was a vice president on Wall Street, and my palms still sweated walking into my boss's office. Smart women aren't bad at this because they aren't smart enough. Something else is going on, and we'll get to it. So if you're nodding right now, you're in good company.`],
  ["my turn?", `Nine o'clock team meeting. You put an idea on the table. Crickets. Then Office Bro rolls in late, looking like the cat dragged him in, coffee in one hand and a bagel in the other. He chews for a while, then he lobs out your idea, basically, only dumber. And the room lights up. You're sitting there thinking, you have got to be kidding me. And you say nothing, because you don't want to look petty, or difficult, or like you're keeping score. When is it going to be my turn?`],
  ["This can't be all there is", `You finally get home around eight thirty. Uber Eats shows up and they forgot your side salad. You don't call. You say nothing, same as you said nothing when that guy jumped into your cab this morning. Another long day, and still no promotion, no raise, no recognition. And later, lying there, the thought you don't say out loud: I want more. This can't be all there is. (Pause.) If any of these four landed a little too close to home, you're in exactly the right room.`],
  ["playing-small problem", `So before we go any further, I want to tell you something most experts won't tell you about being underpaid. (Pause. Let it land.) Being underpaid isn't a money problem. It's a playing-small problem. You can be brilliant, prepared and great at your job, and still play small. From what I've seen, the most capable women are often the best at it. And playing small is an identity problem. Let me say that one more way, because everything tonight builds on it.`],
  ["You don't have a negotiation problem", `You don't have a negotiation problem. You have an identity problem. (Pause.) I know. You came here thinking I'd hand you a better script, and part of you is a little annoyed with me right now. That's fine. Stay with me, because by the end of this hour I think you'll see your whole career differently.`],
  ["Your capability has outgrown", `Here's my promise for tonight. You've grown. Your skills, your judgment and your results have all grown. But the way you see yourself hasn't kept pace, and the people across the table can feel it. They can't name it, but they feel it. They feel the woman who's asking, instead of the woman who expects. When you close that gap, you stop asking for permission. You start commanding your worth, and the raises and promotions tend to follow. So let me show you where we're going.`],

  // 2. WHAT I'M COVERING
  ["covering today", `Here's the roadmap. First, why working harder stopped working for you. Second, what waiting is really costing you, and it's more than money. Third, I'll walk you through my V.O.I.C.E. Framework and why it starts with identity. Then you'll meet Shelly, Nina and Erica, three women who closed this gap. And at the end, I'll tell you how you can work with me if you want to go further. I'm going to give you a lot tonight, and I'm going to be honest with you, even when it's a little uncomfortable. That's kind of my brand.`],
  ["Where are you", `But first, I want to know who's here with me. Look at these three and type 1, 2 or 3 in the chat. One, you've never negotiated and you know you're underpaid. Two, you've negotiated, but you're still underpaid and you want more. Three, you're winning, but your pay doesn't reflect it. (Read a few answers out loud and react to them.) Wherever you are, you're in the right room. By the end of tonight, I want every one of you thinking about what it takes to get to three.`],
  ["One ask", `One favor before we start. A lot of what I'm going to say won't sound like normal career advice. You got where you are by being tough and rational and never letting them see you sweat. I get it. I lived that for twenty-six years. For the next hour, loosen your grip a little. Close the other tabs, turn your phone face down, and listen with an open mind and an open heart. You can go back to being tough tomorrow.`],

  // 3. DISCLAIMER
  ["A quick note on results", `Quick housekeeping. The client results I'm going to share are real, but everyone's situation is different, and nobody can promise you a specific number. Including me. Okay. Now let me tell you who I am.`],

  // 4. WHO I AM
  ["26 years", `So who am I to talk about this? I spent twenty-six years on Wall Street. I negotiated deals with a lot of zeros on them. And I led global talent initiatives, which means I also sat on the other side of the table, deciding who got paid what. I've been the woman asking for the raise, and I've been the person deciding whether she got it. Very few people get to see both sides of that table.`],
  ["J.P. Morgan", `J.P. Morgan. Merrill Lynch, which became Bank of America. Deutsche Bank. I know how these places decide compensation, because I was in the rooms where it got decided.`],
  ["#1", `And by the end of my Wall Street career, I was the highest-paid person in my U.S. division. Man or woman. (Pause.) I want you to hear that, because it didn't start that way. I'll tell you how it started in a minute, and it was ugly.`],
  ["Lose the Gum", `Along the way I wrote a book called Lose the Gum. It's a survival guide for women on Wall Street, Main Street and every street in between. And yes, the title comes from a real story. Buy me a drink sometime and I'll tell you.`],
  ["Women of Wall Street Award", `I received the Women of Wall Street Award for helping advance women's careers in financial services, and a Special Congressional Recognition for my contributions to banking and finance. I'm proud of both. But neither of them is the most useful thing I learned.`],
  ["real money on the line", `Most people who teach negotiation studied it. I did it, for twenty-six years, across a real desk with real money on the line. Then I did something most bankers would call insane. I walked away and spent five years on the inside work. The combination of those two things is what I bring to you tonight. But before I tell you that story, I want to do something with you.`],

  // VISUALIZATION
  ["Before we", `Before we go any further, I'd like to do a short exercise with you. It's something I did for myself when I was rebuilding my own life, and honestly, I still do it. It takes about two minutes. Just stay with me.`],
  ["Thoughts become things", `The late Bob Proctor used to say, "If you can see it in your mind, you will hold it in your hand." What he meant is that you can't move toward something you can't see. So get comfortable. If you're somewhere safe to do it, close your eyes. (Slow down. Soft voice. Pause between lines.)

Take a deep breath in. And let it go.

Picture a morning about a year from now. You walk into the office and you feel different. Lighter. You're not bracing for anything.

There's a meeting on your calendar today. It's the conversation about your compensation. And notice how you feel about it. You're calm. You've done the work. You know exactly what you're worth.

You walk into that room and you feel like you belong there. You sit down, and you speak clearly. You don't over-explain. You don't apologize. You sound like a woman who knows her worth, because you do.

Notice how the person across the table looks at you. They're taking you seriously. Because you're taking yourself seriously.

Now picture a team meeting a few weeks later. You put an idea on the table, and this time it lands. It has your name on it. Office Bro is still eating his bagel, and nobody's looking at him.

Now picture coming home that night. Your shoulders drop. You have energy left for the people you love. And when someone takes you for granted, at work or at home, you say something. Kindly. Clearly.

Notice the woman in that picture. How she's standing. How she's breathing. She isn't waiting for anyone's permission.

(Pause.) That woman already exists inside you. Everything we talk about tonight is about becoming her.

Take one more breath. And when you're ready, open your eyes.

(Pause.) How did that feel? Hold on to that picture. You just took the first step, because you can't move toward something you can't see. Now let me tell you how I found my way to her.`],

  // 5. ORIGIN STORY
  ["house", `I grew up in a house with no savings. We weren't poor, exactly. But there was nothing in the bank, the credit cards were maxed out, and there were nights the lights went off because the bill didn't get paid. If you're wondering where my relationship with money started, it started right there, in the dark. Money was something we didn't talk about, except when it was a crisis. So I learned early that money meant stress, and asking for it meant trouble. It took me decades to see how much that little girl was still sitting in on my negotiations.`],
  ["lost my mother", `When I was eighteen, my mother died suddenly. Soon after, my father declared bankruptcy. So I put myself through college, and I walked out with more than fifty thousand dollars of student debt. That's north of a hundred thousand today. And I graduated straight into a recession. No safety net, no family connections, no mentors and no fancy school on my résumé. Just a lot of debt and a lot of nerve.`],
  ["bagged groceries", `I had two Wall Street internships on my résumé, and nobody was hiring. So I bagged groceries at the Acme. Honestly, best education I ever got. You learn a lot about people when you're the one bagging their groceries. Who says thank you, and who looks right through you. I've never forgotten it. But I didn't let go of Wall Street. There was money to be made there and I wanted a piece of it. I sent J.P. Morgan hundreds of résumés. Hundreds. Eventually they said yes, probably just to make me stop.`],
  ["underpaid", `My career took off. People inside the firm and across the industry knew my name. And I was underpaid. There is nothing more demoralizing than working that hard and not being recognized for it. I was the one staying late, fixing the problems, making my boss look good. And every year I'd sit in my review, nod politely and say thank you for whatever number they gave me. I remember sitting in my aunt's bedroom one night, crying, completely wiped out. And she asked me one simple question. Why don't you ask for a raise? I said, "We don't do that."`],
  ["play with the big boys", `She snapped right back. (Slowly.) "Men do it all the time, and they do it behind closed doors, which is why you never hear about it." And then the line I still hear in my head. "If you want to play with the big boys, you'd better learn to ask for what you want." (Pause four full seconds.) She was absolutely right. And that one sentence changed the entire trajectory of my career, and honestly, my life.`],
  ["a disaster", `So the next day I asked for a meeting with my boss. And I blew it. I was nervous, I fumbled, and I asked for way too little. Did I get a raise? Yes. Did I walk out looking like a mature, skilled professional? Absolutely not. I looked like a rookie. I'd spent weeks proving my value to everyone except the one person who mattered in that moment, which was me. That meeting started a lifelong obsession with negotiation, and more than anything with the psychology behind it.`],
  ["got fired", `Fast forward twenty-six years. I'm the highest-paid person in my division, at the top of my game. And I get fired by my boss, two days before she retires. A classic Wall Street F.U. I'd given that world decades of my life, and it ended in one short meeting. That's not how I wanted my story to end. I started a coaching business, and the first year made good money. But something was off, and I couldn't shake it.`],
  ["Costa Rica", `When the title goes, you find out how much of you was the title. I had to look at myself in a dust-free mirror. So I spent five years in Costa Rica and India, stripping it all away, the titles and the business cards included. I did the inner work I'd been too busy to do for twenty-five years. I sat with things I had never let myself feel. I looked hard at the stories I'd been telling myself about money and about what I deserved. It was the hardest work I've ever done, and I've done some very hard deals. And what I found underneath was something no bonus ever gave me: a real sense of who I am.`],
  ["It's in the mirror", `Those five years changed how I think about success. I believe success without fulfillment is failure. I believe your life will rarely go past the identity you've accepted for yourself. And I believe your greatest asset isn't in your portfolio. It's in the mirror. (Pause.) Hold on to that. Now let's talk about why the plan you were handed keeps letting you down.`],

  // 6. THE OLD WAY
  ["Why Working Harder Stopped Working", `Part one. Why working harder stopped working. I want to start with what isn't working, because I don't want you spending another year on it.`],
  ["Memorizing a better script", `Here's the plan most of us were handed. Work harder and wait to be noticed. Wait for the annual performance review. Hope your boss recognizes what you did. Ask a mentor or a friend what they would do. Memorize a better script. Every one of these makes sense, and I did most of them myself. But every one of them leaves the decision about your worth in somebody else's hands. Let's look at the beliefs underneath them.`],
  ["Myth 1", `Myth number one. Most women think, "I have a negotiation problem. I need better tactics and the right words." So they buy the book, watch the video, memorize a line, and nothing changes. The reality is that your capability has outgrown the identity you've accepted. A better script can't close that gap, because the words were never what was missing.`],
  ["Myth 2", `Myth number two. "My work will speak for itself." Here's the thing. Your work has never once walked into a comp meeting and argued for you. Somebody talks about it in that room. The question is whether it's you, or whether you're relying on your boss's memory in December. Trust me, you don't want to rely on that.`],
  ["Myth 3", `Myth number three. "I have to earn the right to ask for more." Think about how long you've already been doing the job at the level above your title. Months? Years? You're not early. If anything, you're late. Honey, you earned it years ago. You're waiting on a permission slip, and I promise nobody in HR is walking around with a pen looking for it.`],
  ["Myth 4", `Myth number four. "Asking will make me look greedy, difficult or ungrateful." Remember my aunt? Men do it all the time, behind closed doors. Nobody calls them greedy. They call them good at business. Asking for what you're worth shows the people above you that you take the business, and yourself, seriously. You get to be good at business too.`],
  ["Myth 5", `And myth number five. "The right script will fix this." I sat on the other side of the table for years. Someone would walk in with a beautiful script, and I could usually tell within a few seconds whether they believed a word of it. People buy the woman before they buy the words. The room hears the doubt before it hears the script.`],
  ["How the gap shows up", `So day to day, the gap looks something like this. You minimize what you've actually accomplished. Oh, it was a team effort. You hesitate to ask for more. You over-explain, which in a negotiation reads as doubt. And you avoid the conversations you know you need to have, until they're unavoidable, or until it's too late. You don't have to raise your hand for this one.`],
  ["stay at the office", `The part people don't expect is how far it travels. The mechanic who pads the bill. The landscaper. The housekeeper. Sometimes your own husband and kids, taking you for granted. That's how I know we're dealing with identity. A skills problem would stay at the office. This one follows you home. And it gets more expensive every year. Let me show you how much.`],

  // 7. WHY NOW
  ["What Waiting Really Costs", `Part two. What waiting really costs. I'm a finance person, so let's talk numbers for a minute. And then let's talk about the cost that never shows up on a pay stub.`],
  ["64%", `Sixty-four percent of women never negotiate their salary. Never. Not once. If you're in that group, no judgment. I was almost in that group myself. But you should know that you're leaving money on the table, and somebody else is picking it up. And in my experience, the women who never ask are rarely the weakest performers. They're often the ones everyone depends on.`],
  ["$57,000", `Here's the math nobody shows you. Say you skip one negotiation and leave five thousand dollars on the table. Your raises are percentages of your base, so that missing five thousand grows every year, about three percent a year. After ten years, the one conversation you didn't have has cost you about fifty-seven thousand dollars.`],
  ["$134,000", `After twenty years, about a hundred and thirty-four thousand. And that's before your bonus and your retirement match, which are percentages of the same number. It's also before your next employer asks what you're making now.`],
  ["$237,877", `Over a thirty-year career: two hundred thirty-seven thousand, eight hundred seventy-seven dollars. (Pause.) From one missed conversation. I spent my career watching compounding make people rich. It works just as hard against you.`],
  ["emotional cost", `But honestly, the money isn't what worries me most. Every time you say nothing, you're rehearsing. You're getting better at being the woman who says nothing. From the outside your life looks great. On the inside you can't figure out why it still doesn't feel like enough. That weight compounds faster than any salary does. And it leaks into everything: your patience, your energy, your relationships. You can't play small for fifty hours a week and then play big at home.`],
  ["smartest person in the room", `And the market just shifted. With AI, being the smartest person in the room, the one with all the answers, is worth less every month. The machine has answers. I could be wrong about how fast this happens, but I'd bet my bonus on the direction. What AI can't do is exercise judgment, build real relationships, communicate with influence, advocate for your ideas and lead people with confidence. Those are human.`],
  ["Executive presence", `So executive presence is becoming the competitive advantage. The people who thrive over the next decade will be the ones who know what makes them unique and how to get paid for it. And that starts with knowing yourself. Which brings me to the framework.`],

  // 8. V.O.I.C.E.
  ["The V.O.I.C.E. Framework™", `Part three. I spent years figuring out how to close the gap between who you are and who you're showing up as, first on Wall Street and then on the inside. I put everything I learned into one framework.`],
  ["Ownership", `It's called the V.O.I.C.E. Framework. Value. Ownership. Identity. Communication. Execution. Five parts, and the order matters. Value comes first, because you can't communicate what you can't see. Identity sits right in the middle, because it holds everything else up. Tonight I'm going to walk you through what each one is and why it matters. The detailed how-to is what we do together inside the program. Tonight is about seeing the whole map.`],
  ["Transformation is the destination", `One thing before we start. Negotiation is the vehicle. Transformation is the destination. A raise is one way you'll measure this work. But where you're really going is seeing yourself differently, and once that shifts, the negotiation gets a whole lot easier.`],
  // V
  ["Value", `V is for Value. Learn to see your value before you ask others to. Most of the women I work with are brilliant at their jobs and terrible at seeing it. Long hours, weekends, saving your boss's bacon at six in the morning. It feels like value because it costs you so much. We were taught to measure ourselves in hours, while everyone else measures us in results.`],
  ["The belief Value breaks", `Here's the belief we break. "My value is how hard I work." The reality is that companies pay for value. Effort alone never makes it into the comp discussion. Nobody on a comp committee ever said, well, she seemed really tired.`],
  ["74%", `And women who prepare are seventy-four percent more likely to earn a raise. Preparation starts with seeing your own value clearly. Most women skip that part, because they don't know where to start, or because they quietly resist the whole idea.`],
  ["what would it actually say", `So ask yourself this. If your work had to speak for itself in a comp meeting tomorrow, what would it actually say? (Pause.) Sit with that for a second. Most women realize they've never done that math for themselves. Your value is measurable, and until you can see it, you're asking someone else to do math you haven't done.`],
  ["articulate it", `When this piece clicks, she knows her value and can articulate it with confidence. You stop apologizing for your wins. You know your market value before anyone names a number. You talk about your work in terms of results. And review season stops being where you find out what you're worth. You'll probably notice these shifts before your boss does.`],
  // O
  ["make your job bigger", `O is for Ownership. If you want a bigger job, make your job bigger. That one comes straight from my Wall Street years. I noticed something about the people who got ahead. They didn't wait for a job description to tell them what they were allowed to do. They took on the bigger problem, and the title came after.`],
  ["The belief Ownership breaks", `When is it going to be my turn? I hear that one constantly, and notice what's baked into it. It assumes somebody else is running the line. The belief we break here is, "If I do great work, someone will notice and promote me." The hard truth is that nobody is coming to hand it to you. You're the CEO of your career, and right now the CEO is waiting in the lobby.`],
  ["waiting to be chosen", `So where in your career are you still waiting to be chosen? (Pause.) Waiting feels safe. But it's still a strategy, and it's a bad one. The women who move up take ownership of where they're going. They create the opportunity instead of applying for it. Men figured this out a long time ago, behind closed doors, just like my aunt said.`],
  ["choosing herself", `When this piece clicks, she stops waiting to be chosen and starts choosing herself. She creates opportunities instead of applying for them. She raises her hand long before review season. Her influence grows past her job description. And she decides where her career goes next.`],
  // I
  ["the woman first", `I is for Identity. This is the heart of it, and it's the piece you won't find in any negotiation book. Become the woman first. Everything else in the framework stands on this one. You can know your value, take ownership and say all the right words, but if the woman saying them doesn't believe them, the room knows.`],
  ["Your identity drives your behavior", `Here's how it plays out. The woman who sees herself as lucky to be here negotiates very differently from the woman who sees herself as an asset. The woman who fears rejection hints and hopes. The woman who knows her power asks clearly, without apologizing. And the woman who believes her value has to be earned will overdeliver forever and stay underpaid. Same skills, different identity, and a very different paycheck.`],
  ["If you feel invisible", `Your identity is the operating system running underneath everything else. (Read slowly, one line at a time.) If you feel invisible, you stay quiet. If you feel replaceable, you settle. If you believe you're unworthy, you stay underpaid. Now flip it. If you feel valuable, you ask for more. If you feel powerful, you show up differently. (Pause.) Which line felt true for you? You don't have to say it. Just notice.`],
  ["The belief Identity breaks", `Every negotiation feels like a referendum on whether you're enough, and that's why it's so emotional. The belief we break here is, "I'll feel confident once I get the title and the number." It works the other way around. Your career will rarely exceed the identity you've accepted for yourself. You have to become her first.`],
  ["Identity is constructed", `And here's the good news, which is the reason I do this work. Identity is not fixed. Identity is constructed. Which means you can rebuild it, on purpose. I did it at eighteen. I did it again when I left Wall Street. And I watch women do it in every cohort.`],
  ["ten years old", `So ask yourself this one. What did you learn about money before you were ten years old? (Pause.) For me it was a house with no savings and the lights getting shut off. You have your own version. You don't have to answer out loud. Just notice what comes up, because whatever it is, it has probably been sitting in on your negotiations.`],
  ["She expects it", `When this piece clicks, she no longer questions whether she deserves more. She expects it. She stops asking whether she deserves it. She takes a compliment without deflecting it. A no stops feeling like a verdict on her. And she walks into the room and feels like she belongs there. So many of you have told me that's what you want. This is where it starts.`],
  // C
  ["impossible to ignore", `C is for Communication. Make your value impossible to ignore. So many of you have told me, "I want people to take me seriously." This is where that happens. In a room full of people, the clearest, calmest voice usually wins, even when it isn't the loudest.`],
  ["The belief Communication breaks", `The belief we break is, "I just need the perfect words." Look, words matter. I'm not going to pretend otherwise. But people respond to who's saying the words far more than to the words themselves. When your identity shifts, your communication follows it.`],
  ["who are you really trying to convince", `So ask yourself. When you over-explain, who are you really trying to convince? (Pause.) Over-explaining reads as doubt to the person across the table. And in my experience, the person we're really trying to convince is usually ourselves.`],
  ["reflects her capability", `When this piece clicks, her communication finally reflects her capability. Her ideas get credited to her. She speaks with authority without feeling like she's performing. She gets through the hard conversation without over-explaining. And decision makers start coming to her. Yes, that includes the meeting where Office Bro tries to pitch her idea back to her.`],
  // E
  ["Courage", `And E is for Execution. Courage in action. Ideas without action are just hopes and dreams. This is where everything we've talked about stops being a nice idea and starts showing up on your pay stub.`],
  ["The belief Execution breaks", `The belief we break is, "I'll act when I feel ready." What I've seen over and over is that the confidence comes after you do the scary thing. Almost never before. If you wait until you feel ready, you'll be waiting at your retirement party.`],
  ["afraid every day", `And does doing this work mean you stop being afraid? No. I'm afraid every day. But I do it anyway. Fear always comes along for the ride. You just become a woman who isn't stopped by it.`],
  ["putting off", `So ask yourself. What conversation have you been putting off? (Pause.) You probably thought of one immediately. That's the one.`],
  ["only comes from action", `When this piece clicks, she builds the confidence that only comes from action. She has the conversation instead of rehearsing it in the shower. She practices before it counts, with people in her corner. Discomfort stops being a reason to wait. And every time, she collects a little more proof that she can do hard things. Confidence stacks, a bit like compounding.`],
  ["together", `So put it all together. She knows her value. She chooses herself. She expects more. Her words match her capability. And she acts, even when it's uncomfortable. That's the woman who commands her worth. And here's why I built it this way. Most negotiation programs start and end at communication. Here are the words. We start with who you are, so the words actually land.`],
  ["Which letter", `Let's make this interactive. Which letter hit you hardest? Type V, O, I, C or E in the chat. (Read a few answers out loud and react.) In my experience most people say I. That's usually the one that stings. Now let me show you what this looks like in real life.`],

  // 9. CLIENT STORIES
  ["Women Who Closed the Gap", `Part four. Enough theory. I'm going to introduce you to three women. Different fields, very different salaries. What they had in common was the gap we've been talking about all night. Their results are theirs, and yours will be your own. But I'd bet you recognize yourself in at least one of them.`],
  ["Knew she was underpaid", `Meet Shelly. Shelly was a highly accomplished executive, and she knew she was underpaid. Like so many of you, she believed her work should speak for itself. Negotiating made her skin crawl. So she kept delivering and kept hoping someone would notice. She was doing the old way perfectly, and it was costing her a fortune.`],
  ["and then she said it", `We worked on her strategy, sure. But mostly we worked on how she saw herself and the value she brought to that organization. Once she understood her market value, she could say it, clearly and with confidence. Notice what changed first: how she saw herself. Her résumé and her title stayed the same. The conversation followed.`],
  ["$225K", `Her compensation went from two hundred twenty-five thousand to four hundred thirty-five thousand. (Pause.) And the number isn't the part I'm proudest of. Shelly stopped waiting for permission. She makes every career decision from ownership now, instead of fear. That shift is what she gets to keep.`],
  ["Overlooked anyway", `Meet Nina. Nina did exceptional work, consistently. And she kept getting passed over for the bigger opportunities. "I don't understand why I keep getting overlooked." That was Nina, almost word for word. Oh, it was a team effort, she'd say, every single time. And every single time, somebody else got the opportunity.`],
  ["articulate the impact", `She learned to clearly articulate the business impact she was creating. She started communicating with more authority and stopped shrinking her wins. When she stopped minimizing, people started hearing her. Same work, same woman, completely different conversation.`],
  ["$185K", `Her compensation went from one eighty-five to two fifteen, and she's now positioned for executive leadership. The real change? She stopped seeing herself as someone hoping to be noticed. She started acting like the leader she already was, and the title is catching up.`],
  ["underestimated her market value", `And meet Erica. Erica's story is a little different, and I include it on purpose. She dramatically underestimated her market value. She had no idea what the market was willing to pay for what she did. And when you don't know what you're worth, any offer sounds like a gift.`],
  ["was willing to pay", `Once she understood what the market would actually pay, and built the confidence to negotiate, she approached every opportunity completely differently. That's Value and Identity working together. Knowing the number, and believing she was allowed to ask for it.`],
  ["$28K", `She went from twenty-eight thousand to eighty thousand. Nearly triple. And underneath it, she stopped asking whether she deserved more and started expecting to be paid for the value she creates. Which, if you remember, is the Identity outcome.`],
  ["None of them waited", `That's the thread through all three stories. None of them waited for permission to go first. The money is one result. What they walked away with is a different way of seeing themselves, and they take that into every room for the rest of their careers. So how do you do this without guessing?`],

  // 10. THE PROGRAM
  ["The Amplify Your V.O.I.C.E. Experience", `That's exactly why I created the Amplify Your V.O.I.C.E. Experience. It's an intimate, high-touch, eight-week executive coaching experience for ambitious corporate women. A small group, and a lot of me. I built it because I watched so many brilliant women learn the right things and still not use them. Information was never what they were missing. They needed to become the woman who acts on it, and that takes coaching, practice and people in your corner.`],
  ["Who this is for", `I want to be clear about who this is for. It's for ambitious corporate women who know they can play a bigger game, who are ready to go deeper than tactics, and who are willing to invest in themselves. If you want a résumé review or a script library, there are cheaper places to get one, and I'll happily save you the time. This isn't for tire-kickers.`],
  ["Weekly Live Executive Coaching", `So here's what's included. Every week we meet live. Each session builds on the last one, and we combine executive career strategy with the identity work, applied to what's actually happening in your job that week. It's live and interactive, and you're going to talk. No hiding behind a muted camera.`],
  ["The V.O.I.C.E. Curriculum", `You get the full V.O.I.C.E. curriculum. Tonight you got the map. Inside, you get the turn-by-turn directions, all five parts, taught in depth. We go especially deep on Identity, because that's where the real shift happens.`],
  ["Hot Seat Coaching", `Hot seat coaching. You bring your actual situation and we work it, live. You'll be surprised how much you learn from watching someone else's hot seat, too. Her boss is your boss with a different name.`],
  ["Negotiation Strategy Sessions", `Negotiation strategy sessions. We build your personal strategy for whatever is on your plate: salary, promotion, bonus, equity, flexible work, a new offer or an executive opportunity. This is where my twenty-six years on the Street go to work for you.`],
  ["Live Role Playing", `Live role playing. I know, everyone groans. But remember my first negotiation? I fumbled because I'd never practiced. You get to fumble in front of us, where it's safe, so you don't fumble where it counts.`],
  ["Executive Communication Coaching", `Executive communication coaching. Presence, authority, influencing decision makers, and handling the difficult conversations without over-explaining. So the way you speak finally matches the level you perform at.`],
  ["Career Strategy", `Career strategy. We build your long-term roadmap, because this is about the next ten years of your career, and the next raise is only one step in it. Where do you want to be in five years, and what kind of woman gets there? We work backward from her.`],
  ["Private Community", `And a private community of ambitious women doing the same work. You'll share wins, practice courageous conversations together and hold each other accountable. Lovingly. Mostly. For a lot of women, not doing this alone anymore is the part that changes everything.`],
  ["Bonus", `[PLACEHOLDER: script for the bonus once it's confirmed.]`],
  ["Everything you get", `So here's everything together. Weekly live executive coaching. The full V.O.I.C.E. curriculum. Hot seat coaching. Negotiation strategy sessions. Live role playing. Executive communication coaching. Career strategy. The private community. And [PLACEHOLDER: bonus]. The total value comes to [PLACEHOLDER: total value].`],
  ["Your investment", `Your investment is [PLACEHOLDER: price]. I'm a finance person, so let's look at it like one. One successful negotiation can pay this back many times over. Shelly's increase was two hundred and ten thousand dollars in a single year. And after the first raise, you keep knowing how to do this, for every negotiation after it.`],

  // 11. MY COMMITMENT
  ["can't guarantee", `Now, I'm going to be straight with you, because that's who I am. I can't guarantee what your boss or your company will do. Nobody can. If someone promises you a specific number, run.`],
  ["can promise", `But here's what I can promise. If you do the work, you will leave thinking differently, communicating differently and showing up differently than when you walked in. I've watched it happen too many times to pretend otherwise.`],
  ["we create together", `And here's my commitment to you. Show up, do the work, participate in the coaching and fully engage, and I will be right there with you every step of the way. I'll challenge you, I'll support you, and I'll tell you what you need to hear even when you don't want to hear it. I can't do this for you. We do it together.`],

  // 12. URGENCY
  ["intentionally small", `I keep this group small on purpose. I want to personally coach every woman in it, and I can't do that with a hundred people. There are [PLACEHOLDER: number] seats. When they're gone, enrollment closes.`],
  ["next cohort begins", `The next cohort starts [PLACEHOLDER: start date]. We review applications in the order they come in, so if you already know this is for you, don't wait.`],
  ["most expensive choice", `And remember, waiting is the most expensive choice you can make. Every future raise gets built on a lower base. Your bonus and retirement contributions get calculated from it. And you spend another year saying nothing, and getting better at it. [PLACEHOLDER: future cohorts priced higher, if still true.] The deadline that matters most is the one that pattern is quietly setting for you.`],

  // 13. YOUR QUESTIONS
  ["You Might Be Wondering", `Now, I know what's going on in your head right now, because I've heard all of it. Let's go through the questions I hear most often.`],
  ["My industry is different", `"My industry is different." Sure. Your industry determines the numbers and how compensation gets structured. But knowing your value and advocating for yourself works whether you're in healthcare, tech, law or banking. I've seen it across all of them. The rules change from industry to industry. The woman playing the game is what we work on.`],
  ["asking for favors", `"I'm not good at negotiating, and I hate asking for favors." I hear this one all the time. Try this reframe: what you're actually having is a business conversation about value. And your company knows exactly how expensive it would be to replace you, even if nobody ever says it out loud.`],
  ["I don't have time", `"I don't have time." I know. You're doing the work of three people. That's kind of the point. Staying where you are is costing you more than eight weeks ever will. One courageous conversation can change where your whole career goes.`],
  ["What if they say no", `"What if they say no? I don't want to damage the relationship with my boss." Then you've learned something. A no tells you what's possible, what needs to happen next, and sometimes whether you're in the right place at all. A professional, well-prepared conversation doesn't wreck a healthy relationship. And if it does, that tells you something too.`],
  ["worth the investment", `"Is it really worth the investment?" Do the math on one conversation. Then remember you'll have more of them: salary, bonus, promotion, the next job offer. You'll use this for the rest of your career.`],
  ["inner-work", `"Will the inner-work stuff really help my career?" Fair question from a room full of rational, successful women. I spent twenty-six years on Wall Street. I'm not going to ask you to hug a tree. The identity work is what makes the strategy land, and you just saw what it did for Shelly, Nina and Erica.`],
  ["found out", `"What if I get found out? What if I'm not as good as they think?" This is the one nobody says out loud. I felt it as the highest-paid person in my division. It's incredibly common, and from what I've seen it hits the most capable people hardest. Your results are real. We work on letting you actually own them.`],

  // 14. RECAP
  ["Here's everything we covered", `Let's recap. You don't have a negotiation problem. You have an identity problem. You saw the five myths that keep smart women underpaid, and why waiting costs you money and a lot more than money. You saw the V.O.I.C.E. Framework. And you saw what happened for Shelly, Nina and Erica when they closed the gap. That's a lot. Take a breath. You've already done something most women never do. You looked at it honestly.`],
  ["who walks into the room", `You already have the capability. I know you do, or you wouldn't be here. The open question is who walks into that room next time: the old version of you, or the woman you pictured at the start of tonight.`],

  // 15. APPLY
  ["two options", `So you have two options. Option one, you keep going alone. Same plan, and another year of waiting to be noticed. You already know where that goes. Option two, you apply for the Amplify Your V.O.I.C.E. Experience and close the gap with me and a small group of women who get it. (Pause.) Which of these two can you see yourself doing?`],
  ["On your application call", `If you apply, here's what happens on the call. We'll look at where you are in your career. We'll talk about what's keeping you stuck and get clear on what you want next. And we'll see if the program is the right fit, for both of us. It's a real conversation, with no pressure. If it's not the right fit, I'll tell you.`],
  ["How to apply", `Here's how to apply. Go to [PLACEHOLDER: application URL]. Answer a few short questions about your career. I review every application personally. And if it looks like a fit, we'll invite you to a conversation. The group is small and the seats go in order, so if you felt something tonight, that's your cue. My aunt was right. If you want to play with the big boys, you'd better learn to ask for what you want. This is me asking you to ask.`],
  ["your turn?", `Thank you for spending this hour with me. I know what it takes to show up for yourself when you're already running on empty. Remember the woman you pictured at the start of tonight, walking into that room like she belongs there? She already lives inside you. When is it going to be your turn? You get to decide that. I want to thank you for coming, and I'd also like you to thank yourself. Go apply, and I'll see you on the other side. (Open Q&A.)`],
];

if (NOTES.length !== structured.length) {
  throw new Error(`v4: ${NOTES.length} scripts for ${structured.length} slides`);
}
const slides = structured.map((s, i) => {
  const [anchor, notes] = NOTES[i];
  const text = clean(JSON.stringify(s));
  if (!text.includes(anchor)) throw new Error(`v4: script ${i + 1} anchor "${anchor}" not on slide "${clean(s.h || s.eyebrow)}"`);
  return { ...s, notes };
});

const words = slides.reduce((n, s) => n + s.notes.split(/\s+/).length, 0);

const meta = {
  wpm: 140,
  noteSections: NOTE_SECTIONS,
  header: [
    "# Done Waiting Your Turn: Masterclass Deck Outline (v4)",
    "",
    "**Client:** Tamara Lashchyk · Amplify Your V.O.I.C.E. Experience  ",
    "**Companion file:** `Tamara-Masterclass-v4.pptx` (presenter notes are in each slide's notes field)",
    "",
    "## What changed in v4",
    "",
    `- **Slide count:** ${slides.length}. **Script:** ${words.toLocaleString()} words, about ${Math.round(words / 140)} minutes of speaking at 140 words per minute. With the two chat polls, the visualization's pauses and the stage-direction pauses, that runs about an hour live, plus Q&A.`,
    "- **Look:** restyled to match Sophie's deck in Tamara's brand. Deep Teal header bars with centered labels, centered statements with the key phrase in an accent color, framed dark dividers, big centered stats with italic source lines, myth cards joined by an arrow, quote slides with a large quote mark, and Sophie's client-story layout. The title slide is now a framed text-only card, like Sophie's.",
    "- **Visualization (slides 19 and 20):** \"Before we begin.\" and the Bob Proctor quote, placed between the authority section and the origin story, like Sophie's. The notes script a two-minute guided visualization that future-paces her woman a year out. The final slide calls back to it.",
    "- **Speaker notes:** every slide is scripted word for word in Tamara's voice, Sophie-style. Each has a `SLIDE N | SECTION [~mm:ss]` header, transitions into the next slide, and stage directions in parentheses. Callbacks: the visualization and her aunt's line at the close, Office Bro in the Communication outcome. Every Language Bank phrase is spoken at least once.",
    "- **Trim:** \"Most programs start at C\" now lives in the notes of the V.O.I.C.E. recap slide, which keeps the deck at 120.",
    "",
    "## Gap flags (still open, marked [PLACEHOLDER])",
    "",
    "- Rights to a Bob Proctor photo (or license one).",
    "- New sources for the 64% and 74% stats.",
    "- Next cohort start date, price and seat count.",
    "- Per-deliverable values, the bonus (and its script) and the total stack value.",
    "- Client headshots and written consent for Shelly, Nina and Erica.",
    "- Application URL, logo usage rights and legal review of the disclaimer.",
    "- Fonts: install Cormorant Garamond and DM Sans on the presenting machine.",
    "",
    "---",
    "",
  ],
};

module.exports = { slides, SECTIONS, meta };
