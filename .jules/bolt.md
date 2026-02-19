## 2026-02-19 - Loop Optimization
**Learning:** `for` loops are significantly faster (>10x) than `Array.reduce` for simple summation and standard deviation calculations in Node.js v22.
**Action:** Use `for` loops in hot paths where performance is critical, especially for large datasets.

## 2026-02-19 - Broken package.json
**Learning:** `package.json` contains literal `\n` characters, making it invalid JSON. This breaks `npm` and `node` module resolution for scripts in the root.
**Action:** Be aware that standard node tooling might fail unless `package.json` is fixed or ignored.
