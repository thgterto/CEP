
## 2024-04-26 - Pre-allocated Array Performance in Hot Loops
**Learning:** In V8/Node.js environments, relying on dynamic array `push()` and `.shift()` operations within tight, O(N) loops over millions of items introduces massive GC churn and reallocation overhead. While inline Math logic (`cp > 0 ? cp : 0` vs `Math.max`) does not significantly impact modern JIT, pre-allocating an array (`new Array(len)`) and directly writing to indices provides a measurable ~2-4x speedup in computations like `computeCUSUM`.
**Action:** When implementing statistical or mathematical loops over potentially massive datasets (1M+ items), manually pre-allocate `Array`s based on `data.length` and handle state manually instead of using array prototypes like `push` or `shift`.
