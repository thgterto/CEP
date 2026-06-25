## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2026-05-19 - Efficient Multiple Aggregate Statistics in Single-Pass Loops
**Learning:** When calculating moving ranges and control limits for charts like I-MR, the original implementation iterated over the data multiple times (one loop to push ranges, another loop via `SPC.mean` for data average, another for range average). Combining these aggregations into a single-pass `for` loop with a pre-allocated array (`new Array(len)`) eliminates overhead from array methods (`push`), the spread operator (`[0, ...ranges]`), and redundant iterations, yielding a >6x performance speedup.
**Action:** When a function requires multiple aggregate statistics over the same dataset (e.g., sum of data, sum of differences), compute them simultaneously in a single loop traversal.
