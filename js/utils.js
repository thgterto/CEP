const Utils = {
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

                // Flatten and filter numbers
                let values = [];
                json.forEach(row => {
                    row.forEach(cell => {
                        if (typeof cell === 'number') values.push(cell);
                    });
                });

                if (values.length < 2) reject("Dados insuficientes no arquivo.");
                else resolve(values);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    },

    parsePaste: (text) => {
        const parts = text.split(/[,\s\n]+/);
        const values = parts.map(p => parseFloat(p)).filter(n => !isNaN(n));
        return values;
    },

    generateDemoData: () => {
        // Normal distribution approximation (Box-Muller)
        const randn_bm = () => {
            let u = 0, v = 0;
            while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
            while(v === 0) v = Math.random();
            return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        };

        const data = [];
        const mean = 100;
        const std = 5;

        // 50 points stable
        for(let i=0; i<50; i++) {
            data.push(mean + randn_bm() * std);
        }

        // 30 points shifted +1.5 sigma
        for(let i=0; i<30; i++) {
            data.push(mean + 7.5 + randn_bm() * std);
        }

        // 20 points high variance
        for(let i=0; i<20; i++) {
            data.push(mean + randn_bm() * (std * 2));
        }

        return data;
    },

    // --- Export ---

    sanitizeCSVField: (field) => {
        if (field === null || field === undefined) return "";
        let str = String(field);

        // 1. Prevent Formula Injection (prepend single quote)
        // Checks for =, +, -, @, Tab, Carriage Return
        if (/^[=+\-@\t\r]/.test(str)) {
            str = "'" + str;
        }

        // 2. Escape standard CSV characters (", comma, newline)
        if (/[",\n\r]/.test(str)) {
            str = '"' + str.replace(/"/g, '""') + '"';
        }

        return str;
    },

    downloadCSV: (data, filename) => {
        // data: Array of objects or values
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
