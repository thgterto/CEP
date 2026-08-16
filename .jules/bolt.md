## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-05-29 - Inline Math and Array Value Caching in SPC Loops
**Learning:** Replacing function calls like `Math.sign` with inline ternary logic (e.g. `v > 0 ? 1 : (v < 0 ? -1 : 0)`) and caching repeated array accesses (`data[i]`, `data[i-1]`) in intensive O(N) analytic loops like anomaly detection yields massive execution speedups (~40%) without significantly reducing readability.
**Action:** When identifying O(N) loops operating on mathematical logic over large datasets, prioritize eliminating function call overhead and duplicate array indexing through simple inline expressions and primitive variable caching. Ensure you account for edge cases (e.g. `NaN` evaluation differences).
