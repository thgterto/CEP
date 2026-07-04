## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2024-07-04 - Strict Edge Case Handling in IMR Loop Flattening
**Learning:** When flattening multiple loops and eliminating array spread syntax (`[...ranges]`) in the `computeIMR` calculation, it is essential to correctly handle single-element arrays (`len === 1`). In the original implementation, `SPC.mean([])` returns `NaN`. When combining loops, this fallback behavior must be explicitly managed (e.g., `meanR = len > 1 ? sum / (len - 1) : NaN`) to avoid returning `0` and failing regression testing against the baseline.
**Action:** When flattening iterative math calculations, always explicitly check zero-length and single-length dataset outputs against baseline behavior.
