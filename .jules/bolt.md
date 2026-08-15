## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2024-05-20 - Optimizing jStat calls
**Learning:** When using `jStat` in statistical functions (like `calculateDescriptiveStats`), methods such as `j.mean()`, `j.stdev(true)`, and `j.quartiles()` do not internalize memoization. Caching their results in local variables prevents redundant computations (e.g., repeated sorting in quartiles) and significantly improves execution speed on large datasets.
**Action:** Always inspect third-party library calls for redundant evaluations, and cache the outputs if the data is immutable during the scope.
