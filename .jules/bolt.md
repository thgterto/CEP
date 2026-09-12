## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.
## 2026-05-19 - Fast Iteration Lookups
**Learning:** When optimizing statistical functions that process consecutive array elements in a hot loop (like `computeIMR`), caching the current element's value in a local variable (e.g., `prev = val;` at the end of the iteration) for use in the next iteration avoids redundant property lookups (`data[i-1]`), bounds-checking, and measurably reduces overhead in V8 on large datasets.
**Action:** Always prefer caching sequential elements in scalar variables inside tight loops over repetitive, dynamic array index access.
