## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2026-05-19 - Safe Sub-array Pre-allocation in I-MR computations
**Learning:** Replacing spread operators (`[0, ...ranges]`) with pre-allocated arrays in statistical loops (`new Array(len)`) provides massive (~6x) speedups, but strict equality matchers require exact baseline error propagation structure. specifically, length `0` and length `1` sets need to return exact `NaN` boundaries, and the initial value must explicitly be set to `0` (e.g. `mrData[0] = 0`).
**Action:** When replacing array spread semantics with pre-allocated loops, always implement an early-return check for sizes `< 2` to preserve expected standard statistical assertion bounds.
