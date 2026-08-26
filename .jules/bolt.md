## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-08-25 - Loading CDN Scripts into Node.js Contexts
**Learning:** To load client-side global dependencies (like `jStat` from a CDN) into ad-hoc Node.js scripts when `npm install` fails (e.g., due to an invalid `package.json`), you cannot simply `require()` the downloaded file because it lacks CommonJS exports. Using `eval()` often fails to expose the variable globally depending on how the script is written.
**Action:** Download the file, read it with `fs.readFileSync`, and execute it using the `vm` module: `vm.runInContext(code, vm.createContext(global))`. This properly exposes the library on the global object, mimicking the browser environment.
