## 2024-05-02 - Array Subgrouping GC Bottleneck in SPC Logic
**Learning:** Re-verified that replacing `data.slice()`, `.map()`, and spread syntax (`...`) with manual `for` loops and pre-allocated arrays (`new Array(numGroups)`) for data subgrouping in Control Charts (`computeXbarR`, `computeXbarS`) consistently provides ~10x execution speedups and prevents major GC overhead in hot paths.
**Action:** Always prefer pre-allocated arrays and explicit indexing loops over higher-order array methods and spreading when transforming large numerical datasets into subgroups.
