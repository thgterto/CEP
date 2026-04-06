
## 2024-04-05 - Array Dynamic Resizing & Allocation Overhead
**Learning:** In V8 and modern JS engines, heavy use of `Array.prototype.push()`, `.shift()`, and especially the spread operator `[0, ...ranges]` in large loops (like control chart statistical calculations) causes massive GC churn and reallocation overhead. The spread operator can even hit maximum call stack size on very large datasets.
**Action:** When creating statistical derived arrays where the final length is known (like `computeIMR` or `computeCUSUM`), always pre-allocate with `new Array(size)` and assign values by index. Also, avoid mapping and duplicating loop efforts—iterate once and assign values directly.
