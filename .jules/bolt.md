## 2024-05-22 - Array.reduce Performance Impact
**Learning:** In this environment (Node 22), `Array.prototype.reduce` was measured to be ~14x slower than a simple `for` loop for basic arithmetic operations (summing, squaring) on large arrays (1M items).
**Action:** Prefer explicit `for` loops over `reduce` in critical hot paths like statistical calculations (`mean`, `stdDev`), even if it sacrifices some functional style elegance.
