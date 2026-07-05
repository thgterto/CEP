## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-07-05 - Optimization of Run Chart Median Sorting
**Learning:** For extremely large numeric datasets,  significantly outperforms standard  because it avoids JS closure overhead by executing the sort natively. It also creates a copy, ensuring no mutation of the original array without needing .
**Action:** When finding bottlenecks in array sorting operations for strictly numeric data, benchmark  sorting instead of standard  to measure if the speedup is worth the minor structural deviation.
## 2026-05-19 - Optimization of Run Chart Median Sorting
**Learning:** For extremely large numeric datasets, `new Float64Array(data).sort()` significantly outperforms standard `Array.prototype.sort()` because it avoids JS closure overhead by executing the sort natively. It also creates a copy, ensuring no mutation of the original array without needing `slice()`.
**Action:** When finding bottlenecks in array sorting operations for strictly numeric data, benchmark `Float64Array` sorting instead of standard `Array.prototype.sort()` to measure if the speedup is worth the minor structural deviation.
