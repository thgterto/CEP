## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - TypedArray Sorting Optimization
**Learning:** For numeric arrays, replacing standard `Array.prototype.slice().sort((a,b) => a-b)` with `new Float64Array(data).sort()` provides a massive >5x performance gain by eliminating the JS callback execution overhead and relying on V8's optimized native numeric sorting routines.
**Action:** Always prefer TypedArray `sort()` implementations when sorting heavily populated numeric datasets to avoid the callback tax and safely prevent in-place mutation without relying on `.slice()`.
