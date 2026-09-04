## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Safe Refactoring in EWMA
**Learning:** In Node.js v22, avoiding `Array.prototype.shift()` (an O(N) operation) and utilizing pre-allocated arrays along with hoisted loop-invariant math operations (like `1 - lambda`) inside hot statistical loops yields over 2x speedup on large datasets.
**Action:** When optimizing loop-heavy array manipulations in statistical algorithms (e.g. SPC), prioritize static allocation and scalar state-tracking (e.g., `prevZ`) over dynamic structural mutations (`push`, `shift`), while preserving native functions like `Math.pow` inside the loop to avoid floating point drift.
## 2024-05-20 - computeCapability Redundant Mean Calculation
**Learning:** In the `computeCapability` function, passing the pre-calculated `mu` into the `SPC.stdDev` function prevents an unnecessary O(N) array iteration since `stdDev` internally recalculates the mean if one isn't provided. This yields ~35% speedup without functional changes.
**Action:** When calculating standard deviation alongside the mean in SPC functions, always pass the already-computed mean as the third argument to `SPC.stdDev(data, populationVariant, preCalculatedMean)` to prevent redundant array iterations.
