## 2024-03-13 - [Array Spreads in Hot Paths]
**Learning:** Using array spread syntax (`[0, ...ranges]`) in performance-critical statistical calculations (like `computeIMR`) causes severe performance degradation in Node/V8 due to hidden O(N) iteration and memory reallocation.
**Action:** When returning arrays that require prepending elements, pre-allocate the final array size using `new Array(len)` and assign the first element (e.g., `ranges[0] = 0`), then fill the rest in a standard `for` loop. This avoids both `push` and `...` spread.
