import re

file_path = 'js/app.js'

with open(file_path, 'r') as f:
    content = f.read()

# 1. Define handleSettingsChange
new_method = """
    handleSettingsChange: () => {
        const type = document.getElementById('chart-type').value;

        // Contextual UI: Hide subgroup size for I-MR, CUSUM, EWMA, Run
        const subgroupContainer = document.getElementById('subgroup-size').parentElement;
        if (['imr', 'cusum', 'ewma', 'run'].includes(type)) {
            subgroupContainer.style.display = 'none';
        } else {
            subgroupContainer.style.display = 'block';
        }

        // Reactive Calculation
        if (App.state.data && App.state.data.length > 0) {
            App.calculate();
        }
    },
"""

# Insert new method before init
content = content.replace('init: () => {', new_method + '\n    init: () => {')

# 2. Update init to add listeners
init_code = """    init: () => {
        console.log("CEP PRO Initialized");
        // Initialize Tooltips
        if (typeof tippy !== 'undefined') {
            tippy('[data-tippy-content]');
        }

        // Reactive Settings Listeners
        ['chart-type', 'subgroup-size', 'lsl', 'usl'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', App.handleSettingsChange);
                el.addEventListener('input', () => {
                    // Debounce for text inputs if needed, but 'change' covers blur/enter.
                    // For instant feedback on sliders/numbers, we might want input with debounce.
                    // For now, 'change' is safe for numbers.
                });
            }
        });

        // Initial UI State
        App.handleSettingsChange();
    },"""

# Replace the old init block
# We match the old init block carefully or just replace the inner part?
# The old init was simple. Let's just replace the whole init function regex
content = re.sub(r'init: \(\) => \{[\s\S]*?tippy\(\'\[data-tippy-content\]\'\);\s+[\s\S]*?\},', init_code, content)

with open(file_path, 'w') as f:
    f.write(content)

print("Patched js/app.js")
