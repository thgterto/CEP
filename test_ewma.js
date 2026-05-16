const SPC = require('./js/spc.js');
const assert = require('assert');

function originalEWMA(data, lambda = 0.2) {
    const mean = SPC.mean(data);
    const std = SPC.stdDev(data, true, mean);

    const z = [mean];
    const ucl = [], lcl = [];
    const L = 3;

    for (let i = 0; i < data.length; i++) {
        const zi = lambda * data[i] + (1 - lambda) * z[i];
        z.push(zi);

        const sigmaZ = std * Math.sqrt((lambda / (2 - lambda)) * (1 - Math.pow(1 - lambda, 2 * (i + 1))));
        ucl.push(mean + L * sigmaZ);
        lcl.push(mean - L * sigmaZ);
    }
    z.shift();

    return {
        charts: [
            { type: 'EWMA', data: z, cl: mean, uclArray: ucl, lclArray: lcl, name: 'EWMA' }
        ],
        stats: { mean, sigma: std }
    };
}

function optimizedEWMA(data, lambda = 0.2) {
    const len = data.length;
    const mean = SPC.mean(data);
    const std = SPC.stdDev(data, true, mean);

    const z = new Array(len);
    const ucl = new Array(len);
    const lcl = new Array(len);
    const L = 3;

    const oneMinusLambda = 1 - lambda;
    const multiplier = lambda / (2 - lambda);
    const baseSq = oneMinusLambda * oneMinusLambda;
    let currentPow = 1;
    let prevZ = mean;

    for (let i = 0; i < len; i++) {
        const zi = lambda * data[i] + oneMinusLambda * prevZ;
        z[i] = zi;
        prevZ = zi;

        currentPow *= baseSq;
        const sigmaZ = std * Math.sqrt(multiplier * (1 - currentPow));
        const margin = L * sigmaZ;
        ucl[i] = mean + margin;
        lcl[i] = mean - margin;
    }

    return {
        charts: [
            { type: 'EWMA', data: z, cl: mean, uclArray: ucl, lclArray: lcl, name: 'EWMA' }
        ],
        stats: { mean, sigma: std }
    };
}

const testData = [10, 12, 11, 14, 15, 13, 11, 14, 16, 15];
const orig = originalEWMA(testData);
const opt = optimizedEWMA(testData);

// To avoid deep strict equal failing on tiny float differences, let's round
function roundTo(num, decimals) {
    return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals);
}

function recursiveRound(obj, decimals) {
    if (typeof obj === 'number') return roundTo(obj, decimals);
    if (Array.isArray(obj)) return obj.map(val => recursiveRound(val, decimals));
    if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (const key in obj) {
            newObj[key] = recursiveRound(obj[key], decimals);
        }
        return newObj;
    }
    return obj;
}

assert.deepStrictEqual(recursiveRound(orig, 6), recursiveRound(opt, 6), "Outputs do not match!");

// Benchmarking
const largeData = Array.from({length: 100000}, () => Math.random() * 100);

console.time('Original');
for (let i = 0; i < 50; i++) originalEWMA(largeData);
console.timeEnd('Original');

console.time('Optimized');
for (let i = 0; i < 50; i++) optimizedEWMA(largeData);
console.timeEnd('Optimized');

console.log("Success!");
