
## 2024-05-28 - Unrolling Data Slice Map Iterations in Arrays
**Learning:** Avoiding `.slice()`, `.map()`, and array spreading syntax (`...`) when iteratively calculating subgroups in statistical data significantly optimizes performance (measured ~4-6x speedup) and reduces GC memory allocations in Node.js. High-level array functional abstractions create a massive bottleneck for tight numerical computations compared to pre-allocating an array and inline calculating using standard loops.
**Action:** When working on array-heavy hot paths, prefer unrolling arrays with explicit nested `for` loops, pre-allocating array sizes, and directly computing min/max/sum inline rather than utilizing functional array methods like `slice` or `map`.
