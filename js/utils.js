const Utils = {
    escapeHTML: (str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },


    // --- Data Loading ---

    readFile: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                let values = [];
                let labels = [];

                // Detect structure
                // Assume if col 1 is number, col 0 might be label
                json.forEach(row => {
                    if (row.length >= 2) {
                        const val = row[1];
                        if (typeof val === 'number') {
                            values.push(val);
                            // Convert Excel date if needed, or just stringify
                            let label = row[0];
                             // Simple Excel date check (heuristic) - typically handled by XLSX option cellDates: true but we used raw
                             // If we want raw strings, row[0] is fine.
                            labels.push(String(label));
                        }
                    } else if (row.length === 1 && typeof row[0] === 'number') {
                        values.push(row[0]);
                        labels.push(null);
                    }
                });

                // Fallback: if values empty, try flattening like before (just numbers)
                if (values.length === 0) {
                     json.forEach(row => {
                        row.forEach(cell => {
                            if (typeof cell === 'number') {
                                values.push(cell);
                                labels.push(null);
                            }
                        });
                    });
                }

                if (values.length < 2) reject("Dados insuficientes no arquivo.");
                else resolve({ values, labels });
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    },

    parsePaste: (text) => {
        const lines = text.trim().split(/\n+/);
        const values = [];
        const labels = [];

        lines.forEach(line => {
            // Try splitting by comma or tab
            const parts = line.split(/[,\t;]+/);

            if (parts.length >= 2) {
                // Assume Label, Value
                const val = parseFloat(parts[parts.length - 1]); // Last part is value
                if (!isNaN(val)) {
                    values.push(val);
                    // Join rest as label
                    labels.push(parts.slice(0, parts.length - 1).join(' ').trim());
                }
            } else {
                // Just value
                const val = parseFloat(parts[0]);
                if (!isNaN(val)) {
                    values.push(val);
                    labels.push(null);
                }
            }
        });

        return { values, labels };
    },

    generateDemoData: () => {
        // Normal distribution approximation (Box-Muller)
        const randn_bm = () => {
            let u = 0, v = 0;
            while(u === 0) u = Math.random();
            while(v === 0) v = Math.random();
            return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        };

        const values = [];
        const labels = [];
        const mean = 100;
        const std = 5;

        // Start date: Now
        let date = new Date();

        const addPoint = (val) => {
            values.push(val);
            // Format: HH:mm:ss
            labels.push(date.toLocaleTimeString());
            // Increment by 10 mins
            date = new Date(date.getTime() + 10 * 60000);
        };

        // 50 points stable
        for(let i=0; i<50; i++) addPoint(mean + randn_bm() * std);

        // 30 points shifted +1.5 sigma
        for(let i=0; i<30; i++) addPoint(mean + 7.5 + randn_bm() * std);

        // 20 points high variance
        for(let i=0; i<20; i++) addPoint(mean + randn_bm() * (std * 2));

        return { values, labels };
    },

    // --- Export ---

    sanitizeCSVField: (field) => {
        if (field === null || field === undefined) return "";
        let str = String(field);
        if (/^[=+\-@\t\r]/.test(str)) {
            str = "'" + str;
        }
        if (/[",\n\r]/.test(str)) {
            str = '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
    },

    downloadCSV: (data, filename) => {
        let csvContent = "data:text/csv;charset=utf-8,";

        if (typeof data[0] === 'object') {
            const headers = Object.keys(data[0]);
            csvContent += headers.map(h => Utils.sanitizeCSVField(h)).join(",") + "\r\n";
            data.forEach(row => {
                csvContent += headers.map(h => Utils.sanitizeCSVField(row[h])).join(",") + "\r\n";
            });
        } else {
            csvContent += "Index,Value\r\n";
            data.forEach((val, idx) => {
                csvContent += `${idx+1},${Utils.sanitizeCSVField(val)}\r\n`;
            });
        }

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// --- Append to Utils ---
Utils.exportXLSX = (data, violations, notes, filename) => {
    const wb = XLSX.utils.book_new();

    // 1. Data Sheet
    const wsData = XLSX.utils.json_to_sheet(data.map((v, i) => ({ Index: i+1, Value: v })));
    XLSX.utils.book_append_sheet(wb, wsData, "Dados");

    // 2. Violations Sheet
    const violationsWithNotes = violations.map(v => {
        const note = notes[v.index] || {};
        return {
            Index: v.index + 1,
            Value: v.value,
            Rule: v.rule,
            Description: v.text,
            Cause: note.cause || "",
            Action: note.action || ""
        };
    });

    const wsViolations = XLSX.utils.json_to_sheet(violationsWithNotes);
    XLSX.utils.book_append_sheet(wb, wsViolations, "Violações");

    XLSX.writeFile(wb, filename);
};
