## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2026-05-19 - Pre-allocation Optimization for Statistical Computations
**Learning:** Inlining dynamic array operations (`.push`, `.shift`, `[0, ...arr]`) by using pre-allocated arrays (`new Array(len)`) and manually managing assignments in single-pass `for` loops produces measurable speedups (~3-4x) and avoids high garbage collection (GC) and reallocation overhead in statistical loops (e.g., `computeIMR`, `computeCUSUM`, `computeEWMA`). However, doing this blindly can introduce tricky regressions (e.g., bounds evaluating to `0` instead of `NaN` for edge cases). Strict deep equality testing against baseline structures is mandatory to identify correct default states (`new Array(len)` handles empty values automatically).
**Action:** When refactoring O(N) loops, always use pre-allocated arrays for memory efficiency, explicitly guard against edge cases (like `len === 0`), and ensure default boundary states (like `NaN` limits) align exactly with unoptimized behavior through automated ad-hoc tests.

## 2026-05-19 - Efficient Numeric Array Sorting
**Learning:** Using `Array.prototype.sort((a,b) => a-b)` on large datasets (like `computeRunChart`) is significantly slower than utilizing TypedArrays. Wrapping the data in `new Float64Array(data)` automatically creates a copy (avoiding in-place mutation of the original array) and provides a >5x execution speedup when sorting because of V8's specialized numeric sorting implementations for typed arrays.
**Action:** When sorting numeric arrays in hot paths or on large datasets where a copy is required anyway, use `new Float64Array(data).sort()` instead of `data.slice().sort((a,b) => a-b)`.
