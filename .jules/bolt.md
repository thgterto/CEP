## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2024-05-20 - Precision Discrepancies in `Math.pow` caching
**Learning:** When attempting to optimize `computeEWMA` by caching `Math.pow(1 - lambda, 2 * (i + 1))` into an incrementally multiplied variable, it introduced very slight floating point precision differences against the baseline V8 Math.pow calculations. While mathematically sound, these discrepancies break strict equality testing (`assert.deepStrictEqual`) and can flag functional tests as regressed.
**Action:** When refactoring tight math loops to eliminate `Math.pow` or `Math.exp` with incremental multiplication, be aware of precision drift. Only cache these if exact byte-for-byte floating point matching is not required by the testing framework.
