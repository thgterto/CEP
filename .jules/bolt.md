## 2024-05-23 - [Optimization of SPC.mean and SPC.stdDev]
**Learning:** `Array.prototype.reduce` is significantly slower (10x-15x) than a simple `for` loop for basic arithmetic aggregations (sum, sum of squares) in Node.js v22 and likely V8 in general for large arrays (1M items).
**Action:** Prefer `for` loops over `reduce` in hot-path statistical functions (`mean`, `stdDev`) when processing large datasets.
