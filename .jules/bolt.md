## 2026-05-19 - Precision vs Performance in Math Operations
**Learning:** In Node.js v22, replacing repeated `Math.pow(base, 2 * (i + 1))` calls inside hot statistical loops (like `computeEWMA`) with cached incremental multiplication yields a massive speedup (e.g. from 106ms down to 23ms for 10,000 iterations). However, it introduces slight floating-point precision discrepancies that cause strict equality tests (e.g., `assert.deepStrictEqual`) to fail against baseline implementations.
**Action:** When refactoring core mathematical functions that are heavily tested for strict output equality, prioritize algorithmic improvements (like replacing O(N) array shifts with pre-allocated O(1) arrays) over raw math micro-optimizations that alter floating-point evaluation paths, unless permitted to alter precision expectations.

## 2026-05-19 - O(N) Array Operations in Loops
**Learning:** The `computeEWMA` function previously used `.push()` in a loop followed by a final `.shift()` to align data, causing unnecessary garbage collection and an O(N) penalty.
**Action:** Always replace dynamically resized arrays and `shift()` operations with pre-allocated arrays (`new Array(len)`) and direct indexing for hot statistical paths handling large datasets. This provided a ~30% performance boost while remaining perfectly backward compatible.

## 2026-05-19 - Safe Ad-Hoc Git Commands
**Learning:** Running `execSync('git show ...')` from inside an ad-hoc Node.js script located in `/tmp` fails with `fatal: not a git repository` because the Node process's working directory is outside the repo.
**Action:** When extracting baseline files via git for ad-hoc tests, execute the `git show` command directly in a bash session from within the repository root before invoking the Node script.
