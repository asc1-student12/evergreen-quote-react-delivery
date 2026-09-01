# Stakeholder Status Update: Evergreen Quote

**To:** Priya Ramanathan, Project Sponsor
**From:** Scott Cannon, Delivery Lead
**Date:** 1 September 2026 (Day 2, Tue)

## What shipped today

- The quote form is live and typed: the estimated premium recalculates on every
  keystroke for auto, home and life. Phase 1's calculate button is gone.
- Your rate decision is applied (auto 85 / home 130 / life 65, up from the
  starter's 80 / 120 / 60) and verified by arithmetic, not by eye.
- The product title is configured through `.env`; the browser tab no longer says
  CHANGEME.
- The type error QA flagged is fixed. Worth naming how it was found: the dev
  server rendered the defect for fifteen minutes without complaint, and
  `npm run type-check` located it in four seconds, file and line. The compiler is
  the gate, not the browser.
  ## What slipped (and why)

- Nothing against the delivery goal. **The ZIP-code field is deferred out of this
  week** — decision memo attached. To change the price, a ZIP has to travel the
  whole typed chain: form field, quote contract, a region-keyed rate lookup, the
  feed shape, and the saved-quote display. That is new pricing logic, which this
  phase excludes. A box wired to nothing was considered and rejected: it would
  tell a shopper their location changed their price when it did not, and would
  hand Marketing an A/B test whose variable cannot move the result.
- Monday's sponsor check-in was missed on my side due to a scheduling conflict.
  I picked your rate decision up from the cohort channel and lost no delivery
  time, but I should have flagged the conflict in advance rather than after.

## What's next (tomorrow)

- Recent quotes move to the data feed, with loading, error and success states all
  visibly handled — a customer never sees a blank panel.
- The provided custom hook and context provider drop in. The test of that work is
  that nothing the customer already had changes, and **Save this quote** starts
  working.
- CI is enabled, so every push gets an automated verdict: install from the lock
  file, type-check, production build.
- A documented go/no-go call on merging, made from the CI result rather than in
  spite of it.

## Ship or hold on the audit flag

**My recommendation is to ship this week on the pinned toolchain**, and to let the
platform team make the version bump in their scheduled window next week. The flag
is moderate severity in a development-time dependency, so it is not present in the
production bundle a customer downloads, and this week ends at a green build with
no customer-facing deployment. Customer exposure is zero on either path. Upgrading
a pinned build tool the day before a merge, ahead of the owning team's schedule,
to fix something with no route to a customer, adds risk to the delivery without
removing any from the product.

## What I need from you

1. **Tell Marketing directly that the ZIP field is next round, not this week**, and
   that it is a pricing change rather than a form field. Coming from you it lands
   as a priority call; coming from me it reads as a delivery team saying no.
2. **A written note from the platform team confirming the flagged package is
   development-time only.** I have assessed it as dev-time based on their summary;
   I would rather have that in writing than in my inference before I recommend
   shipping on it.
3. **If you want the ZIP field to outrank the shared-state refactor, I need that
   call by 11:00 Wednesday.** I can trade one for the other. After 11:00 the
   remaining time no longer covers a safe merge, and the answer becomes no by
   default rather than by decision.
4. **Confirmation that no customer-facing deployment happens this week**, which is
   the assumption my ship recommendation rests on.