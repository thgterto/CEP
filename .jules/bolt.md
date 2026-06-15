## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2026-05-19 - Replacing Spread Operations in Statistical Functions Avoids Maximum Call Stack Exceeded
**Learning:** Using the spread operator `...` inside array literals (e.g., `[0, ...ranges]`) on datasets exceeding ~100k points triggers `RangeError: Maximum call stack size exceeded` in V8/Node.js, severely breaking the application for large data imports.
**Action:** Always replace spread array operations with explicit `for` loops and pre-allocated arrays (e.g., `new Array(len)`) in chart calculation logic, which simultaneously avoids the stack limit crash and improves performance.
