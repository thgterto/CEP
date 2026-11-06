## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.
## 2026-05-19 - Conditional Lazy Evaluation in SPC
**Learning:** When attempting to optimize statistical algorithms by hoisting calculations (e.g., pre-calculating the mean before passing it to standard deviation), unconditional hoisting can break the lazy-evaluation logic of optional arguments (like `target` or `sigma`), accidentally introducing an O(N) performance regression for users who provide those values.
**Action:** Always conditionally calculate intermediate values (e.g., `const actualMean = (target === null || sigma === null) ? SPC.mean(data) : 0;`) when optimizing functions that accept optional overrides.

## 2024-05-24 - Optimizing Xbar-R loop unrolling
**Learning:** When unrolling the first iteration of a statistical array processing loop (where subgroup size is guaranteed `n >= 2`), moving the initial baseline assignments (`sum = data[start]`) out of the loop and checking independent conditional checks (`min`/`max`) using an `else if` block provides a measurable speedup. This avoids evaluating the second condition when the first is true.
**Action:** When working on similar statistical multi-value calculations where initialization state is tied to the first element and boundaries are strictly defined, always unroll the first loop iteration and utilize mutually exclusive branch paths.
