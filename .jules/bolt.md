## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Single-pass aggregations for multiple array statistics
**Learning:** When optimizing statistical calculations like `computeIMR` that require multiple aggregate statistics over the same dataset (e.g., calculating both dataset mean and moving range mean), using multiple separate mapping loops (like `SPC.mean(ranges)`) is inefficient.
**Action:** Combine the sum and difference calculations into a single-pass loop instead of executing redundant array iterations to improve efficiency and reduce memory overhead.
