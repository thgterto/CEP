## 2026-02-25 - [JS Performance: Loop vs Reduce]
**Learning:** In Node.js v22 (and V8 generally), `Array.prototype.reduce` can be significantly slower (>10x) than a simple `for` loop for hot paths like statistical calculations (mean, stdDev). The overhead of function calls and closure creation in `reduce` accumulates quickly for large arrays.
**Action:** Prefer `for` loops for performance-critical mathematical aggregations in this codebase.
