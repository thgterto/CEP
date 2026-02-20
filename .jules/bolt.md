## 2024-05-23 - [JS Array Performance]
**Learning:** `Array.prototype.reduce` is significantly slower (~14x) than a simple `for` loop for basic aggregation (sum/mean) in this Node.js v22 environment.
**Action:** Prefer imperative `for` loops for hot-path statistical calculations over functional array methods.
