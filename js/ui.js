const UI = {
    // --- Layout ---
    toggleSidebar: () => document.body.classList.toggle('hide-sidebar'),
    togglePanel: () => document.body.classList.toggle('hide-panel'),

    // --- Render Charts ---
    renderCharts: (spcResult) => {
        const container = document.getElementById('charts-container');
        container.innerHTML = '';

        spcResult.charts.forEach((chart, idx) => {
            const div = document.createElement('div');
            div.className = 'chart-card';
            div.id = 'chart-' + idx;
            container.appendChild(div);

            const traces = [];

            traces.push({
                y: chart.data,
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Dados',
                line: { color: '#2AA8CE', width: 2 },
                marker: { color: '#118186', size: 6 }
            });

            if (chart.cl !== null) {
                traces.push({
                    y: Array(chart.data.length).fill(chart.cl),
                    type: 'scatter',
                    mode: 'lines',
                    name: 'CL',
                    line: { color: '#118186', dash: 'dash', width: 1 },
                    hoverinfo: 'none'
                });
            }

            if (chart.ucl !== null) {
                const uclData = Array.isArray(chart.uclArray) ? chart.uclArray : Array(chart.data.length).fill(chart.ucl);
                traces.push({
                    y: uclData,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'UCL',
                    line: { color: '#D34041', dash: 'dash', width: 1 },
                    hoverinfo: 'none'
                });
            }

            if (chart.lcl !== null) {
                 const lclData = Array.isArray(chart.lclArray) ? chart.lclArray : Array(chart.data.length).fill(chart.lcl);
                traces.push({
                    y: lclData,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'LCL',
                    line: { color: '#D34041', dash: 'dash', width: 1 },
                    hoverinfo: 'none'
                });
            }

            const layout = {
                title: chart.name,
                margin: { t: 40, b: 40, l: 40, r: 20 },
                showlegend: false,
                xaxis: { showgrid: false },
                yaxis: { showgrid: true, gridcolor: '#eee' }
            };

            Plotly.newPlot(div, traces, layout, { responsive: true, displayModeBar: false });
        });
    },

    // --- Render Stats ---
    renderStats: (stats) => {
        const container = document.getElementById('stats-content');
        container.innerHTML = `
            <div class="stat-item"><span>Média (μ)</span><strong>${stats.mean.toFixed(2)}</strong></div>
            <div class="stat-item"><span>Desvio (σ)</span><strong>${stats.sigma.toFixed(3)}</strong></div>
        `;
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
            <div class="log-item critical" onclick="App.openNote(${v.index})">
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
    openModal: (title, contentHTML) => {
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-body').innerHTML = contentHTML;
        document.getElementById('modal-overlay').classList.remove('hidden');
    },

    closeModal: () => {
        document.getElementById('modal-overlay').classList.add('hidden');
    }
};

window.toggleSidebar = UI.toggleSidebar;
window.togglePanel = UI.togglePanel;
