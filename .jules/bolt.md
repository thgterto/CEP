## 2024-04-08 - Optimized Memory Allocation in Control Charts
**Learning:** Using higher-order array functions (`map`, `slice`, spread syntax) when partitioning dense arrays for control charts (Xbar-R, Xbar-S) or calculating Moving Ranges (I-MR) creates massive garbage collection pressure and O(N) iteration overhead in V8.
**Action:** Always pre-allocate arrays via `new Array(size)` and compute multiple statistical metrics (sum, min, max, diff) simultaneously within a single `for` loop to avoid intermediate memory reallocation.
