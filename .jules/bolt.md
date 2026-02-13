## 2026-02-13 - [SPC Calculation Optimization]
**Learning:** `Array.prototype.reduce` carries significant overhead in V8 for large arrays compared to simple `for` loops. Replacing `reduce` with `for` loops in critical path calculations (`mean`, `stdDev`) yielded an ~8x speedup (2100ms -> 270ms for 1M items).
**Action:** Prefer `for` loops over `reduce` for performance-critical mathematical aggregations on potentially large datasets.

## 2026-02-13 - [Package.json Corruption]
**Learning:** The `package.json` file in this environment contained literal `\n` characters instead of newlines, causing parsing errors in Node.js.
**Action:** When encountering "Invalid package config" errors, inspect `package.json` with `od -c` to check for hidden formatting issues.
