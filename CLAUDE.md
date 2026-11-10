# CLAUDE.md

Goal: Maintain this codebase with disciplined competence: understand the local pattern, make the smallest safe change, verify the result, and keep the diff clean.

Your job is to leave the repository better by the smallest safe amount: understand the local pattern, make the requested change, verify it, and report only what matters.

This file exists because LLMs make predictable mistakes when writing code. Not random mistakes. The same ones, over and over. I've watched it happen enough times to write them down.

These are not suggestions. These are rules. Follow them and you'll produce code that doesn't need to be rewritten. Ignore them and you'll produce code that looks impressive and breaks in production.

\---

## Core Loop

For every code task:

1. **Classify the work.** Bug fix, feature, refactor, test, docs, dependency, config, security, or release plumbing.
2. **Find the acceptance target.** Convert the request into observable behavior.
3. **Inspect before editing.** Read the target files, nearby patterns, tests, scripts, package config, and relevant docs.
4. **Plan only as much as needed.** Use a short plan for multi-file or risky work. Skip ceremony for obvious local edits.
5. **Patch surgically.** Match the codebase. Keep the diff tight.
6. **Verify.** Run the narrowest meaningful check first; broaden only when the change touches shared behavior.
7. **Report plainly.** Changed, verified, notes. No victory lap.

\---

## Task Intake

Before touching code, identify:

* What behavior should change.
* Where that behavior likely lives.
* What existing pattern governs it.
* What could break if this is wrong.
* Whether clarification would change the implementation.

Turn vague requests into concrete targets:

* “Fix login bug” → reproduce the failure, patch the cause, verify login behavior.
* “Add validation” → define rejected input, response shape, and tests.
* “Improve performance” → identify the bottleneck, change that path, compare behavior.
* “Add auth” → clarify the auth model before implementation.

Ask only when the answer changes architecture, public behavior, data shape, security, persistence, dependencies, or compatibility.

Proceed when the edit is local, reversible, obvious from nearby code, or already specified by the user.

\---

## Repository First

The repository is the source of truth.

Before adding anything new, look for:

* Existing utilities, helpers, services, hooks, fixtures, validators, errors, loggers, and config loaders.
* Existing file organization and naming conventions.
* Existing test style and setup.
* Existing package manager and lockfile.
* Existing scripts for lint, typecheck, test, build, and format.
* Existing CI config when local commands are unclear.
* Monorepo package boundaries and workspace conventions.

Use what is already here. New patterns must earn their existence.

\---

## Code Style

Match the surrounding code.

Preserve:

* Naming style.
* Module style.
* Formatting.
* Error handling.
* Logging.
* Response envelopes.
* Test idioms.
* Import style.
* File layout.

Local consistency beats generic best practice.

\---

## Diff Discipline

Make the smallest correct change.

Every changed line should answer:

> How does this directly support the requested behavior?

Keep unrelated cleanup out of the diff. Avoid drive-by refactors, broad formatting, import churn, renames, and “while I’m here” edits.

Clean up only after your own change: unused imports, dead variables, obsolete branches, or tests made invalid by the patch.

Avoid editing generated files, build outputs, vendored code, caches, snapshots, or lockfiles unless the task requires it.

\---

## Simplicity

Prefer direct code that solves the known problem.

Use:

* One clear function before a service layer.
* One local conditional before a policy engine.
* Explicit behavior before clever abstraction.
* Existing primitives before new dependencies.
* Duplication once or twice before premature abstraction.

Avoid one-implementation interfaces, speculative config, fake extensibility, unnecessary retries, unused generic types, and architecture built for imaginary future requirements.

“Maybe later” is not a requirement.

\---

## Public Contracts

Treat these as high-risk surfaces:

* API routes and response shapes.
* Function signatures used outside the file.
* Database schema and migrations.
* Serialized data.
* CLI flags and output.
* Events and payloads.
* Config keys and environment variables.
* Error codes and status codes.
* User-visible text asserted by tests.

Search for callers before changing contracts. Prefer backwards-compatible additions unless the user asked for a breaking change.

\---

## Dependencies

Dependencies are permanent until someone pays the removal tax.

Before adding one:

* Check existing dependencies.
* Check the standard library.
* Check installed versions and runtime compatibility.
* Check maintenance, size, security, and license risk.
* Confirm the package manager and lockfile convention.
* Explain why the dependency is necessary.

Never add a package because it is familiar.

\---

## Security

For auth, permissions, secrets, payments, personal data, file access, network calls, destructive actions, and external input:

* Identify the trust boundary.
* Preserve authorization checks.
* Validate at the boundary.
* Avoid logging secrets or sensitive payloads.
* Use existing sanitizers and validators.
* Keep least privilege.
* Test denial paths as well as success paths.
* Ask before changing the security model.

“Looks fine” is not a security review.

\---

## Error Handling

Handle realistic failures clearly.

Good targets:

* Invalid input.
* Missing records.
* Permission failures.
* External service failures.
* Filesystem/network errors.
* Parse and validation failures.
* Database failures.

Do not bury broken invariants under generic fallbacks. If a value is unexpectedly null, find out why before adding a guard.

\---

## Testing and Verification

Verify behavior, not vibes.

For bugs:

1. Reproduce the failure when practical.
2. Add or identify a failing test.
3. Patch the cause.
4. Confirm the failure is gone.
5. Check nearby regressions.

For features:

1. Test the public behavior.
2. Cover meaningful edge cases.
3. Use existing helpers and fixtures.
4. Avoid tests that only restate implementation details.

Run the narrowest useful command first. Expand to broader checks when touching shared utilities, schemas, auth, build config, persistence, or public interfaces.

If verification cannot run, report the exact command attempted and the exact blocker.

\---

## Debugging

Investigate before changing code.

Use this rhythm:

1. Read the full error and stack trace.
2. Reproduce the failure.
3. Trace the relevant path.
4. Form one hypothesis.
5. Change one thing.
6. Re-test.
7. Keep or revert based on evidence.

Random-walk debugging creates ghosts. Do not appease the chaos goblin with unrelated edits.

\---

## Stop Conditions

Stop and ask when:

* The change expands into a refactor.
* The requested behavior conflicts with existing architecture.
* A new dependency seems required.
* A public contract would change.
* Security or permissions are unclear.
* Data migration semantics are unclear.
* Tests reveal unrelated failures that block confidence.
* The correct fix is larger than the user likely expects.

Report the finding, the risk, and the recommended next step.

\---

## Reporting

After changes, respond in this shape:

```text
Changed:
- Briefly name the behavior and files touched.

Verified:
- Command(s) run and result.

Notes:
- Assumptions, blockers, pre-existing failures, or risks.
```

Keep it short. Do not dump code unless asked. Do not explain basic concepts unless the user asks.

Good uncertainty:

> `npm test -- user.test.ts` fails before and after my change because the local database is unavailable.

Bad uncertainty:

> This should probably work.

\---

## Common Failure Patterns

Avoid these:

* **Kitchen Sink:** one request becomes fifteen edits.
* **Wrong Abstraction:** generic machinery for a one-off case.
* **Invisible Decision:** architecture chosen without surfacing it.
* **Optimistic Path:** happy path only, no realistic failures.
* **API Hallucination:** using methods or options not confirmed in this repo/version.
* **Style Drift:** writing your preferred style instead of the local style.
* **Runaway Refactor:** a fix cascades and you keep going silently.
* **Formatting Fog:** real change hidden inside reformatting noise.
* **Dependency Sneak:** package added without proving need.
* **Test Theater:** tests assert implementation trivia, not behavior.

\---

## Final Check

Before responding, confirm:

* The diff is necessary and bounded.
* The implementation follows local patterns.
* Public contracts are preserved or intentionally changed.
* Dependencies are avoided or justified.
* Security-sensitive paths were handled cautiously.
* Relevant checks ran, or blockers are explicit.
* Remaining uncertainty is specific and actionable.

The goal is code that belongs here.
