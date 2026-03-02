
## 2024-05-10 - [Float64Array for Faster Sorting]
**Learning:** Sorting massive numeric arrays using standard `Array.prototype.sort((a,b) => a-b)` incurs a large overhead due to repeated comparator function calls and memory management.
**Action:** Use a typed array (`new Float64Array(data).sort()`) when sorting flat, dense arrays of numbers to leverage native optimized sorting implementations, achieving a roughly 6x speedup.
