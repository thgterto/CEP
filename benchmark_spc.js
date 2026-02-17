const SPC = require('./js/spc.js');

const DATA_SIZE = 1000000; // 1 million points
const data = new Array(DATA_SIZE).fill(0).map(() => Math.random() * 100);

console.log(`Benchmarking SPC with ${DATA_SIZE} data points...`);

// Bench mean
const startMean = process.hrtime();
const mean = SPC.mean(data);
const endMean = process.hrtime(startMean);
const timeMean = endMean[0] * 1000 + endMean[1] / 1e6;
console.log(`Mean: ${mean.toFixed(4)} | Time: ${timeMean.toFixed(2)}ms`);

// Bench stdDev
const startStd = process.hrtime();
const std = SPC.stdDev(data);
const endStd = process.hrtime(startStd);
const timeStd = endStd[0] * 1000 + endStd[1] / 1e6;
console.log(`StdDev: ${std.toFixed(4)} | Time: ${timeStd.toFixed(2)}ms`);
