# Evergreen Quote: Vision Brief

## Product
**Name:** Evergreen Insurance Quote (Phase 2 React rebuild)
**Delivery week:** 2
**Delivery Lead:** Scott Cannon (solo)
**Engineering team (represented by):** https://github.com/asc1-student12/evergreen-quote-react-delivery
**GitHub Project board:** https://github.com/users/asc1-student12/projects/2

## Who is the customer?
A first-time insurance shopper, someone told they "need insurance" and wants a number on their phone so they can continue with their life. It could be a renter or first-time homeowner. They aren't looking to have their email and phone blasted for signing up. Their alternatives today are a competitor site that asks for twelve fields and an email address before it shows anything, or a phone call to an agent they would rather not make. 

## What pain does Evergreen Quote remove?
"Just tell me roughly what this costs." Phase 1 answered that question, but only after a form and a button press — the shopper had to commit before the site would say anything at all. Phase 2 removes the commitment: the estimate moves as they type, so they can try a lower coverage amount, watch the number change, and decide whether we are in their range without pressing anything or handing over an email address. The recent quotes panel shows what other customers are paying, so the number reads as a market price rather than a black box.

## What does "good" look like at end of the week?
- The estimate updates on every keystroke for auto, home and life, with values a stakeholder would sign their name to under the sponsor's rate decision.
- The Recent quotes panel loads from the data feed and never shows a blank panel: data, loading, or an error, always.
- A shopper can save their own quote and see it appear at the top of the list instantly.
- `npm run type-check` and `npm run build` both pass, and the CI run on the merge commit is green.
- The work reached `main` through a reviewed pull request, not a direct push.

## What are we explicitly NOT doing this week?
- No real rate engine or actuarial pricing — the rate model stays a placeholder.
- No accounts, no email capture, no persistence of saved quotes past a reload.
- No payment, checkout, or policy purchase.
- No back-end service; the JSON feed represents the quotes API, and that is sufficient for this week.
- No routing, no test suite, no deployment. Phase 2 stops at a green build.
- No toolchain upgrades mid-week; the pinned versions stand unless a security finding forces the question.

## How will we know if it worked?
- A shopper reaches a believable number in under 10 seconds, with zero button presses and zero personal details entered.
- All three coverage types return premiums inside the sponsor-approved band at default inputs; zero implausible values at demo time.
- 100% of changes reach `main` via reviewed PR with green CI — zero direct
  pushes, zero merges on red.