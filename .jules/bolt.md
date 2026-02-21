## 2024-05-23 - [Optimization of SPC Mean and StdDev]
**Learning:** In V8 (Node.js/Chrome), replacing `Array.prototype.reduce` with explicit `for` loops for simple arithmetic operations (sum, sum of squares) on large arrays yields significant performance improvements (observed >10x speedup).
**Action:** Prefer `for` loops over `reduce` in hot paths involving heavy statistical calculations.
