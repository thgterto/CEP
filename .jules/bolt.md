## 2024-05-18 - Avoid committing verification artifacts
**Learning:** Running `python3 verify.py` or local ad-hoc HTTP servers generates testing artifacts (e.g., `server.log`, `verification.png`) that are inherently untracked and can accidentally be added to git if not carefully managed.
**Action:** Always clean up temporary files and logs after verification, or strictly use `git add js/spc.js` instead of bulk `git commit -a` / `git add .` to avoid polluting the PR with workspace artifacts.
