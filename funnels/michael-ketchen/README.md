# Michael Ketchen · Bet On Yourself Webinar Funnel

A free live training funnel for **Michael Ketchen / Bet On Yourself Education Co.**, modeled one-to-one on the "Section 8 Pro" reference funnel (landing → $27 VIP upsell → survey → VIP thank-you, plus email/SMS show-up sequences).

- **Hook:** *Give Me 1 Hour Live, And I'll Show You How To Buy Your First (Or Next) Cash Flowing Property Leveraging AI & The BRRRR Method*
- **Live:** Sunday, Nov 22, 2026 · 3:00 PM ET
- **Tripwire:** $27 Bet On Yourself VIP Kit (value stack $768)
- **Backend (pitched on the webinar):** assumed Bet On Yourself Group Coaching ($300/mo or $3,000/yr). **Confirm.**

Every page is a single self-contained HTML file (inline CSS + a little vanilla JS, no build step), pasted into GHL as Custom HTML, the same pattern as the Beacon pages in `/pages`.

## Files

```
funnels/michael-ketchen/
├── pages/
│   ├── landing.html        Opt-in page + "Save your seat" popup form
│   ├── vip-upsell.html     $27 VIP Access offer (order form slot)
│   ├── confirmation.html   Non-VIP "Your Seat Is Confirmed" (via "No thanks")
│   ├── vip-survey.html     Post-purchase 5-question survey
│   └── vip-thank-you.html  "VIP Access Unlocked" (resources, 1 on 1 booking, SMS card)
└── copy/
    ├── emails.md           9 emails (3 from the reference + 6 show-up reminders)
    ├── sms.md              9 texts (3 from the reference + 6 reminders)
    ├── vip-resources.md    Content for the 4 VIP PDFs (DRAFT, Michael must review)
    └── course-outline.md   VIP portal lessons (replaces the reference's members app)
```

## The flow

```
Ad ─► landing.html ──(popup form)──► vip-upsell.html ──($27 paid)──► vip-survey.html ──► vip-thank-you.html
                                          │
                                          └──("No thanks")──► confirmation.html
```

| Reference page | Ours |
|---|---|
| Landing page + Signupform (+ addition) | `landing.html` (form is the built-in modal) |
| VIPupsell | `vip-upsell.html` |
| Confirmationpage (novip) | `confirmation.html` |
| VIPConfirmationpage + VIPquestion1–5 | `vip-survey.html` |
| VIPconfirmationpage2 | `vip-thank-you.html` |
| Email1 / Email2 / VIPemail1 | `copy/emails.md` #1 / #2 / #3 |
| SMS 1 & 3 / SMS 2 | `copy/sms.md` #1, #3 / #2 |
| VIP resources (4 PDFs) + Loveable app | `copy/vip-resources.md` + `copy/course-outline.md` |

## Setup in GHL

1. **Create the funnel steps** in this order: Landing → VIP Upsell → VIP Survey → VIP Thank-You, plus a separate Confirmation step. On each step: disable the default header/footer/theme, add a full-width **Custom Code / HTML** element, and paste the whole file.
2. **Set the URLs.** Each page has a `FUNNEL_CONFIG` block at the bottom. The relative defaults (`vip-upsell.html`, `confirmation.html`, …) only work locally, so replace them with the live GHL step URLs:
   - `landing.html` → `nextUrl` = VIP Upsell URL; `ghlWebhookUrl` = see step 3
   - `vip-upsell.html` → `noThanksUrl` = Confirmation URL; also update the three `href="confirmation.html"` fallbacks
   - `vip-survey.html` → `nextUrl` = VIP Thank-You URL; `ghlWebhookUrl`
   - `vip-thank-you.html` → `resourcesUrl`, `bookingUrl`, `dealAnalyzerUrl`, `smsNumber`
   - `vip-upsell.html` + `confirmation.html` → `webinarLink` (used in the calendar buttons)
3. **Capture leads.** Create a GHL Workflow with an **Inbound Webhook** trigger and paste its URL into `ghlWebhookUrl` on the landing page. The form posts `first_name`, `email`, `phone`, `investor_stage`, `capital`, `source`. Map these to the contact and custom fields, then add tag `boy-registered`. Do the same for the survey (`capital`, `credit_score`, `experience`, `income_source`, `biggest_blocker`), tagging `boy-vip-survey`.
   *Alternative:* swap the modal's `<form>` for a GHL form embed if you'd rather use native forms.
4. **Order form ($27).** GHL's order form can't sit inside Custom HTML. Split `vip-upsell.html` at the two `GHL SPLIT POINT` comments into two Custom HTML elements and place the native **2-Step Order Form** element between them. Product: *Bet On Yourself VIP Kit*, $27 one time. Success redirect → VIP Survey. (Or set `orderFormUrl` to an embeddable checkout.)
5. **Videos.** Replace `WISTIA_MEDIA_ID` on the upsell and confirmation pages. The placeholder thumbnail hides automatically once a real ID is in.
6. **Images.** Michael's headshot and Mags' photo currently hotlink Michael's Kajabi CDN, with a navy "MK"/"MM"/"TB" monogram fallback. Re-upload them to the GHL Media Library and swap the URLs. Tyler B. has no photo yet.
7. **Pixels.** Each page has a marked tracking slot in `<head>`. Fire `Lead` on the upsell page load (it only loads after opt-in) and `Purchase` (27 USD) on the survey page.

## Automations (GHL Workflows)

| Workflow | Trigger | Actions |
|---|---|---|
| Registration | Tag `boy-registered` | Email 1 (calendar invite) + Email 2 + SMS 1 → wait 6 min → if no `invite-accepted`: SMS 2 → wait 6 min → if no `sms-confirmed`: SMS 3 |
| YES reply | Inbound SMS contains "yes" | Tag `sms-confirmed`, send auto-reply |
| RSVP link | Trigger Link `rsvp` clicked | Tag `invite-accepted` |
| Reminders | Tag `boy-registered` | Wait until Nov 21 3 PM ET → Email 4 + SMS 5 → Nov 22 9 AM Email 5 → 2 PM Email 6 + SMS 6 → 2:50 PM SMS 7 → 3 PM Email 7 → 3:05 PM SMS 8 → 3:20 PM if not `attended`: Email 8 + SMS 9 |
| VIP purchase | Order form submitted ($27) | Tag `boy-vip` → Email 3 + SMS 4 → Nov 20 10 AM if not booked: Email 9 |

The `attended` tag needs your webinar platform's integration (WebinarJam / Zoom webhook).

## Brand

Pulled from michaelketchen.com: navy `#16163F` / `#0E0E2C`, gold `#D9A02F` / `#E5B85A`, cream `#E6DCD3`, fonts **League Spartan** (headings) + **Montserrat** (body). Tokens live in `:root` at the top of each page's `<style>`. The shared block between the `BOY SHARED STYLES START/END` comments is identical across all five pages, so if you change it in one file, copy it to the others.

## Still needed from Michael

- [ ] Headshot + candid "on a deal" photo (re-hosted), Tyler B. photo, logo file
- [ ] Videos: upsell VIP pitch, confirmation "watch this then check your email", portal lessons
- [ ] Name of the team member who runs the 1 on 1 deal review calls, plus the booking calendar
- [ ] Webinar platform + join link, SMS sending number, sending email address, mailing address (email footer)
- [ ] **AI angle:** which AI tools he actually uses, so the "AI-assisted deal analysis" claims match reality
- [ ] **Buy box numbers** in `copy/vip-resources.md` (currently illustrative)
- [ ] Confirm the backend offer pitched on the webinar (assumed Group Coaching)
- [ ] Confirm proof stats: $250M+ AUM, 30+ BRRRR cycles, $20M+ equity returned (his site lists $100M–$250M at different times)
- [ ] Testimonial permission: Tyler B., Magdiel M., Bill M., Kailey (quotes taken verbatim from michaelketchen.com)
- [ ] "Capping the room at 200" (SMS 1) is only OK if it's true for the webinar platform
- [ ] Privacy policy + terms URLs (footer placeholders)

Search every file for `[PLACEHOLDER` to find each slot.
