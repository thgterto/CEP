
## 2026-03-05 - Array slicing in X-Bar Control Charts
**Learning:** Using `Array.prototype.slice` and `Array.prototype.map` inside looping constructs to calculate subgroup logic (`computeXbarR` and `computeXbarS`) generates severe memory allocation overhead and slows execution time by 5x-8x in JavaScript.
**Action:** Always refactor hot-path nested iterations (like forming subgroups) by explicitly pre-allocating an `Array(numGroups)` based on division size, and use a single inner `for` loop to compute basic statistics (`min`, `max`, `sum`) in-place without creating intermediate chunks.
