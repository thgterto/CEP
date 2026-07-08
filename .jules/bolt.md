## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2026-05-19 - Safe Array Spread Replacements and Exact Baseline Assertions
**Learning:** When replacing array spread insertions (`[0, ...ranges]`) with pre-allocated loops (`new Array(len)`), ensure exact baseline fallbacks (like an initial `0` for MR or `NaN` bounds for `[]` inputs) are manually enforced. Omitting these causes strict equality assertions (`assert.deepStrictEqual`) to fail.
**Action:** When manually allocating arrays, always guard against edge cases (`data.length === 0`, `data.length === 1`), initialize default boundary indices explicitly (`mrData[0] = 0`), and normalize test assertions to handle `NaN` propagation correctly.
