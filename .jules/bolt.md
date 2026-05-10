
## 2024-11-20 - Fast Array Iteration in Statistical Functions
**Learning:** For array-heavy computational loops in `SPC` functions (like `computeCUSUM`), explicitly pre-allocating arrays with `new Array(len)`, managing indices manually instead of using `push()`/`shift()`, caching invariant calculations, and replacing `Math.max()`/`Math.min()` with inline conditionals prevents overhead and significantly improves performance (~11x speedup).
**Action:** When working on array processing logic with O(n) loops, prefer to preallocate `new Array(length)` instead of calling `array.push()`. Furthermore, inline `Math.min/max` with ternary conditionals and evaluate constants outside of the main loop.
