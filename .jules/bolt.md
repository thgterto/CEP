## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2024-06-03 - Preserving Mathematical Precision in Statistical Calculations
**Learning:** When attempting to optimize exponential functions like `Math.pow(base, 2 * (i + 1))` in tight statistical loops (e.g., `computeEWMA`) by using an incremental multiplier (`currentPower *= base^2`), the floating-point precision can drift over many iterations. This causes strict baseline comparisons (e.g., Node's `assert.deepStrictEqual`) to fail.
**Action:** When refactoring mathematical calculations in SPC or statistical functions, always prioritize exact mathematical equivalence. It's better to preserve slightly slower native functions like `Math.pow()` inside loops if it guarantees precision parity, rather than forcing a micro-optimization that breaks correctness.
