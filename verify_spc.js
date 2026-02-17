const SPC = require('./js/spc.js');

function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}

function assertClose(actual, expected, tolerance = 1e-9, message) {
    if (Math.abs(actual - expected) > tolerance) {
        throw new Error(`Assertion failed: ${message}. Expected ${expected}, got ${actual}`);
    }
}

console.log('Running verification tests...');

// Test Case 1: Simple array
const data1 = [1, 2, 3, 4, 5];
const mean1 = SPC.mean(data1);
assertClose(mean1, 3, 1e-9, 'Mean of [1..5]');

const stdSample1 = SPC.stdDev(data1, true); // Sample
// Variance: ((1-3)^2 + ... + (5-3)^2) / 4 = (4+1+0+1+4)/4 = 10/4 = 2.5. Sqrt(2.5) ~= 1.58113883
assertClose(stdSample1, Math.sqrt(2.5), 1e-9, 'StdDev Sample of [1..5]');

const stdPop1 = SPC.stdDev(data1, false); // Population
// Variance: 10/5 = 2. Sqrt(2) ~= 1.41421356
assertClose(stdPop1, Math.sqrt(2), 1e-9, 'StdDev Pop of [1..5]');

// Test Case 2: Constant array
const data2 = [10, 10, 10];
assertClose(SPC.mean(data2), 10, 1e-9, 'Mean of [10,10,10]');
assertClose(SPC.stdDev(data2, true), 0, 1e-9, 'StdDev Sample of [10,10,10]');
assertClose(SPC.stdDev(data2, false), 0, 1e-9, 'StdDev Pop of [10,10,10]');

// Test Case 3: Empty array
const data3 = [];
const mean3 = SPC.mean(data3);
assert(Number.isNaN(mean3), 'Mean of empty array should be NaN');

const stdSample3 = SPC.stdDev(data3, true);
// Depending on implementation, might be 0 or NaN.
// Current implementation: sumSq=0, div by -1 => 0. Sqrt(0) => 0.
// Wait, actually 0 / -1 is -0. Sqrt(-0) is -0 (which is 0).
assert(stdSample3 === 0 || Number.isNaN(stdSample3), 'StdDev Sample of empty array');

const stdPop3 = SPC.stdDev(data3, false);
// sumSq=0, div by 0 => NaN.
assert(Number.isNaN(stdPop3), 'StdDev Pop of empty array should be NaN');

// Test Case 4: Single element
const data4 = [42];
assertClose(SPC.mean(data4), 42, 1e-9, 'Mean of [42]');

const stdSample4 = SPC.stdDev(data4, true);
// sumSq=0, div by 0 => NaN.
assert(Number.isNaN(stdSample4), 'StdDev Sample of single element should be NaN');

const stdPop4 = SPC.stdDev(data4, false);
// sumSq=0, div by 1 => 0. Sqrt(0) => 0.
assertClose(stdPop4, 0, 1e-9, 'StdDev Pop of single element should be 0');

console.log('All verification tests passed!');
