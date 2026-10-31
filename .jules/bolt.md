## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.
## 2026-05-19 - Conditional Lazy Evaluation in SPC
**Learning:** When attempting to optimize statistical algorithms by hoisting calculations (e.g., pre-calculating the mean before passing it to standard deviation), unconditional hoisting can break the lazy-evaluation logic of optional arguments (like `target` or `sigma`), accidentally introducing an O(N) performance regression for users who provide those values.
**Action:** Always conditionally calculate intermediate values (e.g., `const actualMean = (target === null || sigma === null) ? SPC.mean(data) : 0;`) when optimizing functions that accept optional overrides.
## 2026-05-19 - The Myth of Manual Loop Unrolling in V8
**Learning:** Manually unrolling the first iteration of simple summation loops (e.g., `sum = data[0]` and looping from `j=1` instead of initializing `sum=0` and looping from `0`) to avoid a single zero assignment provides zero measurable performance benefit in modern JIT compilers (like V8), introduces edge cases, and reduces code readability.
**Action:** Do not manually unroll simple loops in JavaScript for performance unless benchmarking proves a significant bottleneck bypassing JIT optimizations.
