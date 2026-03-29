
## 2026-03-29 - [Anti-pattern: Micro-optimizing V8 Loops]
**Learning:** Micro-optimizing tight `O(N)` loops by manually caching array lengths or inlining simple math functions like `Math.sign` with ternary operators is an anti-pattern in V8/modern JS engines. It provides zero measurable performance benefit while degrading code readability, as JIT compilers already handle these efficiently.
**Action:** Avoid micro-optimizations that sacrifice readability unless profiling explicitly shows a severe bottleneck that the engine cannot optimize. Rely on algorithmic or data-structure improvements instead.

## 2026-03-29 - [Optimizing Numeric Sorts with Typed Arrays]
**Learning:** For sorting massive, dense numeric arrays in `SPC` functions (like calculating the median), using TypedArrays (`new Float64Array(data).sort()`) is significantly faster (approx. ~5x speedup) than standard `Array.prototype.sort((a,b) => a-b)`.
**Action:** When computing medians or percentiles on dense numeric arrays, replace `slice().sort(...)` with `new Float64Array(data).sort()` to leverage native engine sort implementations while preserving clean syntax.
