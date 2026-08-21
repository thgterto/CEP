## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2024-05-30 - Inlining `Math.sign()` and Caching Lookups in O(N) Loop
**Learning:** `Math.sign()` incurs unexpected performance overhead when called extensively in tight loops (e.g., thousands of times in statistical violation detection algorithms).
**Action:** Replace `Math.sign()` with inline conditional ternary logic (e.g., `v > 0 ? 1 : (v < 0 ? -1 : (Number.isNaN(v) ? NaN : 0))`) in performance-critical sections like `detectViolations`. Also cache preceding array values to avoid `data[i-1]` array lookups.
