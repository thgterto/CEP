## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2024-06-11 - Float64Array for Faster Sorting without Mutation
**Learning:** Using `new Float64Array(data).sort()` provides a significant >5x speedup for calculating medians on large numeric arrays compared to the standard `Array.prototype.sort()` because typed arrays default to numeric sorting and avoid the JS callback overhead (`(a,b) => a-b`). It also safely copies the array, avoiding in-place mutation of the original data.
**Action:** Use `Float64Array` when sorting purely numeric arrays in performance-critical paths, especially when a copy of the data is needed anyway.
