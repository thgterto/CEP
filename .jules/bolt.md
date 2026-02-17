## 2026-02-17 - V8 Optimization: `reduce` vs `for` Loop
**Learning:** `Array.prototype.reduce` introduces significant overhead (44x slower for mean calculation) compared to imperative `for` loops in V8 for large datasets (1M points). This contradicts some modern JS best practices that favor functional style but aligns with low-level performance optimization.
**Action:** When optimizing tight loops in core mathematical libraries (like SPC), prefer imperative `for` loops over `reduce`/`map`/`filter` to minimize function call overhead and memory allocation.
