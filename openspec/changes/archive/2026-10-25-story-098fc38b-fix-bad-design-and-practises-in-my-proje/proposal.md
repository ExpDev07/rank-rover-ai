# Improve app isolation and content reliability

## Why

App and content routes currently lack ownership checks, and some content queries can return records from another app. Duplicated AI handling and queue-state updates also make failures harder to handle reliably; addressing these concrete defects gives the codebase a safer, testable foundation.

## What Changes

- Enforce app ownership and parent-child boundaries for app pages, updates, content operations, and content clusters. Keep content lists inside the selected app.
- Consolidate AI request/response handling, validate generated articles and title recommendations before saving them, and stop writing full AI responses or raw provider errors into logs or user-visible errors.
- Keep failed article generation recoverable, preserve earlier revisions, and save recommended titles as an all-or-nothing operation.
- Consolidate repeated content-dispatch logic so queued status is saved before a job can execute, and restore state if dispatch fails. Reject a tweak when no completed revision exists.
- Add focused automated regression tests alongside each implementation group.

## Capabilities

### New Capabilities

- `app-data-isolation`: Owners can manage their apps while other accounts and unrelated app records remain inaccessible.
- `content-generation-reliability`: Article creation, refinement, and title recommendations handle successful and failed AI responses consistently, with accurate queue state and bounded diagnostics.

### Modified Capabilities

None. `openspec list --specs` reports no existing specifications.

## Impact

- Laravel routes and authorization; `AppController`, `ContentController`, `ContentClusterController`, and content-related form requests.
- `GenerateContentJob`, `TweakContentJob`, and small shared services under `app/` for AI handling and content dispatch; existing content models, relationships, and status events.
- PHPUnit feature/unit tests using the existing SQLite test configuration and faked external services. No new runtime dependencies or database schema changes are expected.
- Existing content creation dialog and content detail page for displaying retryable errors and allowing retry of unqueued content without a revision.
- Existing URLs, successful redirects, Inertia props, revision history, and event payloads remain compatible. Unauthorized requests and invalid AI output gain defined failure behavior.

## Assumptions

- “Perfect codebase” means a bounded first improvement addressing verified backend defects, rather than an unbounded rewrite. Visual redesign, billing changes, framework upgrades, repository-wide formatting, and unrelated cleanup are outside this change.
- Apps have one owner (`user_id`); there is no collaboration or administrator bypass. Inaccessible apps and mismatched route children return 404; an invalid submitted cluster association is a validation error.
- Preserve the current AI model, prompts, and JSON-repair support. Accept repaired responses only after validating their shape. Recommendation counts follow valid provider output; this change does not enforce exactly eight titles.
- Provider/network/response failures get a stable, generic retryable error message. Logs may contain operation identifiers and a controlled error category, but no prompts, conversations, generated text, raw responses, credentials, or raw exception messages.
- Queue correctness covers normal execution, handled generation failures, and synchronous dispatch failures. Concurrent-request deduplication, worker crashes, timeout recovery, and exactly-once delivery require a separate change.
- Agents write code and automated tests without installing dependencies or running the application, build, or tests. Dependency-equipped verification is assigned to reviewers and never blocks an agent group.
