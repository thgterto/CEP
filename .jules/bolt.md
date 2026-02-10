## 2024-05-23 - Array.reduce Performance Bottleneck
**Learning:** `Array.prototype.reduce` is significantly slower (~10x) than a simple `for` loop for basic arithmetic aggregations (sum, sum of squares) in large arrays in this Node.js environment.
**Action:** Prefer `for` loops over `reduce` for performance-critical aggregation functions in the `SPC` module.
