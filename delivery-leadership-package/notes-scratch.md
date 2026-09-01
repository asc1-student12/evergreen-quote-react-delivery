# Scratch log (raw, unpolished)

Mon 12:15 - Lab kit not staged on VM; found under ~/Downloads/LabFiles, relocated. ~40 min lost. First risk.
Mon 12:55 - Starter ships with NO .gitignore despite kit README claiming one. Caught via git status before first commit. Authored minimal one (node_modules/, dist/).
Mon 13:05 - delivery-leadership-package also missing the .gitkeep the README describes. Second kit/doc discrepancy. Pattern, not a one-off.
Mon 14:45 - delivery/lead branch never got created first time round; caught it via git branch -a. main holds only the starter, which is actually the intended state.
Mon 15:30 - MISSED sponsor check-in (schedule conflict). BASE_RATES values not received. Now blocking [CONFIG] premium.ts, a P0. Ask first thing Tuesday.
Mon 20:00 - Board built: 14 issues, 4 closed for Day 1 work, 10 in To Do. Vision brief + delivery goal done.
Mon 20:40 - Sponsor rates confirmed in Teams channel: auto 85, home 130, life 65 (starter had 80/120/60). Real change, ~+6-8%.
Mon 20:45 - FINDING: calculatePremium scales linearly on coverageAmount/10000 with no cap. Home at $250k age 40 = $3,250/mo. Applying sponsor rates makes it ~8% worse. Root cause is the unbounded coverage factor, not the rate values. Brief puts rate-engine work out of scope, so this is a disclosed limitation, not a defect to fix this week.
Mon 20:50 - NOTE: BASE_RATES[type] ?? 100 fallback is unreachable for a valid CoverageType. It only guards runtime JSON. TypeScript does not validate the fetched feed. Relevant to Wed Copilot critique.
Tue 17:10 - Reproduced absurd-premium class of failure: home / age 22 / $180,000 = $3,276 per month. Cause is the unbounded linear coverageAmount/10000 factor, not the sponsor rate values.
Tue 17:12 - NOTE: cannot reproduce an exact $3,120 at any of the three age factors (1.4 = 3276, 1.0 = 2340, 1.25 = 2925). If an incident cites $3,120, ask for the customer's actual inputs and session timestamp before accepting the reproduction as confirmed.
Tue 17:21 - Compiler caught the QA-flagged bug the browser had rendered silently for 20 minutes: src/components/RecentQuotes.tsx:22:49 - error TS2339: Property 'coverage' does not exist on type 'Quote'. Fixed per kit README (quote.coverage -> quote.type). type-check clean.
Tue 17:21 - This is R3 made concrete: the dev server ran code the compiler rejects. The browser showed blank labels, not an error. Nothing in the running page told me the contract was broken.
