
## 2024-05-24 - Pre-allocate Arrays and Avoid Spread Operator in Hot Loops
**Learning:** In hot path statistical functions (like `computeIMR`), using array push operations, traversing arrays multiple times (e.g., using `.mean()`), and especially using the array spread operator (`[0, ...ranges]`) generates significant memory allocation overhead and Garbage Collection pauses in JavaScript.
**Action:** Replace multiple-pass traversals and spread operators with a single-pass `for` loop, explicitly pre-allocating the resulting array (`new Array(len)`), caching invariant properties (like array length), and calculating intermediate aggregates (like `sumR`) inline. This can yield up to a 9x performance improvement for array-heavy calculations in the SPC module.
