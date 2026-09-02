# Delivery Review: Evergreen Quote

**Delivery Lead:** Scott Cannon (solo) · Phase 2, Week 2 · 5 minutes

## Slide 1: Delivery goal & did we hit it?

**Goal:** By Thursday end of day, the assembled Evergreen Quote React app — live
typed estimate, data feed with visible loading and error states, hook and context
wired — is merged to main through a reviewed pull request with a green CI run, with
type-check and production build both passing.

**Hit?** ☑ Yes

**Why:** Every element of the goal is independently verifiable in the repository:
the merge commit on `main`, the green CI run on it, and the app running from `main`
after the merge. Nothing in the goal was quietly redefined to make it reachable.

## Slide 2: What shipped

- The estimate updates on every keystroke for auto, home and life. Phase 1's
  calculate button is gone.
- Recent quotes load from the data feed with all three states verified by hand,
  not assumed: success, loading (throttled to Slow 3G), and error (feed removed).
  A customer never sees a blank panel.
- Custom hook and context provider dropped in with no change to existing
  behaviour, which unlocked **Save this quote**.
- Sponsor rate decision applied (auto 85 / home 130 / life 65) and verified by
  arithmetic rather than by eye.
- CI running on every push: install from the lock file, type-check, production
  build.
- Merged via reviewed PR: https://github.com/asc1-student12/evergreen-quote-react-delivery/pull/17
- Green CI run on the merge commit: (https://github.com/asc1-student12/evergreen-quote-react-delivery/actions/runs/33576508395)

## Slide 3: Two key decisions

**Decision 1 — the ZIP-code field does not ship this week.** Marketing asked to
"just add the box." Delivered honestly it is a pricing change, not a form field:
it touches the form, the quote contract, the rate model, the feed shape, and the
saved-quote display. *Why it mattered:* the cheap version was the expensive one. A
box wired to nothing tells a first-time shopper their location changed their price
when it did not, and hands Marketing an A/B test whose variable cannot move the
result.

**Decision 2 — ship on the flagged toolchain rather than upgrade mid-week.** The
audit flag is moderate severity in a development-time dependency, absent from the
bundle customers download, and this week ends at a green build with no deployment.
*Why it mattered:* customer exposure was zero on either path, so the only real risk
on the table was an unplanned upgrade to a pinned build tool the day before a
merge.

## Slide 4: Risks & injects

**Top risk tracked (R3):** the dev server runs code the compiler rejects. This
stopped being theoretical on Day 2 — the browser rendered the QA-flagged defect for
fifteen minutes without complaint and `npm run type-check` found it in four seconds
with file and line. The gate is the compiler and the build, not the page.

**Inject #1 (Tue):** ZIP-code field plus a dependency audit flag. Re-prioritised
the board, logged the deferral with its reasoning as an issue rather than dropping
it silently, wrote the decision memo, and sent the sponsor a ship/hold
recommendation with four specific asks.

**Inject #2 & #3 (Wed):** red type-check on `main` plus a customer reporting
$3,120 for $180,000 of home coverage. I did not open `premium.ts` and fix the rate.
I reported that the failure was a rate value stored as text on line 10, that the
build was skipped rather than failed, and that the commit message said *home* while
the compiler pointed at the *life* rate. I could reproduce the class of failure —
uncapped linear coverage scaling gives $2,340 to $3,276 at that coverage — but
**not** their exact figure, so I asked for the customer's inputs before calling it
confirmed.

**Go/no-go:** GO WITH CONDITIONS. My branch was green; `main` was red. Those are
different facts about different code. I would not merge onto a broken base, because
the merge result is what ships and a green branch run says nothing about it. The
condition cleared Thursday morning and I merged.

## Slide 5: What I'd do differently next round

- **Verify the baseline before trusting its documentation.** The starter shipped
  without the `.gitignore` and `.gitkeep` its own README described. I caught it by
  reading `git status` before the first commit. I want that to be a habit, not luck.
- **Check where decisions actually live.** I treated the sponsor's rate decision as
  blocked while it was sitting in the cohort channel. On a distributed team,
  "nobody told me" is usually "I did not look."
- **Run `pwd` before any command that writes files.** I lost time twice to commands
  executed from the wrong directory.
- **Cost a request through the typed chain before answering it.** This worked well
  for the ZIP field and I want it to be the default reflex, not something I reach
  for when a request feels suspicious.

## Q&A prep: likely questions

**"The dev page worked all week. Why does a red type-check matter?"** Because the
dev server renders whatever it can and stops there. It rendered a defect for fifteen
minutes on Day 2. `npm run build` type-checks first, so a red compiler means there
is no artifact at all — Inject #2's log shows the build *skipped*, not failed.
Nothing was ever built.

**"Why didn't you ship the ZIP field? It's one input box."** The box is one line.
The promise it makes to the customer — that their location changed their price — is
a pricing change through five files. I costed it and gave Marketing a date rather
than a field that lies.

**"Your CI was green. Doesn't that mean the app is correct?"** No, and I tested
this rather than assuming. I put a premium in the feed as text instead of a number;
type-check passed, the build passed, and the customer saw an unformatted value.
TypeScript validates source, not data fetched at runtime. The engineering team
already knew — `premium.ts` carries a fallback rate that is unreachable for any
valid coverage type and exists solely to guard runtime data.

**"Is the pricing right?"** No, and it is disclosed rather than hidden. The coverage
factor scales linearly with no cap, so $180,000 of home coverage returns $2,340 or
more per month. Separately, the recent-quotes feed lists the same coverage at
$248.40 — roughly ten times lower — so the panel and the form contradict each other
on the same page. Rate-engine work is out of scope for this phase. Both findings are
in the risk register with owners.
