## 2024-05-22 - [Optimizing SPC Calculations]
**Learning:** `Array.prototype.reduce` is significantly slower (>10x) than a simple `for` loop for large datasets in this Node.js environment.
**Action:** Prefer `for` loops for hot-path statistical calculations involving large arrays.

## 2024-05-22 - [Package.json Encoding]
**Learning:** The `package.json` file had issues (likely encoding or newlines) preventing `npm` or `node` from running.
**Action:** Ensure `package.json` is valid JSON and has correct encoding.
