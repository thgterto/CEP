## 2026-05-06 - Replacing Math.pow with incremental multiplication in hot loops
**Learning:** In highly mathematical loops (e.g. `computeEWMA` using `Math.pow(1 - lambda, 2 * (i + 1))`), `Math.pow` introduces heavy overhead when called inside `O(N)` calculations. It can be successfully replaced with O(1) mathematical state keeping by incrementing an accumulator.
**Action:** When evaluating exponential formulas in tight loops where the exponent grows linearly (`2*(i+1)`), pre-calculate the base multiplier (`(1 - lambda)^2`) and multiply the accumulator by it in each iteration to maintain precision while dramatically cutting CPU overhead.

## 2026-05-06 - Memory overhead of array map and spread in V8
**Learning:** Using `array.map()`, `Math.max(...array)`, and returning newly allocated spread arrays `[0, ...ranges]` in data processing pipelines on hot paths incurs massive memory reallocation and garbage collection overhead, bottlenecking throughput in V8.
**Action:** Always prefer explicit single-pass `for` loops combined with pre-allocated arrays (`new Array(len)`) and tracking variables (for `max`, `min`, `sum`) inside the loop body over standard ES6 array methods when processing large continuous numerical datasets.
