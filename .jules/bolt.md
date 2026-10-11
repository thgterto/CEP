## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.
## 2026-05-19 - Conditional loop branch elimination
**Learning:** When optimizing nested loops for group-based statistical calculations (e.g., `computeXbarR`) where subgroup size is guaranteed `n >= 2`, unrolling the first iteration (assigning `sum`, `min`, `max` to the first element and starting the loop at index 1) and using `else if` for mutually exclusive conditions (like `min`/`max` checks) yields a measurable execution speedup by avoiding redundant assignments and conditional branches.
**Action:** Unroll the 0-th iteration for guaranteed >1 length inner loops where initial state assignment makes sense.
