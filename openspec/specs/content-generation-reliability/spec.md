# content-generation-reliability Specification

## Purpose
Make article generation, refinement, and title recommendations predictable on success and recoverable when the AI provider or job dispatch fails.

## Requirements

### Requirement: Article responses are validated before completion
The system SHALL mark an article revision as generated only when the provider returns a JSON object, after supported JSON repair, containing nonblank string content. Successful generation SHALL preserve the conversation, associate the new current revision, clear queued status, and emit the existing generating and terminal status notifications. A tweak SHALL create a child revision without modifying the source revision.

#### Scenario: Generate an article
- **WHEN** the provider returns a valid article for a queued generation request
- **THEN** the new current revision contains the returned Markdown and conversation, is marked generated, and the content is no longer queued
- **AND** generating and generated status notifications are emitted

#### Scenario: Refine an article
- **WHEN** a tweak of a completed revision returns valid article content
- **THEN** a new child revision becomes current with the updated article and conversation, the original revision remains unchanged, and queued status is cleared

#### Scenario: Repairable response
- **WHEN** the supported JSON repair converts a response into an object with valid article content
- **THEN** generation completes using that repaired content

### Requirement: Generation failures leave a recoverable revision
For provider exceptions and invalid article responses, the system SHALL mark the new revision errored, leave its article content empty, clear queued status, and emit an errored status notification. It SHALL retain previous revisions and expose a generic message indicating that generation failed and can be retried, rather than provider internals.

#### Scenario: Provider fails during generation or refinement
- **WHEN** the AI provider raises an exception while generating an article or tweak
- **THEN** the new current revision is errored with a generic retry message, queued status is cleared, and earlier revisions remain unchanged
- **AND** an errored status notification is emitted

#### Scenario: Invalid article response
- **WHEN** a response has no usable first message, cannot be repaired into JSON, or contains absent, blank, or non-string article content
- **THEN** the operation follows the same recoverable failure behavior and does not report a generated article

### Requirement: Recommendations are saved together
The system SHALL accept recommendations only when the repaired response contains a nonempty list of titles, each with a nonblank string title and a nonempty list of nonblank string keywords. It SHALL save a cluster and all accepted recommendations together, or save none of them. Provider-supplied extra fields SHALL NOT override ownership, relationships, or generation state.

#### Scenario: Valid recommendations
- **WHEN** a valid recommendation response is received for an app
- **THEN** one cluster and its recommended content are saved under that app, with the requested language, size, format, and audience setting
- **AND** the user is redirected to the existing cluster view

#### Scenario: Invalid recommendations or provider failure
- **WHEN** the provider fails or any recommendation fails validation
- **THEN** no cluster or recommended content is saved and the user receives a generic retryable validation error on the cluster form

#### Scenario: Persistence fails partway through recommendations
- **WHEN** saving any recommended content fails
- **THEN** neither the new cluster nor any of its recommendations remain saved

### Requirement: AI diagnostics exclude private payloads
The system SHALL NOT write prompts, conversation history, generated text, raw provider responses, credentials, or raw provider exception messages into application logs or user-visible errors. Diagnostics SHALL be limited to operation identifiers and controlled failure categories; persisted conversations needed for refinement remain supported.

#### Scenario: Successful AI operation
- **WHEN** article generation, refinement, or recommendation generation succeeds
- **THEN** application logs contain none of the request or response text

#### Scenario: Provider error contains private details
- **WHEN** a provider exception contains request text or credentials
- **THEN** neither application logs nor the user-visible failure message includes those details

### Requirement: Queued state reflects dispatch and completion
The system SHALL persist queued state before a generation or tweak job can execute. A completed job SHALL remain unqueued even when it runs during the submitting request. If dispatch throws before accepting the job, the system SHALL restore the previous queue flag and current revision association and return a generic retryable form error; newly created content SHALL remain available and unqueued for retry.

#### Scenario: Deferred execution
- **WHEN** an owner creates, writes, retries, or tweaks content using a deferred queue
- **THEN** the content is marked queued before job dispatch and remains queued until the job finishes

#### Scenario: Immediate execution
- **WHEN** a generation or tweak job completes during the submitting request, successfully or with a handled failure
- **THEN** the response does not overwrite the completed job's unqueued state or its new current revision

#### Scenario: Dispatch failure
- **WHEN** dispatch throws before accepting a generation or tweak job
- **THEN** the prior queue flag and current revision association are restored, earlier revisions are preserved, and the user receives a generic retryable form error

#### Scenario: Newly created content was not dispatched
- **WHEN** an owner opens newly created content whose dispatch failed and which has no revision
- **THEN** the page offers a retry action instead of displaying an indefinite generation spinner

#### Scenario: Tweak has no completed source
- **WHEN** an owner requests a tweak of content without a current generated revision
- **THEN** a validation error is returned without changing content or dispatching a job
