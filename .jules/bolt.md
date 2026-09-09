## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.
## 2026-05-19 - Optimizing ComputeCapability Standard Deviation Calculation
**Learning:** In statistical computations where aggregate properties like the mean are pre-calculated for other equations (like Cp/Cpk), passing that pre-calculated mean into standard deviation functions (e.g., `SPC.stdDev`) prevents redundant O(N) array traversals, offering notable execution time improvements on large datasets without altering mathematical accuracy.
**Action:** Always inspect aggregate statistical calculations for overlapping metric dependencies (like variance depending on mean). Feed previously calculated values down the function stack to skip redundant iterations.
