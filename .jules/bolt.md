## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2026-08-25 - Safe Loop-Invariant Caching in V8
**Learning:** Extracting complex mathematical invariants (like `lambda / (2 - lambda)`) inside `Math.sqrt()` outside of a hot loop significantly reduces overhead. However, attempting to replace iterative `Math.pow()` with cached multipliers can cause strict precision assertion failures. Safely isolating only perfectly invariant terms (like constants) yields a >20% speedup without risking floating-point drift.
**Action:** Always verify floating-point arithmetic optimizations against strict baseline equality (especially dealing with `0` vs `-0` for `SPC.stdDev([])`) before finalizing loops.
