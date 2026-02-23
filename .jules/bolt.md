## 2026-02-23 - Optimized SPC Math
**Learning:** `Array.prototype.reduce` is significantly slower than `for` loops for simple arithmetic operations in large arrays in this Node.js environment (>10x slower).
**Action:** Prefer `for` loops for hot-path statistical calculations.
