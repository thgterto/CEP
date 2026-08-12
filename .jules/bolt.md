## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-19 - Baseline Return Strictness for Empty Arrays in computeEWMA
**Learning:** When handling empty datasets (`len === 0`) in SPC functions (like `computeEWMA`), explicit early returns must assign `{ mean: NaN, sigma: 0 }` to the `stats` object to perfectly match the baseline implementation. `SPC.stdDev([])` inherently evaluates to `0` (due to `Math.sqrt(-0)`), while `SPC.mean([])` is `NaN`.
**Action:** Always verify edge case bounds behavior via ad-hoc testing, particularly the exact evaluation of native or custom standard deviation functions on empty data (like resulting in 0), rather than assuming strict `NaN` assignments across the board.
