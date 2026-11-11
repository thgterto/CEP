## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.
## 2026-05-19 - Conditional Lazy Evaluation in SPC
**Learning:** When attempting to optimize statistical algorithms by hoisting calculations (e.g., pre-calculating the mean before passing it to standard deviation), unconditional hoisting can break the lazy-evaluation logic of optional arguments (like `target` or `sigma`), accidentally introducing an O(N) performance regression for users who provide those values.
**Action:** Always conditionally calculate intermediate values (e.g., `const actualMean = (target === null || sigma === null) ? SPC.mean(data) : 0;`) when optimizing functions that accept optional overrides.

## 2024-05-24 - V8 Property Lookup Optimizations in Math.abs loops
**Learning:** In V8, extracting `Math.abs` to a local variable `const abs = Math.abs` and simultaneously using a local variable to cache `data[i-1]` (e.g. `prevVal`) in highly iterated arrays yields a >2x performance improvement (e.g. 987ms down to 457ms for 50 million items).
**Action:** Use local variables to cache native function references like `Math.abs` and prior array values in very hot statistical loops like `computeIMR` to avoid repetitive object property lookups and array element resolutions.
