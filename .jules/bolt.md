## 2026-04-30 - Control Chart Array Allocation
**Learning:** In V8/Node.js v22, using the spread operator (`[0, ...ranges]`) and native higher-order array methods (`.slice().map()`) in heavy statistical computations creates massive garbage collection overhead and triggers `RangeError: Maximum call stack size exceeded` on large datasets.
**Action:** Replace `push()`, `shift()`, and spread operators with pre-allocated arrays (`new Array(len)`) and explicit single-pass `for` loops in hot paths to achieve significant performance gains (~5x-10x) and guarantee safe execution on massive payloads.
