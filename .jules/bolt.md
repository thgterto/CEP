## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2026-05-19 - Optimizing Numeric Sorting with Typed Arrays
**Learning:** Using `Array.prototype.sort((a,b) => a-b)` on large numeric arrays suffers from closure overhead and implicit type checking. Switching to `new Float64Array(data).sort()` is significantly faster (~3x-6x speedup) because Typed Arrays are heavily optimized natively for numeric sorting without requiring custom comparators.
**Action:** When a bottleneck is identified around sorting large numeric arrays, use a Typed Array (like `Float64Array`) and standard `.sort()` instead of `Array.prototype.sort` with a comparator.
