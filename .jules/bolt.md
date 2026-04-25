## 2026-04-25 - Spread Operator Array Allocation Overhead
**Learning:** Using the spread operator (e.g. `[0, ...ranges]`) combined with multiple iteration passes inside performance-critical statistical functions scales poorly and can cause maximum call stack errors for huge datasets.
**Action:** Replace spread operators and chained map/reduce operations with a single-pass loop and a pre-allocated array (`new Array(len)`) to drastically reduce overhead.
