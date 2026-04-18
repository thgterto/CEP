## 2024-06-25 - Avoid array spread operator on large data arrays
**Learning:** Using the spread operator syntax (e.g., `[...array]`) on very large arrays (e.g., 100k+ items) can trigger a `RangeError: Maximum call stack size exceeded` in V8/Node.js, acting as both a performance bottleneck and a crash risk. The `computeIMR` method previously used `[0, ...ranges]` returning moving ranges.
**Action:** Replace array spread operations with pre-allocated arrays (`new Array(len)`) and explicit `for` loops. This avoids the edge-case vulnerability while yielding major performance improvements (~4x faster on 1M items).

## 2024-06-25 - Avoid .map() and .slice() when subgrouping
**Learning:** In statistical functions like `computeXbarR` and `computeXbarS`, replacing array slicing (`data.slice`), spread syntax (`...`), and higher-order functions (`map`) with single-pass `for` loops and pre-allocated arrays (`new Array(numGroups)`) when subgrouping data for Control Charts yields a significant performance boost (~4x-5x faster) and drastically reduces Garbage Collection/memory allocation overhead.
**Action:** When working with subgroup arrays, use a single pass O(N) loop to compute sums and max/min values instead of allocating inner arrays with `slice()` and then looping again with `.map()`.
