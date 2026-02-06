const App = {
    state: {
        data: [],
        labels: [],
        stats: null,
        violations: [],
        chartType: 'imr',
        notes: {}, // { index: { cause: '', action: '' } }
        currentNoteIndex: null
    },

    init: () => {
        console.log("CEP PRO Initialized");
        // Initialize Tooltips
        if (typeof tippy !== 'undefined') {
            tippy('[data-tippy-content]');
        }
    },

    // --- Data Inputs ---

    loadDemo: () => {
        const { values, labels } = Utils.generateDemoData();
        App.state.data = values;
        App.state.labels = labels;
        App.state.notes = {}; // Reset notes
        App.calculate();
    },

    loadPaste: () => {
        const text = document.getElementById('paste-area').value;
        const { values, labels } = Utils.parsePaste(text);
        if (values.length < 2) {
            alert("Por favor, insira pelo menos 2 valores numéricos.");
            return;
        }
        App.state.data = values;
        App.state.labels = labels;
        App.state.notes = {};
        App.calculate();
    },

    loadExcel: () => {
        const fileInput = document.getElementById('file-upload');
        const file = fileInput.files[0];
        if (!file) return;

        Utils.readFile(file).then(({ values, labels }) => {
            App.state.data = values;
            App.state.labels = labels;
            App.state.notes = {};
            App.calculate();
        }).catch(err => alert(err));
    },

    // --- Main Calculation Flow ---

    calculate: () => {
        if (!App.state.data || App.state.data.length === 0) {
            alert("Carregue dados primeiro.");
            return;
        }

        const type = document.getElementById('chart-type').value;
        const n = parseInt(document.getElementById('subgroup-size').value) || 5;
        const lsl = parseFloat(document.getElementById('lsl').value) || null;
        const usl = parseFloat(document.getElementById('usl').value) || null;

        App.state.chartType = type;
        document.getElementById('kpi-n').innerText = App.state.data.length;

        // 1. SPC Calculation
        let result;
        switch(type) {
            case 'imr': result = SPC.computeIMR(App.state.data); break;
            case 'xbarr': result = SPC.computeXbarR(App.state.data, n); break;
            case 'xbars': result = SPC.computeXbarS(App.state.data, n); break;
            case 'cusum': result = SPC.computeCUSUM(App.state.data); break;
            case 'ewma': result = SPC.computeEWMA(App.state.data); break;
            case 'run': result = SPC.computeRunChart(App.state.data); break;
        }

        if (result.error) {
            alert(result.error);
            return;
        }

        App.state.stats = result.stats;

        // 2. Anomaly Detection
        const mainChart = result.charts[0];
        const violations = SPC.detectViolations(mainChart);
        App.state.violations = violations;

        // 3. Capability
        const cap = SPC.computeCapability(App.state.data, usl, lsl, result.stats.sigma);

        // 4. Label Aggregation for Charts
        let chartLabels = null;
        if (App.state.labels && App.state.labels.some(l => l !== null)) {
            if (type === 'xbarr' || type === 'xbars') {
                // Aggregate labels for subgroups: Take the label of the first item in the subgroup
                chartLabels = [];
                // The SPC result.charts[0].data contains the xbars.
                // We need to match that length.
                // n is subgroup size.
                // If logic in SPC matches:
                for (let i = 0; i < App.state.data.length; i += n) {
                     if (i + n <= App.state.data.length) {
                         chartLabels.push(App.state.labels[i]);
                     }
                }
            } else {
                // 1-to-1 mapping for I-MR, CUSUM, EWMA, Run
                chartLabels = App.state.labels;
            }
        }

        // 5. Render
        UI.renderCharts(result, chartLabels);
        UI.renderStats(result.stats);
        UI.renderCapability(cap);
        UI.renderLog(violations, App.state.notes);
    },

    // --- Advanced Features ---

    drawPareto: () => {
        const counts = {};
        App.state.violations.forEach(v => {
            counts[v.rule] = (counts[v.rule] || 0) + 1;
        });

        const labels = Object.keys(counts).sort((a,b) => counts[b] - counts[a]);
        const values = labels.map(k => counts[k]);

        if (labels.length === 0) {
            alert("Sem violações para gerar Pareto.");
            return;
        }

        let html = '<div style="display:flex; flex-direction:column; gap:8px;">';
        labels.forEach((label, i) => {
            const pct = (values[i] / App.state.violations.length * 100).toFixed(1);
            html += `
                <div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <strong>${label}</strong>
                        <span>${values[i]} (${pct}%)</span>
                    </div>
                    <div style="background:#eee; height:20px; border-radius:4px; overflow:hidden;">
                        <div style="width:${pct}%; background:var(--col-primary); height:100%;"></div>
                    </div>
                </div>
            `;
        });
        html += '</div>';

        UI.openModal('Pareto de Causas', html);
    },

    drawBoxplot: () => {
         if (!App.state.data.length) return;
         const divId = 'boxplot-modal';
         const html = `<div id="${divId}" style="width:100%; height:400px;"></div>`;
         UI.openModal('Distribuição (Boxplot)', html);

         setTimeout(() => {
             Plotly.newPlot(divId, [{
                 y: App.state.data,
                 type: 'box',
                 name: 'Dados',
                 boxmean: 'sd'
             }], { margin:{t:20,b:20} });
         }, 100);
    },

    drawInsights: () => {
        const findings = [];
        if (App.state.violations.length > 0) findings.push(`${App.state.violations.length} violações detectadas.`);

        const kpi = document.getElementById('kpi-cpk').innerText;
        if (kpi !== '-' && parseFloat(kpi) < 1) findings.push("Processo incapaz (Cpk < 1.0).");

        let html = '<ul>';
        if (findings.length === 0) html += '<li>Processo parece estável.</li>';
        else findings.forEach(f => html += `<li>${f}</li>`);
        html += '</ul>';

        UI.openModal('Insights Automáticos', html);
    },

    // --- Annotations ---

    openNote: (index) => {
        App.state.currentNoteIndex = index;
        const note = App.state.notes[index] || { cause: '', action: '' };

        const html = `
            <div class="input-group">
                <label>Causa Raiz</label>
                <textarea id="note-cause" rows="3">${Utils.escapeHTML(note.cause)}</textarea>
            </div>
            <div class="input-group">
                <label>Ação Corretiva</label>
                <textarea id="note-action" rows="3">${Utils.escapeHTML(note.action)}</textarea>
            </div>
            <button class="btn primary full-width" onclick="App.saveNote()">Salvar Anotação</button>
        `;

        UI.openModal(`Anotação - Ponto #${index + 1}`, html);
    },

    saveNote: () => {
        const index = App.state.currentNoteIndex;
        if (index === null) return;

        const cause = document.getElementById('note-cause').value;
        const action = document.getElementById('note-action').value;

        if (cause || action) {
            App.state.notes[index] = { cause, action };
        } else {
            delete App.state.notes[index];
        }

        App.closeModal(); // from UI but accessible via window or direct
        UI.renderLog(App.state.violations, App.state.notes); // Re-render to show emoji
        App.closeModal();
    },

    closeModal: () => {
        UI.closeModal();
    },

    exportCSV: (type) => {
        if (type === 'violations') {
             // Basic CSV export
             Utils.downloadCSV(App.state.violations, 'cep_violacoes.csv');
        } else {
             // Need to join data + labels if labels exist
             let exportData = App.state.data;
             if (App.state.labels && App.state.labels.some(l => l)) {
                 exportData = App.state.data.map((v, i) => ({
                     Label: App.state.labels[i] || '',
                     Value: v
                 }));
             }
             Utils.downloadCSV(exportData, 'cep_dados.csv');
        }
    },

    exportXLSX: () => {
        if (!App.state.data.length) return;

        // Enhance Export with labels
        let exportData = App.state.data.map((v, i) => ({ Index: i+1, Value: v }));
        if (App.state.labels && App.state.labels.some(l => l)) {
             exportData = App.state.data.map((v, i) => ({
                 Index: i+1,
                 Label: App.state.labels[i] || '',
                 Value: v
             }));
        }

        Utils.exportXLSX(exportData, App.state.violations, App.state.notes, 'cep_analise.xlsx');
    }
};

// Global export
window.App = App;

// File Input Listener
document.getElementById('file-upload').addEventListener('change', App.loadExcel);

App.init();
