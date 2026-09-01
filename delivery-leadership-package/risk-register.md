# Risk Register

> Evergreen Quote Phase 2 · Delivery Lead: Scott Cannon · Last updated: Tue 1 Sep 2026

|
#
|
 Risk 
|
 Owner 
|
 Likelihood 
|
 Impact 
|
 Mitigation 
|
 Trigger to escalate 
|
|
---
|
---
|
---
|
---
|
---
|
---
|
---
|
|
 R1 
|
 The provided baseline does not match its own documentation. The kit README describes a 
`.gitignore`
 and a 
`.gitkeep`
 that were absent from the starter; unmanaged 
`node_modules/`
 would have been committed to the team repo. 
|
 Delivery Lead 
|
 Occurred (Day 1) 
|
 H 
|
 Read 
`git status`
 before every commit rather than trusting the guide's description; minimal 
`.gitignore`
 authored covering 
`node_modules/`
 and 
`dist/`
; both discrepancies raised with the sponsor. 
|
 Any further gap between documented and actual starter contents, or any commit staging more than ~30 files. 
|
|
 R2 
|
 Solo delivery, four weeks of missed sessions, and Days 3–4 compressed into a single working day. No second pair of eyes on any assembly step and no one to hand off to. 
|
 Delivery Lead 
|
 H 
|
 H 
|
`npm run type-check`
 after every assembly step so the compiler substitutes for a reviewer; a running scratch log so status is reconstructable rather than remembered; compression disclosed to the sponsor rather than hidden. 
|
 Any single assembly step exceeding 45 minutes, or a day ending with a P0 issue untouched. 
|
|
 R3 
|
 The dev server runs code the compiler rejects. A demo that looks perfect can still fail the production build, so a working page is not evidence of a shippable product. 
|
 Delivery Lead 
|
 Occurred (Day 2) 
|
 H 
|
 Realised on Day 2: the browser rendered the QA-flagged defect for fifteen minutes without complaint; 
`npm run type-check`
 found it in four seconds with file and line. Type-check and production build are the gate; green CI is required before any merge. 
|
 Type-check red at 16:00 on any day, or CI red on 
`delivery/lead`
 after a push. 
|
|
 R4 
|
 The premium model scales linearly on coverage amount with no cap, so realistic policy sizes produce absurd prices. Home coverage of $180,000 at age 22 returns 
**
$3,276 per month
**
. Applying the sponsor's approved rates makes this ~8% worse, not better. 
|
 Sponsor / Product (pricing owner) 
|
 Occurred (verified Day 2) 
|
 H 
|
 Verified by arithmetic, not by eye. Disclosed as a known limitation rather than silently fixed: the capstone brief places rate-engine work out of scope and the model is explicitly a placeholder. Cause named precisely — the unbounded coverage factor, not the rate values. 
|
 Any customer-facing exposure of this build, or any request to demo large-policy quotes to a non-technical audience. 
|
|
 R5 
|
 Scope arrives as a small ask. Marketing's ZIP-code field was framed as "just add the box"; delivered honestly it is a pricing change touching the form, the 
`Quote`
 contract, the rate model, the feed shape and the saved-quote display. 
|
 Delivery Lead (with Sponsor) 
|
 Occurred (Inject #1) 
|
 M 
|
 Cost the change through the typed chain before answering, so the reply is a number rather than an opinion; decision memo written for a non-technical reader; a display-only version explicitly rejected as misleading; sponsor asked to communicate the deferral so it reads as a priority call, not a delivery team refusing. 
|
 Any further request arriving directly from a stakeholder rather than through the sponsor, or any request framed as trivial that touches typed contracts. 
|
|
 R6 
|
 A pinned build tool carries a moderate-severity audit flag. The owning team's upgrade window is next week and cannot move. 
|
 Platform Team (upgrade), Delivery Lead (ship decision) 
|
 Occurred (Inject #1) 
|
 L this week, M if unaddressed 
|
 Assessed as a development-time dependency, so it is absent from the production bundle a customer downloads; this week ends at a green build with no deployment, so customer exposure is zero. Recommended shipping on the pinned toolchain; written confirmation of dev-time-only scope requested from the platform team. No mid-week upgrade. 
|
 Written confirmation not received before the Thursday merge, any indication the package reaches 
`dist/`
, or any decision to deploy this build to customers. 
|
|
 R7 
|
 TypeScript checks source, not data. A malformed row in 
`public/quotes.json`
 — a premium as a string, or an unrecognised coverage type — would pass 
`type-check`
 and CI and fail in front of a customer. The 
`?? 100`
 fallback in the rate model is the engineering team quietly acknowledging this. 
|
 Delivery Lead 
|
 M 
|
 M 
|
 Treat any generated or hand-edited feed data as unverified by the pipeline; inspect feed changes by hand rather than trusting a green build; this is the specific limit tested in the Day 3 Copilot critique. 
|
 Any feed content added by an AI assistant or a non-engineer, or any customer-reported value that CI passed. 
|

## How I'll use this register

I re-read this at the start of each working block and again before the wrap at
16:00, because most of these fail quietly rather than loudly — R3 and R7 in
particular produce a page that looks fine. The register is committed to the repo
so the sponsor and any reviewer can read it without asking me, and every row that
has actually occurred is dated in the scratch log with what I did about it. R1
through R4 were found by verifying the baseline rather than trusting it, which is
the habit I want to carry past this week; R5 and R6 arrived from outside and were
costed before they were answered. Rows do not get deleted when they stop being
urgent, they get marked as occurred, because Friday's review is a question about
what actually happened, not about what I predicted on Monday.