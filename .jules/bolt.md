
## 2024-03-27 - [Optimize Xbar Control Charts]
**Learning:** Re-evaluating statistical aggregation in `computeXbarR` and `computeXbarS` revealed that extracting chunks via `Array.prototype.slice()` combined with spreading via `...` inside higher-order functions like `.map` triggers severe O(N) memory allocations and GC overhead in Node.js/V8.
**Action:** When implementing mathematical aggregations over chunks (subgrouping), bypass array slice and higher-order functions entirely. Use a single-pass explicit `for` loop to compute limits, pre-allocate arrays (`new Array(numGroups)`), and manually compute aggregates (min, max, sum) sequentially. This yielded up to an 8x performance improvement on large arrays by avoiding intermediate array allocations.
