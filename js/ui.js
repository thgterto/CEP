const UI = {
    // --- Layout ---
    toggleSidebar: () => {
        if (window.innerWidth < 1024) {
            document.body.classList.toggle('show-sidebar');
            // Close panel if open to prevent overlap on small screens
            if (document.body.classList.contains('show-sidebar')) {
                document.body.classList.remove('show-panel');
            }
        } else {
            document.body.classList.toggle('hide-sidebar');
        }
    },

    togglePanel: () => {
        if (window.innerWidth < 1024) {
            document.body.classList.toggle('show-panel');
             // Close sidebar if open
             if (document.body.classList.contains('show-panel')) {
                document.body.classList.remove('show-sidebar');
            }
        } else {
            document.body.classList.toggle('hide-panel');
        }
    },

    // --- Render Charts ---
    renderCharts: (spcResult, labels = null) => {
        const container = document.getElementById('charts-container');
        container.innerHTML = '';

        spcResult.charts.forEach((chart, idx) => {
            const div = document.createElement('div');
            div.className = 'chart-card';
            div.id = 'chart-' + idx;
            container.appendChild(div);

            const traces = [];

            // Main Data Trace
            const traceData = {
                y: chart.data,
                type: 'scatter',
                mode: 'lines+markers',
                name: chart.type === 'CUSUM' ? 'C+' : (chart.name.includes('Data') ? 'Data' : 'Dados'),
                line: { color: '#118186', width: 2 },
                marker: {
                    color: '#0D666A',
                    size: 8,
                    line: { color: '#ffffff', width: 1 }
                }
            };

            if (labels && labels.length === chart.data.length) {
                traceData.text = labels;
                traceData.hovertemplate = '<b>%{text}</b><br>Valor: %{y:.2f}<extra></extra>';
            }

            traces.push(traceData);

            // CUSUM Negative Trace
            if (chart.data2) {
                const traceData2 = {
                    y: chart.data2,
                    type: 'scatter',
                    mode: 'lines+markers',
                    name: 'C-',
                    line: { color: '#2AA8CE', width: 2, dash: 'dot' },
                    marker: {
                        color: '#228AB0',
                        size: 8,
                        symbol: 'diamond',
                        line: { color: '#ffffff', width: 1 }
                    }
                };
                if (labels && labels.length === chart.data2.length) {
                    traceData2.text = labels;
                    traceData2.hovertemplate = '<b>%{text}</b><br>Valor: %{y:.2f}<extra></extra>';
                }
                traces.push(traceData2);
            }

            if (chart.cl !== null) {
                traces.push({
                    y: Array(chart.data.length).fill(chart.cl),
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Média',
                    line: { color: '#118186', dash: 'dash', width: 1 },
                    hoverinfo: 'none'
                });
            }

            if (chart.ucl !== null && chart.lcl !== null && chart.cl !== null) {
                const uclData = Array.isArray(chart.uclArray) ? chart.uclArray : Array(chart.data.length).fill(chart.ucl);
                const lclData = Array.isArray(chart.lclArray) ? chart.lclArray : Array(chart.data.length).fill(chart.lcl);

                traces.push({
                    y: uclData,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'LCS',
                    line: { color: '#D34041', dash: 'dash', width: 1 },
                    hoverinfo: 'none'
                });

                traces.push({
                    y: lclData,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'LCI',
                    line: { color: '#D34041', dash: 'dash', width: 1 },
                    hoverinfo: 'none'
                });

                // Segmentation (Zones)
                if (!Array.isArray(chart.uclArray)) {
                    const sigma = (chart.ucl - chart.cl) / 3;
                    if (sigma > 0) {
                        const plus1 = chart.cl + sigma;
                        const plus2 = chart.cl + 2 * sigma;
                        const minus1 = chart.cl - sigma;
                        const minus2 = chart.cl - 2 * sigma;

                        const zoneLine = { color: '#e0e0e0', dash: 'dot', width: 1 };

                        [plus1, plus2, minus1, minus2].forEach(yVal => {
                            traces.push({
                                y: Array(chart.data.length).fill(yVal),
                                type: 'scatter',
                                mode: 'lines',
                                name: 'Zona',
                                showlegend: false,
                                line: zoneLine,
                                hoverinfo: 'none'
                            });
                        });
                    }
                }
            } else {
                 if (chart.ucl !== null) {
                    const uclData = Array.isArray(chart.uclArray) ? chart.uclArray : Array(chart.data.length).fill(chart.ucl);
                    traces.push({ y: uclData, type: 'scatter', mode: 'lines', name: 'LCS', line: { color: '#D34041', dash: 'dash', width: 1 } });
                 }
                 if (chart.lcl !== null) {
                    const lclData = Array.isArray(chart.lclArray) ? chart.lclArray : Array(chart.data.length).fill(chart.lcl);
                    traces.push({ y: lclData, type: 'scatter', mode: 'lines', name: 'LCI', line: { color: '#D34041', dash: 'dash', width: 1 } });
                 }
            }

            const layout = {
                title: {
                    text: chart.name,
                    font: { size: 18, color: '#212928', family: 'IBM Plex Sans, sans-serif' }
                },
                font: { family: 'IBM Plex Sans, sans-serif' },
                margin: { t: 60, b: 40, l: 60, r: 40, autoexpand: true },
                showlegend: true,
                legend: {
                    orientation: 'h',
                    y: 1.1,
                    x: 0.5,
                    xanchor: 'center',
                    bgcolor: 'rgba(255,255,255,0.5)'
                },
                xaxis: {
                    showgrid: true,
                    gridcolor: '#f0f0f0',
                    zeroline: false
                },
                yaxis: {
                    showgrid: true,
                    gridcolor: '#f0f0f0',
                    zeroline: false
                },
                hoverlabel: {
                    bgcolor: 'white',
                    font: { size: 14, family: 'IBM Plex Sans, sans-serif' },
                    bordercolor: '#DBE3EC'
                }
            };

            Plotly.newPlot(div, traces, layout, { responsive: true, displayModeBar: false });
        });
    },

    // --- Render Stats ---
    renderStats: (stats) => {
        const container = document.getElementById('stats-content');
        let html = '';
        const addItem = (label, value, precision=2) => {
            if (value !== undefined && value !== null) {
                const valStr = (Array.isArray(value) ? value.join(', ') : (typeof value === 'number' ? value.toFixed(precision) : value));
                html += `<div class="stat-item"><span>${label}</span><strong>${valStr}</strong></div>`;
            }
        };

        addItem('N', stats.count, 0);
        addItem('Média (μ)', stats.mean);
        addItem('Mediana', stats.median);
        addItem('Moda', (Array.isArray(stats.mode) && stats.mode.length > 3) ? 'Múltipla' : stats.mode);
        addItem('Desvio (σ)', stats.sigma !== undefined ? stats.sigma : stats.stdDev, 3);
        addItem('Mínimo', stats.min);
        addItem('Máximo', stats.max);
        addItem('Amplitude', stats.range);
        addItem('Variância', stats.variance);
        addItem('CV (%)', stats.cv);
        addItem('Assimetria', stats.skewness, 3);
        addItem('Curtose', stats.kurtosis, 3);
        addItem('Q1', stats.q1);
        addItem('Q3', stats.q3);
        addItem('IQR', stats.iqr);

        container.innerHTML = html;
    },

    renderCapability: (cap) => {
        const container = document.getElementById('capability-content');
        if (!cap.Cpk && !cap.Cp) {
            container.innerHTML = '<div class="stat-item" style="grid-column: span 2"><span>Defina Limites (LSL/USL) para calcular Cpk</span></div>';
            return;
        }

        let html = '';
        if (cap.Cp) html += `<div class="stat-item"><span>Cp</span><strong>${cap.Cp.toFixed(2)}</strong></div>`;
        if (cap.Cpk) {
            const color = cap.Cpk < 1 ? 'red' : (cap.Cpk < 1.33 ? 'orange' : 'green');
            html += `<div class="stat-item" style="color: ${color}"><span>Cpk</span><strong>${cap.Cpk.toFixed(2)}</strong></div>`;
        }
        if (cap.Pp) html += `<div class="stat-item"><span>Pp</span><strong>${cap.Pp.toFixed(2)}</strong></div>`;
        if (cap.Ppk) html += `<div class="stat-item"><span>Ppk</span><strong>${cap.Ppk.toFixed(2)}</strong></div>`;

        container.innerHTML = html;

        // Update Header KPI
        const kpiCpk = document.getElementById('kpi-cpk');
        kpiCpk.innerText = cap.Cpk ? cap.Cpk.toFixed(2) : '-';
        kpiCpk.style.color = cap.Cpk < 1 ? 'var(--col-danger)' : (cap.Cpk < 1.33 ? 'var(--col-warning)' : 'var(--col-success)');
    },

    // --- Logs ---
    renderLog: (violations, notes = {}) => {
        const container = document.getElementById('violation-log');
        const badge = document.getElementById('violation-count');
        const headerBadge = document.getElementById('kpi-violations');

        badge.innerText = violations.length;
        headerBadge.innerText = violations.length;

        if (violations.length === 0) {
            container.innerHTML = '<div style="padding:20px; text-align:center; color:#ccc;">Nenhuma violação detectada.</div>';
            return;
        }

        container.innerHTML = violations.map(v => {
            const hasNote = notes[v.index] && (notes[v.index].cause || notes[v.index].action);
            return `
            <div class="log-item critical" onclick="App.openNote(${v.index})" role="button" tabindex="0" onkeypress="if(event.key==='Enter') App.openNote(${v.index})">
                <div class="log-content">
                    <div class="log-header">
                        <span>#${v.index + 1} ${hasNote ? '📝' : ''}</span>
                        <span>${v.value.toFixed(2)}</span>
                    </div>
                    <div class="log-detail">${v.rule}: ${v.text}</div>
                </div>
            </div>
        `}).join('');
    },

    // --- Modals ---
    lastFocusedElement: null,

    openModal: (title, contentHTML) => {
        UI.lastFocusedElement = document.activeElement;

        const overlay = document.getElementById('modal-overlay');
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-body').innerHTML = contentHTML;

        overlay.classList.remove('hidden');

        // Trap Focus Logic
        const focusableElements = overlay.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            firstElement.focus();

            overlay.onkeydown = (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) { /* shift + tab */
                        if (document.activeElement === firstElement) {
                            lastElement.focus();
                            e.preventDefault();
                        }
                    } else { /* tab */
                        if (document.activeElement === lastElement) {
                            firstElement.focus();
                            e.preventDefault();
                        }
                    }
                } else if (e.key === 'Escape') {
                    UI.closeModal();
                }
            };
        }
    },

    closeModal: () => {
        const overlay = document.getElementById('modal-overlay');
        overlay.classList.add('hidden');
        overlay.onkeydown = null; // Clear listener

        if (UI.lastFocusedElement) {
            UI.lastFocusedElement.focus();
        }
    }
};

window.toggleSidebar = UI.toggleSidebar;
window.togglePanel = UI.togglePanel;
