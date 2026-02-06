import re

new_render_stats = r'''    renderStats: (stats) => {
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
        addItem('Moda', stats.mode);
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
    },'''

with open('js/ui.js', 'r') as f:
    content = f.read()

# Regex to find the function
pattern = r'renderStats: \(stats\) => \{[\s\S]*?\}(?=,\s*renderCapability)'
match = re.search(pattern, content)

if match:
    new_content = content.replace(match.group(0), new_render_stats.strip())
    with open('js/ui.js', 'w') as f:
        f.write(new_content)
    print("Updated renderStats")
else:
    print("Could not find renderStats function")
