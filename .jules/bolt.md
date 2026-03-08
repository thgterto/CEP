## 2024-05-18 - Avoid array slicing and mapping in SPC functions
**Learning:** Array slicing, spread syntax, and mapping (e.g. `data.slice(...)`, `Math.max(...g)`, `.map()`) cause significant memory overhead and GC pressure when processing large numerical datasets, particularly when computing subgroup statistics like moving ranges.
**Action:** Replaced these higher-order array functions and dynamically sized arrays with single-pass `for` loops and pre-allocated arrays (`new Array(len)`) in `SPC.computeXbarR` and `SPC.computeXbarS`, achieving up to a ~4x execution speedup.
