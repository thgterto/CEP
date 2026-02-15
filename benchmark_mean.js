const { performance } = require('perf_hooks');

const arr = Array.from({ length: 1000000 }, () => Math.random());

function meanReduce(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function meanFor(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
}

// Warmup
meanReduce(arr);
meanFor(arr);

const startReduce = performance.now();
for (let i = 0; i < 100; i++) meanReduce(arr);
const endReduce = performance.now();

const startFor = performance.now();
for (let i = 0; i < 100; i++) meanFor(arr);
const endFor = performance.now();

console.log(`Reduce: ${(endReduce - startReduce).toFixed(3)}ms`);
console.log(`For: ${(endFor - startFor).toFixed(3)}ms`);
