
## 2026-05-16 - Do Not Compute Variance Around Target in CUSUM
**Learning:** In statistical functions like `computeCUSUM`, when a user provides a `target` mean but no `sigma`, the standard deviation MUST still be computed around the sample data's mean, NOT the target. Computing variance around the target mathematically inflates the standard deviation, destroying the control limits. Also, manually unrolling `stdDev` into a 20-line loop degrades readability severely.
**Action:** When optimizing control charts, reuse core math functions like `SPC.mean()` and `SPC.stdDev()` rather than aggressively inlining loops, to prevent mathematical regressions and preserve readability.
