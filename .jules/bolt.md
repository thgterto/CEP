
## 2024-11-20 - Pre-allocating Arrays in Tight Loops
**Learning:** In hot statistical paths (like `computeCUSUM` and `computeEWMA`), relying on array `push()` and `shift()` causes dynamic array resizing and unnecessary re-allocations that severely hurt performance.
**Action:** When working on array-heavy computational loops, explicitly declare the array size upfront (`new Array(len)`) and assign values by index. Also cache repetitive calculations (like `mean + k`) into variables outside the loop.
