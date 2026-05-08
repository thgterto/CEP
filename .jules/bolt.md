
## $(date +%Y-%m-%d) - Avoiding Array Allocation and Math.pow in Hot Loops
**Learning:** In V8 and Node.js v22 environments, using \`Math.pow(base, 2 * (i + 1))\` inside tight statistical loops, along with using \`.push()\`/\`.shift()\` on unallocated arrays, introduces high memory allocation and garbage collection overhead which slows calculation by ~3x.
**Action:** Replace \`Math.pow(base, 2 * (i + 1))\` with cached incremental multipliers (e.g., \`currentPow *= baseSq\`) and explicitly pre-allocate arrays (\`new Array(size)\`) instead of pushing, to achieve significant performance gains on mathematical calculations like EWMA.
