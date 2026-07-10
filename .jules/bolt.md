## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## $(date +%Y-%m-%d) - Native Numeric Sort is Faster than Manual Callbacks
**Learning:** In V8, passing a manual sorting callback like `(a, b) => a - b` to `Array.prototype.sort()` for numeric sorting forces the engine to repeatedly jump between native C++ and JavaScript user-land for every comparison, creating significant overhead (~75ms for 100k items).
**Action:** For large, strictly numeric arrays, copy the data into a TypedArray like `Float64Array` and use its parameterless `.sort()` method (`new Float64Array(data).sort()`). This delegates the sorting entirely to optimized native C++ logic, drastically reducing execution time (to ~18ms) and also yielding a non-mutating result.
