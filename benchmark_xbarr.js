const SPC = require('./js/spc.js');

const data = Array.from({length: 1000000}, () => Math.random() * 100);

console.time('computeXbarR_original');
SPC.computeXbarR(data, 5);
console.timeEnd('computeXbarR_original');
