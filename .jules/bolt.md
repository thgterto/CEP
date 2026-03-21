
## 2024-03-21 - Memory Allocation Overhead in Array Functions
**Learning:** Re-allocating arrays and using higher-order functions (`slice`, `map`, `push`, spread syntax) in hot statistical loops like `computeXbarR` and `computeXbarS` introduces severe memory allocation overhead and Garbage Collection pauses on large datasets (e.g., 100k points). Pre-allocating standard arrays (`new Array(len)`) and using single-pass nested `for` loops provides an ~8x performance improvement.
**Action:** When performing mathematical aggregations (subgroups) or generating new parallel arrays (CUSUM, EWMA, MR) on large datasets, prioritize manual index management and array pre-allocation over functional methods.

## 2024-03-21 - Float64Array for Number Sorting Performance
**Learning:** `Array.prototype.sort((a,b) => a-b)` on large dense numeric arrays is extremely slow due to closure invocation overhead on every comparison. Creating a `Float64Array` view and sorting it natively is ~4-5x faster (e.g., in median calculation for `computeRunChart`).
**Action:** When calculating medians or heavily sorting purely numerical datasets (e.g., $>10k$ points), always convert to `Float64Array` first.
