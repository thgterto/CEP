## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2024-05-19 - Shift removal in array-heavy loops
**Learning:** `Array.prototype.shift()` is an O(N) operation that degrades performance on large datasets. In array-heavy statistical loops (like `computeEWMA`), appending an initial state value to a dynamic array and then calling `shift()` at the end introduces unnecessary overhead.
**Action:** When optimizing such loops, track the initial state using a separate variable (e.g., `prevZ`) and directly assign values to pre-allocated arrays, eliminating the need for `shift()` entirely.
