## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.
## 2026-05-19 - Standard Deviation Calculation Correctness
**Learning:** When optimizing SPC functions (like `computeCUSUM`) by passing a pre-calculated mean to `SPC.stdDev(data, isSample, mean)`, passing an arbitrary `target` parameter instead of the actual dataset mean mathematically shifts the standard deviation calculation to a root-mean-square deviation from the target, causing a regression.
**Action:** Always ensure the actual dataset mean (`SPC.mean(data)`) is calculated and passed to `stdDev`, and properly fallback to `NaN` or handle cases where only `target` or `sigma` are provided.
