
const SPC = require('./js/spc.js');

const dataSize = 1000000;
const data = new Array(dataSize).fill(0).map(() => Math.random() * 100);

console.log(`Benchmarking with ${dataSize} elements...`);

// Benchmarking Mean
console.time('SPC.mean (reduce)');
for(let i=0; i<100; i++) {
    SPC.mean(data);
}
console.timeEnd('SPC.mean (reduce)');


// Define optimized mean
function meanOptimized(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

console.time('meanOptimized (for loop)');
for(let i=0; i<100; i++) {
    meanOptimized(data);
}
console.timeEnd('meanOptimized (for loop)');


// Benchmarking StdDev
console.time('SPC.stdDev (reduce)');
for(let i=0; i<100; i++) {
    SPC.stdDev(data);
}
console.timeEnd('SPC.stdDev (reduce)');

function stdDevOptimized(arr, isSample = true, preCalculatedMean = null) {
    const m = preCalculatedMean !== null ? preCalculatedMean : meanOptimized(arr);
    let sumSq = 0;
    for (let i = 0; i < arr.length; i++) {
        const diff = arr[i] - m;
        sumSq += diff * diff;
    }
    return Math.sqrt(sumSq / (arr.length - (isSample ? 1 : 0)));
}

console.time('stdDevOptimized (for loop)');
for(let i=0; i<100; i++) {
    stdDevOptimized(data);
}
console.timeEnd('stdDevOptimized (for loop)');
