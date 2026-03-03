
## 2024-05-20 - Speeding up array sorting for Medians
**Learning:** In Node.js / JavaScript, sorting large, dense arrays of numbers using `Array.prototype.sort((a,b) => a-b)` is surprisingly slow because of the comparison callback overhead and the underlying engine's generalized sort algorithm.
**Action:** For massive numeric arrays (e.g., calculating medians in SPC charts), converting the data to a `Float64Array` and calling `.sort()` on it is significantly faster (measured a ~6x speedup). This pattern should be preferred for hot-path statistical array manipulations.
