## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.
## 2026-05-19 - Quickselect with 3-Way Partitioning
**Learning:** When optimizing median calculation on arrays, standard Quickselect with deterministic pivots degrades to O(N^2) on realistic data (sorted or identical values). Using a Quickselect with a randomized pivot and 3-way (Dutch National Flag) partitioning guarantees average O(N) performance, yielding >5x speedup over `Float64Array(data).sort()` on 1 million elements without freezing the main thread.
**Action:** When finding quantiles or medians, always verify that the Quickselect implementation is robust against duplicate-heavy or pre-sorted input by incorporating random pivot selection and 3-way partitioning.
