## 2024-06-25 - TypedArray Sorting Optimization
**Learning:** For sorting massive, dense numeric arrays in JavaScript, `Float64Array(data).sort()` is significantly faster (~5x speedup) than standard `Array.prototype.sort((a,b) => a-b)` and natively avoids mutation of the original array since the TypedArray constructor implicitly copies the data.
**Action:** When computing medians or other rank-based statistics on large numeric arrays, use a TypedArray for sorting to improve performance and reduce memory allocation overhead from explicit slice/copy operations.
