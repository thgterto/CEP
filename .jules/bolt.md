## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2024-06-10 - O(N) Array Spread Stack Overflow & GC Bottleneck
**Learning:** In statistical chart functions like `computeIMR`, using the spread operator (`[0, ...ranges]`) with extremely large arrays (e.g., >130k items) can trigger V8's `Maximum call stack size exceeded` limit. Additionally, separating the calculation of standard deviations, means, and ranges into multiple passes creates unnecessary GC overhead and execution time.
**Action:** Replace `[...array]` spreads and multi-pass iterations with strict pre-allocated arrays (`new Array(len)`) and single-pass `for` loops in computational hot-paths. Ensure edge cases (like `len === 0`) return identical `NaN` fallbacks to avoid strict equality test regressions.
