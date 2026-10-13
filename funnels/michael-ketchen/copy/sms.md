# Bet On Yourself Webinar: SMS Sequence

**Webinar:** Sunday, Nov 22, 2026 · 3:00 PM ET
**Sender:** one dedicated number, the same number shown on the VIP thank-you page ("I just texted you").
**Merge tags:** GHL syntax. Keep each message to 1–2 segments where possible.

SMS 1–3 mirror the reference funnel one-to-one (confirm → "you never accepted my calendar invite" → "did you miss this?"). The rest complete the show-up sequence.

> **Compliance:** the first text must identify the sender and include opt-out language. Only text contacts who gave consent on the opt-in form (the consent line is already under the form). Respect quiet hours (no texts before 8 AM or after 9 PM in the contact's time zone).

| # | Trigger | Who |
|---|---|---|
| 1 | Immediately on opt-in | All registrants |
| 2 | +6 min, if calendar invite not accepted (no `invite-accepted` tag) | All registrants |
| 3 | +12 min, if no YES reply (no `sms-confirmed` tag) | All registrants |
| 4 | Immediately on $27 purchase | VIP buyers |
| 5 | Sat Nov 21, 3:00 PM ET (T-24h) | All registrants |
| 6 | Sun Nov 22, 2:00 PM ET (T-1h) | All registrants |
| 7 | Sun Nov 22, 2:50 PM ET (T-10m) | All registrants |
| 8 | Sun Nov 22, 3:05 PM ET (live now) | All registrants |
| 9 | Sun Nov 22, 3:20 PM ET | Registrants not tagged `attended` |

---

### SMS 1: Confirm (immediate)

```
Hey {{contact.first_name}}, it's Michael Ketchen. One quick thing.

Saw you registered for this Sunday's live training at 3PM ET to learn how to buy cash flowing property using AI + the BRRRR Method.

Reply with 'YES' just to confirm your spot. I'm capping the room at 200 people. Once spots are gone they're gone.

See you live

Reply STOP to opt out
```

*On reply "YES": tag `sms-confirmed`, auto-reply:*

```
You're locked in 🔒 Sunday 3PM ET. I'll text you the link before we go live. Bring a deal you're looking at!
```

---

### SMS 2: Calendar invite not accepted (+6 min)

```
are you still coming to our BRRRR call Sunday? you never accepted my calendar invite 😔 if you're still good for Sunday at 3, please confirm here

{{custom_values.rsvp_link}}
```

> **RSVP link:** use a GHL **Trigger Link** that adds the `invite-accepted` tag and redirects to the confirmation page. That gives you a trackable "confirm" click, like the reference funnel's RSVP link.

---

### SMS 3: No YES reply (+12 min)

```
{{contact.first_name}}, did you miss this?

Reply YES to confirm your spot.
```

---

### SMS 4: VIP purchase (immediate)

```
VIP unlocked 🔓 {{contact.first_name}}, you just bet on yourself. Your VIP Kit is in your email.

Next step: book your 1 on 1 deal review with my team here 👉 [PLACEHOLDER: booking URL]

Reply YES so I know you got this.
```

---

### SMS 5: T-24h

```
Tomorrow at 3PM ET {{contact.first_name}}! I'm breaking down real deals live, start to finish. No replay. Your link: [PLACEHOLDER: webinar link]
```

---

### SMS 6: T-1h

```
1 hour 🔥 Grab a notebook and jump on from a laptop if you can. We start at 3PM ET sharp: [PLACEHOLDER: webinar link]
```

---

### SMS 7: T-10m

```
10 min. Come on in, I'm getting set up now: [PLACEHOLDER: webinar link]
```

---

### SMS 8: Live now

```
We're LIVE. Jump in 👉 [PLACEHOLDER: webinar link]
```

---

### SMS 9: Not attended (+20 min)

```
{{contact.first_name}} we started without you! Live deal breakdowns are coming up next. Don't miss it, there's no replay: [PLACEHOLDER: webinar link]
```
