## 2024-05-29 - Array Shift and Push overhead in hot loops
**Learning:** In V8, repeatedly calling `shift()` on an array inside a loop causes O(N) element shifts on each iteration, leading to O(N^2) overall complexity. Pre-allocating arrays with `new Array(len)` and managing indices manually avoids this and drastically improves performance. Also, `Math.max` and `Math.min` have closure overhead; inline conditionals are faster.
**Action:** Always pre-allocate arrays and manage state using local variables rather than `push`/`shift` for large datasets in tight loops.
