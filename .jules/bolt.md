
## 2026-02-28 - [Eliminate Array Allocations in Control Charts]
**Learning:** When generating sub-groups for Control Charts (like Xbar-R and Xbar-S), using `array.slice()` and `array.map()` inside a loop introduces a huge hidden cost via intermediate array allocations and garbage collection overhead.
**Action:** Replace `data.slice(i, i+n)` and subsequent `.map()` calls with direct `for` loops iterating over the main data array by index to compute subset statistics inline. This simple loop restructuring yields a 6x to 8x speedup and significantly reduces memory pressure.
