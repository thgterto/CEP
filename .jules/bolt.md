## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2024-05-24 - Array Spread in Control Charts
**Learning:** Using array spread `[0, ...ranges]` in hot statistical loops like `computeIMR` is an O(N) performance bottleneck and throws "Maximum call stack size exceeded" errors for large arrays (>65k items). Pre-allocating the array using `new Array(len)` and a single-pass `for` loop yields an 8.5x performance speedup and prevents the crash.
**Action:** When working on array-heavy mathematical operations in control charts, favor pre-allocated arrays and explicit indexing over dynamic methods like `push`, `shift`, or spread syntax.
