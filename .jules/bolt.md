
## 2024-05-18 - Avoid array spread operator on massive arrays for performance and safety
**Learning:** Using the array spread operator (`[...array]`) in V8/Node.js is extremely inefficient for massive arrays (e.g. 150k items) and can trigger a `RangeError: Maximum call stack size exceeded`. This was observed in the `computeIMR` function where `[0, ...ranges]` was used, causing an O(N) allocation and traversal overhead.
**Action:** Replace `[...array]` and `.push()` with a pre-allocated array (`new Array(len)`) and a single-pass `for` loop in hot paths dealing with large datasets. Always verify edge cases like `len === 0` to avoid `RangeError: Invalid array length` with `new Array()`.
