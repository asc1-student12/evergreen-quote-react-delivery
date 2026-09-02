# Incident Response: Absurd Premium Report + Red CI on main

**Date:** Wednesday, Day 3, ~14:00
**From:** Scott Cannon, Delivery Lead
**Channel:** #incidents

## Message sent

Two things landed together and I want to be careful not to assume they are the
same thing.

**What I observed.** Support has a customer quoted $3,120 per month for $180,000
of home coverage, and says it reproduces. Separately, the CI run on main has been
red since the "adjust home rate per sponsor note" hotfix went in about 40 minutes
ago. The failure is in the type-check step: premium.ts line 10 holds a rate value
as text rather than a number, so the compiler stopped and the production build
never ran at all. Worth flagging that the commit message says home but line 10 is
the life rate, so it may not be the value that was intended.

I can reproduce absurd premiums at that coverage level on my own branch: the
coverage factor scales linearly on coverage amount with no cap, so home at
$180,000 returns $2,340 at age 25-60 and $3,276 under 25. **I cannot reproduce
$3,120 exactly at any age factor.** So I am not treating support's case as
confirmed by my reproduction. There is also a third possibility: the recent-quotes
feed lists home at $180,000 for $248.40 per month, roughly ten times below what
the form quotes for identical inputs, so the customer may be reporting the
inconsistency rather than the absolute number.

**What I am asking for, and from whom.** Can whoever owns the hotfix confirm which
rate value they intended to change, and whether that commit is what support's case
is hitting, or whether that is a second issue? And can whoever owns the quotes
feed confirm whether its premiums are meant to be derived from calculatePremium or
are illustrative only? I need the customer's actual inputs and the timestamp of
their session from support before I will call the reproduction confirmed.

**Who owns the next step.** The engineering team owns the red main: it is a
one-line type error and the compiler names the file and line. Pricing owns whether
an uncapped coverage factor is acceptable. I own the merge decision and the
sponsor communication, and I am holding my merge until main is green.

**Air cover.** Keep the data-feed and refactor work parked; none of it is on the
critical path for this. I will move my check-in if the team needs the time, and I
will handle the sponsor and support-facing updates so nobody is answering two
audiences at once. Nobody should be fixing this at speed to protect my Thursday
timeline; my branch does not contain the hotfix and I am not blocked.
