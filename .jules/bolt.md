## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.
## 2026-09-28 - Fast Variance with Safe Roots
**Learning:** When optimizing statistical variance calculations (like in `computeXbarS`), replacing a two-pass algorithm with a single-pass computational formula `(sumSq - n * mean^2) / (n - 1)` can yield significant speedups (e.g. 1.5x speedup for `n=25`). However, floating-point precision drifts can result in slightly negative variance values when the true variance is zero or close to zero.
**Action:** Always wrap the computed variance value in `Math.max(0, ...)` before applying `Math.sqrt()` to prevent unexpected `NaN` values.
