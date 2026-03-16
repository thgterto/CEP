
## 2024-05-19 - Safe Math Refactoring in EWMA
**Learning:** When replacing `Math.pow(base, 2 * (i + 1))` with incremental multiplication inside a loop (as done in `computeEWMA`), the accumulator must be initialized to `1` (not the base) and multiplied by `base^2` each iteration to correctly yield even exponents (2, 4, 6...) and avoid mathematical regressions.
**Action:** When unrolling or simplifying exponentiation in loops, meticulously double-check the initial condition to ensure the first iteration produces the exact same exponent as the original `Math.pow` expression.
