## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Caching jStat Methods
**Learning:** When using `jStat` in statistical functions (like `calculateDescriptiveStats`), methods such as `j.mean()`, `j.stdev(true)`, and `j.quartiles()` do not internalize memoization.
**Action:** Caching their results in local variables prevents redundant computations (e.g., repeated sorting in quartiles) and significantly improves execution speed on large datasets (~50% faster).

## 2026-05-19 - Standard Deviation Redundant Iterations
**Learning:** Functions that calculate standard deviation often recalculate the mean internally.
**Action:** When calculating standard deviation alongside the mean in SPC functions (e.g., `computeCapability`), pass the already-computed mean as the third argument to `SPC.stdDev(data, populationVariant, preCalculatedMean)` to prevent redundant array iterations and improve performance.
