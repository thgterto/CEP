
## 2026-03-25 - Native TypedArrays for faster numeric sorts
**Learning:** For large numeric arrays (e.g., finding the median in `computeRunChart`), using standard `Array.prototype.sort((a,b) => a-b)` is significantly slower than loading the data into a TypedArray (`new Float64Array(data).sort()`). The benchmark showed a >6x speedup.
**Action:** Always prefer TypedArrays for mathematically intensive array manipulations or sorting of massive dense numeric arrays.
