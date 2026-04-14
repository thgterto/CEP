
## 2024-05-24 - Avoid micro-optimizations on array state checks
**Learning:** Replacing an `Array.some()` check with a cached state flag (`hasAnyLabels: boolean`) provides statistically zero measurable performance gain but introduces major regression risks by requiring manual state synchronization and diverging from the truthiness logic used in other paths. The JIT compiler optimizes `.some()` extremely well for simple conditions.
**Action:** Do not attempt to cache O(N) functional array methods when testing state conditions unless proven to be an active, massive bottleneck.

## 2024-05-24 - Focus optimization on hot numerical paths, not cold UI events
**Learning:** Optimizing a string concatenation loop in a file download utility (`downloadCSV`) is a premature optimization of a cold path. A user exporting a file will never notice a 100ms improvement. Focus strictly on hot paths (e.g., calculations that run on render).
**Action:** Always verify if a function is run synchronously during a render cycle or high-frequency event loop before optimizing it. Ignore cold paths like explicit file exports.

## 2024-05-24 - Spread operator performance trap on large arrays
**Learning:** Using the spread operator to prepend values to large numerical arrays (e.g., `[0, ...ranges]`) causes a massive performance hit due to iteration overhead and memory reallocation, and can even trigger a `RangeError: Maximum call stack size exceeded` on very large arrays.
**Action:** Replace `[val, ...array]` patterns with `new Array(len)` pre-allocation and single-pass explicit `for` loop assignment for high-performance statistical paths.
