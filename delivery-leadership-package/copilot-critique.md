# Copilot-Assisted Assembly Step and Critique

**Date:** Wednesday, Day 3
**Assembly step:** adding sample rows to the recent-quotes data feed
**Prompt used:** "add two more realistic rows to public/quotes.json matching the existing shape"

## What it produced

Two rows (ids 6 and 7) appended to public/quotes.json. Valid JSON, correct field
names and types, sequential ids, plausible ages and coverage amounts, premiums
stylistically consistent with the five rows already there. The app loaded seven
quotes on reload with no error.

## Critique (~110 words)

Copilot got the mechanics entirely right: valid JSON, the correct shape, sensible
ids, and values that read as realistic to a human skimming the panel. What it got
wrong is that the premiums are not what this application would charge. Its life
row shows $207 where the app's own rate model returns $1,300, and its auto row
shows $76.80 against $340. Notably, all five provided rows are wrong in the same
direction, by six to ten times. Copilot matched the pattern it was shown,
including the pattern's defect, because the prompt asked for consistency with the
neighbouring rows rather than correctness against the pricing model. I would ship
it for this week, because the feed is explicitly illustrative sample data, but I
would not ship it without recording the discrepancy, and I would not have caught
it by reading the diff.

## Would I ship its output as-is?

For this week, yes, with the discrepancy documented: the feed represents the
quotes API and is placeholder data, and the delivery goal does not depend on it
being actuarially derived. For anything customer-facing, no. The panel currently
shows a visitor that $180,000 of home coverage costs $248 per month, while the
form on the same page quotes the same coverage at $2,340 or more. That is a
credibility problem independent of which number is right.

## Would anything in the pipeline have caught a bad row?

No, and I tested this rather than assuming it. I changed one row's monthlyPremium
from a number to the string "60.00" and ran the pipeline: npm run type-check
passed, npm run build passed, CI would have gone green, and the browser rendered the value without currency formatting to the customer. TypeScript validates source files; quotes.json is
data fetched over the network at runtime and the compiler never opens it. The
contracts stop at the network boundary. The engineering team already knew this:
premium.ts contains a fallback rate that is unreachable for any valid coverage
type and exists solely to guard against runtime data the compiler cannot see.

## What I would change

Add the feed to what gets reviewed by a human against the pricing model, not just
against its own shape, or generate it from calculatePremium so the panel and the
form cannot disagree. Neither is in scope this week; both are logged.
