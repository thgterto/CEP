## 2026-02-12 - [Array.reduce Performance Impact]
**Learning:** `Array.prototype.reduce` introduces significant overhead compared to simple `for` loops in hot paths like statistical calculations (`SPC.mean`, `SPC.stdDev`). A ~12x speedup was observed by replacing `reduce` with a loop.
**Action:** In performance-critical numerical code, prefer `for` loops over `reduce`.
