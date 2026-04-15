
## 2024-06-25 - To test client-side JavaScript files
**Learning:** To test client-side JavaScript files (like `js/spc.js`) in ad-hoc Node.js scripts without modifying them to add `module.exports` or modifying the package.json to be a module (which throws `ERR_INVALID_PACKAGE_CONFIG`), read the file content with `fs.readFileSync` and evaluate it using the `vm` module.
**Action:** Next time I need to test a client-side JS file with Node.js in this repository, I will use `new require('vm').Script(content + '\n MODULE_NAME;').runInThisContext()` instead of trying to require it directly or changing the environment configuration.
