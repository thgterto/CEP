import re

new_render_charts = r'''    renderCharts: (spcResult, labels = null) => {
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
    },'''

with open('js/ui.js', 'r') as f:
    content = f.read()

# Find by string markers
start_marker = "renderCharts: (spcResult, labels = null) => {"
end_marker = "// --- Render Stats ---"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    # We need to preserve the trailing comma if it was there before the comment, usually it's
    # Let's find the last closing brace before end_idx

    # We will replace from start_idx to end_idx - 1 (trimmed)

    # Actually, simpler: just construct the new file
    new_file = content[:start_idx] + new_render_charts.strip() + "\n\n    " + content[end_idx:]

    with open('js/ui.js', 'w') as f:
        f.write(new_file)
    print("Updated renderCharts")
else:
    print(f"Could not find markers. Start: {start_idx}, End: {end_idx}")
