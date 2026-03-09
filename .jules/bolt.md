## 2024-05-14 - Replace array slicing with pre-allocated arrays
**Learning:** Array splicing operations (`Array.slice()`) combined with spread syntax (`...`) and higher-order functions (`map`) create significant memory allocation bottlenecks due to heavy Garbage Collection overhead, especially for Control Charts like Xbar-R and Xbar-S where massive datasets are chunked.
**Action:** Replace slice, spread, and map combinations with single-pass `for` loops and pre-allocated arrays (`new Array(numGroups)`) to reduce array creation overhead. Measure and document the speedup.
