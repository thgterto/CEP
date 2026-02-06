import re

file_path = 'js/app.js'

with open(file_path, 'r') as f:
    content = f.read()

# 1. Smart Paste Logic in init
# We look for the end of the init function, specifically before 'App.handleSettingsChange();'
paste_logic = """
        // Smart Paste Listener
        const pasteArea = document.getElementById('paste-area');
        if (pasteArea) {
            let debounceTimer;
            pasteArea.addEventListener('input', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    const val = pasteArea.value;
                    if (val && val.length > 5) { // minimal check
                        App.loadPaste();
                    }
                }, 500);
            });
        }
"""

content = content.replace('// Initial UI State', paste_logic + '\n        // Initial UI State')

# 2. Mobile Sidebar Toggle in calculate
# We'll add this at the very end of calculate, inside the function.
# calculate ends with UI.renderLog(...);
# We find that line and append the check.

sidebar_logic = """
        // Mobile UX: Auto-close sidebar
        if (window.innerWidth < 1024 && document.body.classList.contains('show-sidebar')) {
            UI.toggleSidebar();
        }
    """

# Use regex to find the end of calculate
# It ends with UI.renderLog(violations, App.state.notes); \n    },
content = re.sub(
    r'(UI\.renderLog\(violations, App\.state\.notes\);)',
    r'\1' + sidebar_logic,
    content
)

with open(file_path, 'w') as f:
    f.write(content)

print("Patched js/app.js step 2")
