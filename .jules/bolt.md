## 2024-05-09 - Overcoming deepStrictEqual prototype restrictions via Context Injection
**Learning:** V8 `assert.deepStrictEqual` can fail between identically shaped arrays with identical values if they are initialized across different execution boundaries (e.g., standard initialization inside a `vm` run without explicit Object/Array globals). Furthermore, preserving original null/NaN initialization behavior is crucial for zero-regression mathematical patches.
**Action:** Always inject `Array` and `Math` into `vm.createContext` scopes when performing regression testing of array modifications. Ensure structural matches (like `[0, ...ranges]` versus `mrData[0]=0; loop`) strictly preserve the exact initial states.

## 2024-05-09 - A/B Regression Testing Strategy Without Reverting Working Tree
**Learning:** Checking math regressions directly after modifying a file in-place requires obtaining the original code without breaking the current workspace state.
**Action:** Use `git show HEAD:<filepath> > /tmp/<filename>_orig.js` to securely export the original baseline code to an external directory for ad-hoc regression testing using dual VM context evaluation.
