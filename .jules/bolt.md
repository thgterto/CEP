
## $(date +%Y-%m-%d) - Optimization of Subgrouping Functions
**Learning:** In V8 (Node.js 22), utilizing array methods like `.slice()` combined with `.map()` inside tight mathematical loops (like standard deviation / range calculation on subgroups) creates immense GC pressure and memory allocations overhead on large datasets. Replacing them with pre-allocated arrays (`new Array(size)`) and single-pass inline `for` loops computing sum/variance simultaneously yields massive performance gains (~6x-7x faster) for control charts.
**Action:** When working on statistical windowing or subgrouping functions in JavaScript, prioritize calculating bounds (`Math.floor(length / n)`) and processing via nested indices `data[start + j]` rather than using intermediate arrays or `Math.max(...array)`.
