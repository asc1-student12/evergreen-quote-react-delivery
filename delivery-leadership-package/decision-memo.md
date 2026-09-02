# Decision Memo: Deferring the ZIP-code field out of this week

**Date:** 1 September 2026
**Author:** Scott Cannon, Delivery Lead
**Decision area:** Day 2 scope change (Inject #1) — Marketing's ZIP-code request

## Context

Marketing has asked for a ZIP-code field on the quote form by Thursday to support
a regional-pricing A/B test, and says their pricing table is ready. The request
came in mid-afternoon on Tuesday of a four-day delivery week whose remaining work
is already committed: the data feed, the hook and context refactor, CI, the
production build, and a reviewed merge. The delivery goal has not changed.

## Options considered

1. **Add the field and make it affect the price.** Marketing gets a real test.
   But the price is produced by a typed chain, and a ZIP that changes the number
   has to travel all of it: a new form field, a change to the `Quote` contract,
   a region-keyed lookup in the rate model, the shape of the quotes feed, and the
   display of every saved quote. This is new pricing logic, which this phase
   explicitly excludes. It would displace either the shared-state refactor or the
   merge itself.

2. **Add the box, wired to nothing.** Cheap, and satisfies the literal request.
   Rejected on two grounds. It tells a shopper their location affects the price
   when it does not, and it hands Marketing a test whose variable cannot change
   the outcome — a result they would then act on.

3. **Defer the field and give Marketing a costed answer this week.** No new
   pricing logic. Delivery goal protected. Marketing gets something better than a
   box: a specific list of what has to change and a decision point with a date.

## Recommendation

Option 3. The ZIP-code field does not ship this week. I will give Marketing a
written cost of the change and a timeboxed spike at the start of next round, and
the sponsor a decision point on whether the field affects pricing or is purely
display.

## Why

A shopper who enters their ZIP code will believe it changed their price. If it
did not, we have quietly misled the exact customer this product exists to earn —
a first-time buyer with no reason to trust us yet — and Marketing would base a
regional pricing decision on a test that could not have produced a signal. The
cheap version of this request is the expensive one.

## What would change my mind

If the sponsor decides the A/B test outranks the shared-state refactor, I can
trade them: the field ships Thursday and the refactor moves to next round, with
the ZIP visibly labelled as not yet affecting price. I need that call by 11:00
Wednesday — after that, the remaining time no longer covers a safe merge.

## Note on how the cost was known

The reason this memo can name the affected work precisely, rather than estimating
it, is that the pricing model is typed. Changing the shape of a quote makes the
compiler list every place that has to change before any of it is written. That is
what the type system is for: it turns "how big is this?" from a guess into a
question with an answer.