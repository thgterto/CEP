## 2025-02-18 - [package.json Corruption]
**Learning:** `package.json` was found to be corrupted with literal `\n` characters instead of actual newlines (0x0A), preventing standard Node.js tools (like `jq` or `npm`) from parsing it correctly.
**Action:** Always check file integrity with `od -c` if strange parsing errors occur. When fixing `package.json`, ensure strict JSON validity including correct newline characters.
