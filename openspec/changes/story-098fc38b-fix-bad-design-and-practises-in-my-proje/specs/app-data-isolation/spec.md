## Purpose

Keep each account's apps and content private and ensure operations use records belonging to the selected app.

## ADDED Requirements

### Requirement: App operations require ownership
The system SHALL allow a subscribed owner to view and update their app, list and create its content, create its content clusters, and view, write, retry, or tweak its content. The system SHALL return 404 for these operations against another account's app, without disclosing its data, changing records, dispatching jobs, or calling the AI provider. Existing login and subscription requirements SHALL continue to apply.

#### Scenario: Owner uses their app
- **WHEN** a subscribed owner requests an app page or submits a valid operation within their app
- **THEN** the operation succeeds with the existing page or redirect and operates only on that app's records

#### Scenario: Another account addresses the app directly
- **WHEN** a subscribed user requests any app-specific page or operation using another account's app slug
- **THEN** the response is 404 and no app data, mutation, generation job, or AI call is produced

#### Scenario: Existing access gates remain
- **WHEN** a guest requests an app page or an unsubscribed user requests the app list
- **THEN** the guest is redirected to login and the unsubscribed user is redirected to plan selection

### Requirement: Content and clusters belong to the selected app
The system SHALL require route content and selected clusters to belong to the selected app, even when the same user owns both apps. Content listings SHALL include only that app's queued content or content with a current revision. A submitted cluster association SHALL refer to a cluster in that app.

#### Scenario: List queued and completed content
- **WHEN** an owner lists an app containing queued content, content with a current revision, and unqueued content without a current revision
- **THEN** the list includes the first two categories, excludes the third, and excludes every record from other apps

#### Scenario: Mismatched content route
- **WHEN** an owner views, writes, retries, or tweaks content using an app slug different from the content's app
- **THEN** the response is 404 and no records change or generation jobs are dispatched

#### Scenario: Display a cluster
- **WHEN** an owner selects an existing cluster from the current app using the content page's cluster selector
- **THEN** the page returns that cluster and its content

#### Scenario: Foreign or missing selected cluster
- **WHEN** an owner selects a missing cluster or one from another app
- **THEN** the response is 404 and no cluster data is returned

#### Scenario: Associate content with a cluster
- **WHEN** an owner creates valid content with a cluster belonging to the current app, or omits the optional cluster
- **THEN** creation succeeds with the requested association or without a cluster respectively

#### Scenario: Invalid submitted cluster
- **WHEN** an owner creates content with a missing cluster or a cluster from another app
- **THEN** the request receives a validation error for the cluster and creates no content or job
