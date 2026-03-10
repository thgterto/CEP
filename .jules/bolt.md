
## 2024-03-10 - Replace Array.prototype.sort with TypedArray.sort for numeric medians
**Learning:** In V8 (and similar engines), sorting large dense numerical arrays using standard `Array.prototype.sort((a,b) => a-b)` is surprisingly slow compared to native TypedArray sorts because it invokes the JS callback for every comparison and allocates extra memory (via `slice()`).
**Action:** Always prefer `new Float64Array(data).sort()` when sorting dense collections of numbers, especially in hot paths like calculating percentiles or the median, to bypass the JS callback overhead entirely and offload sorting to heavily optimized internal engine code.
