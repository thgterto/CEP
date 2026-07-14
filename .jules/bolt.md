## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.
## 2026-07-14 - Directory Context for Ad-Hoc Node Scripts
**Learning:** When executing ad-hoc Node.js scripts in `/tmp` to bypass 'Invalid package config' errors from a broken repository `package.json`, executing the script via piping (`cat /tmp/test.js | node`) from within the repository root causes Node.js to use the current working directory for module resolution, triggering the `ERR_INVALID_PACKAGE_CONFIG` error.
**Action:** Always explicitly change the directory to `/tmp` before execution (e.g., `cd /tmp && node test.js`) to ensure Node resolves modules entirely outside of the repository's broken configuration.
