const SPC = {
    // Constants for Control Charts (from AIAG)
    CONSTANTS: {
        d2: { 2: 1.128, 3: 1.693, 4: 2.059, 5: 2.326, 6: 2.534, 7: 2.704, 8: 2.847, 9: 2.970, 10: 3.078 },
        A2: { 2: 1.880, 3: 1.023, 4: 0.729, 5: 0.577, 6: 0.483, 7: 0.419, 8: 0.373, 9: 0.337, 10: 0.308 },
        D3: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0.076, 8: 0.136, 9: 0.184, 10: 0.223 },
        D4: { 2: 3.267, 3: 2.574, 4: 2.282, 5: 2.114, 6: 2.004, 7: 1.924, 8: 1.864, 9: 1.816, 10: 1.777 },
        c4: { 2: 0.7979, 3: 0.8862, 4: 0.9213, 5: 0.9400, 6: 0.9515, 7: 0.9594, 8: 0.9650, 9: 0.9693, 10: 0.9727, 11: 0.9754, 12: 0.9776, 13: 0.9794, 14: 0.9810, 15: 0.9823, 16: 0.9835, 17: 0.9845, 18: 0.9854, 19: 0.9862, 20: 0.9869, 21: 0.9876, 22: 0.9882, 23: 0.9887, 24: 0.9892, 25: 0.9896 },
        B3: { 2: 0.000, 3: 0.000, 4: 0.000, 5: 0.000, 6: 0.030, 7: 0.118, 8: 0.185, 9: 0.239, 10: 0.284, 11: 0.321, 12: 0.354, 13: 0.382, 14: 0.406, 15: 0.428, 16: 0.448, 17: 0.466, 18: 0.482, 19: 0.497, 20: 0.510, 21: 0.523, 22: 0.534, 23: 0.545, 24: 0.555, 25: 0.565 },
        B4: { 2: 3.267, 3: 2.568, 4: 2.266, 5: 2.089, 6: 1.970, 7: 1.882, 8: 1.815, 9: 1.761, 10: 1.716, 11: 1.679, 12: 1.646, 13: 1.618, 14: 1.594, 15: 1.572, 16: 1.552, 17: 1.534, 18: 1.518, 19: 1.503, 20: 1.490, 21: 1.477, 22: 1.466, 23: 1.455, 24: 1.445, 25: 1.435 },
        A3: { 2: 2.659, 3: 1.954, 4: 1.628, 5: 1.427, 6: 1.287, 7: 1.182, 8: 1.099, 9: 1.032, 10: 0.975, 11: 0.927, 12: 0.886, 13: 0.850, 14: 0.817, 15: 0.789, 16: 0.763, 17: 0.739, 18: 0.718, 19: 0.698, 20: 0.680, 21: 0.663, 22: 0.647, 23: 0.633, 24: 0.619, 25: 0.606 }
    },

    // --- Helpers ---
    // Optimization: Using for-loop instead of reduce for better performance on large datasets (~13x faster)
    mean: (arr) => {
        let sum = 0;
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            sum += arr[i];
        }
        return sum / len;
    },

    stdDev: (arr, isSample = true, preCalculatedMean = null) => {
        const m = preCalculatedMean !== null ? preCalculatedMean : SPC.mean(arr);
        let sumSq = 0;
        const len = arr.length;
        // Optimization: Using for-loop avoids closure overhead and is significantly faster
        for (let i = 0; i < len; i++) {
            const diff = arr[i] - m;
            sumSq += diff * diff;
        }
        return Math.sqrt(sumSq / (len - (isSample ? 1 : 0)));
    },

    // --- Chart Calculations ---

    computeIMR: (data) => {
        const len = data.length;
        // Optimization: Avoid spread operator `[0, ...ranges]` and reduce memory allocations
        // Pre-allocate array and compute inline.
        const mrData = new Array(len);

        let sumRanges = 0;
        if (len > 0) {
            mrData[0] = 0;
            for (let i = 1; i < len; i++) {
                const r = Math.abs(data[i] - data[i-1]);
                mrData[i] = r;
                sumRanges += r;
            }
        }

        const meanX = SPC.mean(data);
        const meanR = len > 1 ? sumRanges / (len - 1) : 0;

        // Limits for I Chart
        const uclX = meanX + 2.66 * meanR;
        const lclX = meanX - 2.66 * meanR;

        // Limits for MR Chart
        const uclR = 3.27 * meanR;
        const lclR = 0;

        return {
            charts: [
                { type: 'I', data: data, cl: meanX, ucl: uclX, lcl: lclX, name: 'Individual' },
                { type: 'MR', data: mrData, cl: meanR, ucl: uclR, lcl: lclR, name: 'Moving Range' }
            ],
            stats: { mean: meanX, sigma: meanR / 1.128 } // d2 for n=2 is 1.128
        };
    },

    computeXbarR: (data, n = 5) => {
        if (n < 2 || n > 10) return { error: "Tamanho de subgrupo deve ser entre 2 e 10 para X-R. Para subgrupos maiores, utilize X-S." };

        const len = data.length;
        const numGroups = Math.floor(len / n);

        if (numGroups === 0) return { error: "Dados insuficientes para formar um subgrupo." };

        // Optimization: Pre-allocate arrays and calculate directly to avoid slice(), map(), and spreads
        const xbars = new Array(numGroups);
        const ranges = new Array(numGroups);

        for (let i = 0; i < numGroups; i++) {
            const start = i * n;
            let sum = 0;
            let min = data[start];
            let max = data[start];

            for (let j = 0; j < n; j++) {
                const val = data[start + j];
                sum += val;
                if (val < min) min = val;
                if (val > max) max = val;
            }

            xbars[i] = sum / n;
            ranges[i] = max - min;
        }

        const xdbar = SPC.mean(xbars);
        const rbar = SPC.mean(ranges);

        const A2 = SPC.CONSTANTS.A2[n];
        const D4 = SPC.CONSTANTS.D4[n];
        const D3 = SPC.CONSTANTS.D3[n];
        const d2 = SPC.CONSTANTS.d2[n];

        return {
            charts: [
                { type: 'Xbar', data: xbars, cl: xdbar, ucl: xdbar + A2 * rbar, lcl: xdbar - A2 * rbar, name: 'Média (X̄)' },
                { type: 'R', data: ranges, cl: rbar, ucl: D4 * rbar, lcl: D3 * rbar, name: 'Amplitude (R)' }
            ],
            stats: { mean: xdbar, sigma: rbar / d2 }
        };
    },

    computeXbarS: (data, n = 5) => {
         if (n < 2 || n > 25) return { error: "Tamanho de subgrupo deve ser entre 2 e 25 para X-S." };

        const len = data.length;
        const numGroups = Math.floor(len / n);

        if (numGroups === 0) return { error: "Dados insuficientes para formar um subgrupo." };

        // Optimization: Pre-allocate arrays and calculate directly to avoid slice() and map()
        const xbars = new Array(numGroups);
        const sigmas = new Array(numGroups);

        for (let i = 0; i < numGroups; i++) {
            const start = i * n;
            let sum = 0;

            for (let j = 0; j < n; j++) {
                sum += data[start + j];
            }

            const mean = sum / n;
            xbars[i] = mean;

            let sumSq = 0;
            for (let j = 0; j < n; j++) {
                const diff = data[start + j] - mean;
                sumSq += diff * diff;
            }
            sigmas[i] = Math.sqrt(sumSq / (n - 1));
        }

        const xdbar = SPC.mean(xbars);
        const sbar = SPC.mean(sigmas);

        const A3 = SPC.CONSTANTS.A3[n];
        const B4 = SPC.CONSTANTS.B4[n];
        const B3 = SPC.CONSTANTS.B3[n];
        const c4 = SPC.CONSTANTS.c4[n];

        return {
            charts: [
                { type: 'Xbar', data: xbars, cl: xdbar, ucl: xdbar + A3 * sbar, lcl: xdbar - A3 * sbar, name: 'Média (X̄)' },
                { type: 'S', data: sigmas, cl: sbar, ucl: B4 * sbar, lcl: B3 * sbar, name: 'Desvio Padrão (S)' }
            ],
            stats: { mean: xdbar, sigma: sbar / c4 }
        };
    },

    computeCUSUM: (data, target = null, sigma = null) => {
        const mean = target !== null ? target : SPC.mean(data);
        const std = sigma !== null ? sigma : SPC.stdDev(data);
        const k = 0.5 * std;
        const h = 5 * std;

        let cPos = [0];
        let cNeg = [0];

        for (let i = 0; i < data.length; i++) {
            const xi = data[i];
            const cp = Math.max(0, xi - (mean + k) + cPos[i]);
            const cn = Math.min(0, xi - (mean - k) + cNeg[i]);
            cPos.push(cp);
            cNeg.push(cn);
        }
        cPos.shift(); // remove initial 0
        cNeg.shift();

        return {
            charts: [
                { type: 'CUSUM', data: cPos, data2: cNeg, cl: 0, ucl: h, lcl: -h, name: 'CUSUM' }
            ],
            stats: { mean, sigma: std }
        };
    },

    computeEWMA: (data, lambda = 0.2) => {
        const mean = SPC.mean(data);
        const std = SPC.stdDev(data, true, mean);

        const z = [mean]; // Start with process mean
        const ucl = [], lcl = [];
        const L = 3;

        for (let i = 0; i < data.length; i++) {
            const zi = lambda * data[i] + (1 - lambda) * z[i];
            z.push(zi);

            const sigmaZ = std * Math.sqrt((lambda / (2 - lambda)) * (1 - Math.pow(1 - lambda, 2 * (i + 1))));
            ucl.push(mean + L * sigmaZ);
            lcl.push(mean - L * sigmaZ);
        }
        z.shift(); // remove initial mean, alignment

        return {
            charts: [
                { type: 'EWMA', data: z, cl: mean, uclArray: ucl, lclArray: lcl, name: 'EWMA' }
            ],
            stats: { mean, sigma: std }
        };
    },

    computeRunChart: (data) => {
        const median = data.slice().sort((a,b) => a-b)[Math.floor(data.length/2)];
        return {
             charts: [
                { type: 'Run', data: data, cl: median, ucl: null, lcl: null, name: 'Run Chart (Mediana)' }
            ],
            stats: { mean: median, sigma: 0 }
        };
    },

    // --- Descriptive Statistics ---

    calculateDescriptiveStats: (data) => {
        if (!data || data.length === 0) return {};
        const j = jStat(data);
        return {
            count: data.length,
            mean: j.mean(),
            median: j.median(),
            mode: j.mode(),
            min: j.min(),
            max: j.max(),
            range: j.range(),
            variance: j.variance(),
            stdDev: j.stdev(true),
            skewness: j.skewness(),
            kurtosis: j.kurtosis(),
            q1: j.quartiles()[0],
            q3: j.quartiles()[2],
            iqr: j.quartiles()[2] - j.quartiles()[0],
            cv: (j.stdev(true) / j.mean()) * 100
        };
    },

    // --- Anomaly Detection ---

    detectViolations: (chartData) => {
        // chartData: { data: [], ucl, lcl, cl, sigma? }
        const { data, ucl, lcl, cl } = chartData;
        const violations = [];
        const sigma = (ucl - cl) / 3;

        let countR2 = 0;
        let signR2 = 0;

        let countR3 = 0;
        let signR3 = 0;

        for (let i = 0; i < data.length; i++) {
            const v = data[i];

            // R1: 1 point beyond 3 sigma (UCL/LCL)
            if (v > ucl || v < lcl) {
                violations.push({ index: i, value: v, rule: "R1", text: "Fora de Controle (3σ)" });
            }

            // R2: 9 points on one side of CL
            const sR2 = Math.sign(v - cl);
            if (sR2 === signR2) {
                countR2++;
            } else {
                signR2 = sR2;
                countR2 = 1;
            }
            if (countR2 >= 9) {
                violations.push({ index: i, value: v, rule: "R2", text: "9+ pontos de um lado da média" });
            }

            // R3: 6 points increasing or decreasing
            if (i > 0) {
                 const diff = v - data[i-1];
                 const sR3 = Math.sign(diff);
                 if (sR3 === signR3 && sR3 !== 0) {
                     countR3++;
                 } else {
                     signR3 = sR3;
                     countR3 = 1;
                 }
                 if (countR3 >= 5) { // 5 intervals = 6 points
                     violations.push({ index: i, value: v, rule: "R3", text: "6+ pontos em tendência" });
                 }
            }
        }

        return violations;
    },

    // --- Capability ---

    computeCapability: (data, usl, lsl, sigmaST) => {
        const mu = SPC.mean(data);
        const sigmaLT = SPC.stdDev(data, true); // Total Standard Deviation

        const result = {
            mean: mu,
            sigmaST,
            sigmaLT
        };

        // Cp / Cpk (using Short Term Sigma)
        if (sigmaST > 0) {
             if (usl !== null && lsl !== null) {
                 result.Cp = (usl - lsl) / (6 * sigmaST);
                 result.Cpk = Math.min((usl - mu) / (3 * sigmaST), (mu - lsl) / (3 * sigmaST));
             } else if (usl !== null) {
                 result.Cpk = (usl - mu) / (3 * sigmaST); // CPU
             } else if (lsl !== null) {
                 result.Cpk = (mu - lsl) / (3 * sigmaST); // CPL
             }
        }

        // Pp / Ppk (using Long Term Sigma)
        if (sigmaLT > 0) {
            if (usl !== null && lsl !== null) {
                 result.Pp = (usl - lsl) / (6 * sigmaLT);
                 result.Ppk = Math.min((usl - mu) / (3 * sigmaLT), (mu - lsl) / (3 * sigmaLT));
             }
        }

        return result;
    }
};

// If using Node.js for testing, export the module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SPC;
}
