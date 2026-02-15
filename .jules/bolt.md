## 2024-05-23 - Array.reduce Performance Bottleneck
**Learning:** In V8 (Node/Chrome), `Array.prototype.reduce` is significantly slower (10-15x) than a simple `for` loop for basic arithmetic operations like summing large arrays (>1M items). This is due to the overhead of repeated function calls and potential lack of inline optimizations for the callback.
**Action:** Prefer `for` loops or `for...of` loops over `reduce` for performance-critical hot paths involving heavy array iteration, especially in statistical calculations.
