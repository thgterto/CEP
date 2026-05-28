## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2026-05-28 - Fast TypedArray Sorting for Dense Numerics
**Learning:** In JavaScript, sorting an array of numbers using `.sort((a,b) => a-b)` incurs a significant performance penalty on large datasets because the engine invokes the JavaScript callback function for every single comparison.
**Action:** When calculating statistics like the median on large, dense numeric arrays (e.g., in `computeRunChart`), convert the data to a `Float64Array` and use its native sort (`new Float64Array(data).sort()`). This safely copies the array and leverages the engine's highly optimized native C++ numeric sort, yielding up to a 6x speedup.
