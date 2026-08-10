## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2026-05-19 - Array spread operator Maximum Call Stack Size Exceeded
**Learning:** Using the spread operator syntax (e.g., `[0, ...array]`) on very large arrays (e.g., > 150,000 items) can trigger a `RangeError: Maximum call stack size exceeded` in V8/Node.js.
**Action:** Replace array spread operations with pre-allocated arrays (e.g. `new Array(len)`) and explicit loop assignments to avoid this edge-case vulnerability while simultaneously yielding major performance improvements.
