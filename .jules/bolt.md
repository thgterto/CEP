## 2026-02-16 - SPC Performance Optimization
**Learning:** Replacing `Array.prototype.reduce` with `for` loops in `SPC.mean` and `SPC.stdDev` yielded ~3x and ~7.5x performance improvements respectively for large datasets (1M items).
**Action:** Prefer explicit `for` loops for hot-path statistical calculations in JavaScript, especially when dealing with potentially large arrays.
