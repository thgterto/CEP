## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.

## 2026-10-03 - Optimizing CUSUM Mean Evaluation
**Learning:** In `SPC.computeCUSUM`, when `target` is `null`, calculating `SPC.mean(data)` once and passing `sampleMean` as the preCalculatedMean argument to `SPC.stdDev` prevents redundant $O(N)$ array iterations. Preserving lazy evaluation `(target === null || sigma === null) ? SPC.mean(data) : null` ensures mean calculation is avoided altogether when overrides are provided.
**Action:** When calling `SPC.stdDev` within statistical functions where the sample mean is already calculated or needed, pass `sampleMean` as the 3rd argument to eliminate duplicate array traversals.
