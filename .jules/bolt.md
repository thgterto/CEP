
## 2024-03-01 - [Avoid Higher-Order Functions for Matrix/Subgroup Operations]
**Learning:** In hot statistical paths (like `computeXbarR` and `computeXbarS`), generating sub-arrays using `data.slice` inside a loop and chaining `.map()` functions causes massive continuous memory allocation and garbage collection overhead.
**Action:** When computing subgroup statistics (mean, range, stdDev), use a single contiguous `for` loop to iterate over the main array and calculate sums, mins, maxes, and variances inline, maintaining state without creating intermediate arrays.
