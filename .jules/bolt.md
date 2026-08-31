## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.
## 2026-05-19 - Perfect Match Native Overrides
**Learning:** When replacing `Math.sign(v)` with manual inline ternary logic to optimize hot statistical loops, naive implementations evaluate `NaN` to `0` and coerce `-0` to `0`, failing baseline parity tests.
**Action:** To perfectly match native `Math.sign` behavior for positive, negative, `0`, `-0`, and `NaN` (while still achieving massive ~17x V8 speedups over the native C++ call overhead), use the precise strict fallback pattern: `const s = v > 0 ? 1 : (v < 0 ? -1 : (v === 0 ? v : NaN));`.
