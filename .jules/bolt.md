## 2026-05-19 - Avoiding Committing Binary Artifacts During Refactoring
**Learning:** When running frontend verification scripts (like Playwright with `page.screenshot()`), large binary artifacts (e.g., `verification.png`) can be generated and accidentally staged or committed, cluttering version control.
**Action:** Always perform a workspace cleanup and check `git status` to ensure generated scratchpad scripts, logs, and binary files are explicitly removed before staging changes and submitting.

## 2026-06-30 - Bypassing EJSONPARSE via Expectation of Failures
**Learning:** The project's `package.json` file is fundamentally malformed (containing literal escaped newlines) causing Node.js module resolution, `npm`, and `pnpm` to throw `EJSONPARSE` or 'Invalid package config'.
**Action:** Do not attempt to fix `package.json` as modifying it is strictly prohibited. Expect standard `pnpm test` and `pnpm lint` commands to fail, and rely exclusively on ad-hoc scripts placed in `/tmp` (which correctly escapes the broken package.json scope) to verify business logic correctness.
