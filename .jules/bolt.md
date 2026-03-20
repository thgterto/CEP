
## $(date +%Y-%m-%d) - Avoiding Memory Allocation Overhead in Subgrouped Data
**Learning:** In statistical applications processing large arrays, functions that subdivide data into groups using `data.slice()`, apply spread operators `...g`, and use functional loops like `Array.prototype.map()` incur severe performance penalties due to O(N) memory allocations per subgroup and associated GC overhead. In hot paths (like `computeXbarR` and `computeXbarS`), this can inflate runtime to >250ms for 1M points.
**Action:** Replace high-level array operations (`slice`, `map`, spread operators) with single-pass manual `for` loops, caching statistical sums (mean, variance, max, min) dynamically inline, and use pre-allocated arrays (`new Array(numGroups)`) to prevent array resizing.
