const fs = require('fs');
let content = fs.readFileSync('js/utils.js', 'utf8');

// Fix the typo in parsePaste regex
// Current: split(/[,s\n]+/)
// Expected: split(/[,\s\n]+/)

// Note: In the file content read by fs, backslashes are escaped.
// The bad line in file is: const parts = text.split(/[,s\n]+/);
// The good line should be: const parts = text.split(/[,\s\n]+/);

if (content.includes('const parts = text.split(/[,s\\n]+/);')) {
    content = content.replace('const parts = text.split(/[,s\\n]+/);', 'const parts = text.split(/[,\\s\\n]+/);');
    fs.writeFileSync('js/utils.js', content);
    console.log("Fixed parsePaste regex.");
} else {
    console.log("Could not find the bad line. Content might be different or already fixed.");
    // Let's print the line to see what it is
    const lines = content.split('\n');
    const line = lines.find(l => l.includes('const parts = text.split'));
    console.log("Current line:", line);
}
