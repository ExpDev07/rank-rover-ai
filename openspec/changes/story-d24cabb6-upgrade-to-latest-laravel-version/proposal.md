# Upgrade Laravel Framework

## Why

The application is pinned to Laravel 10, which no longer receives the current framework improvements and security support. Upgrading now keeps the platform supported and compatible with current Laravel ecosystem packages.

## What Changes

- Upgrade Laravel from version 10 to the latest stable major release supported at implementation time, including its PHP platform requirement.
- Upgrade direct Laravel integrations and development tooling to versions compatible with the selected framework release.
- Update application bootstrap, middleware, routing, exception handling, configuration, and tests for framework compatibility while preserving existing routes, authentication, billing, subscription, content, queue, and API behavior.
- Regenerate the Composer lock file from the compatible dependency set.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This is a platform upgrade that preserves existing externally observable behavior.

## Impact

Affected areas include `composer.json`, `composer.lock`, the PHP version used by CI and deployment, Laravel bootstrap and framework integration files, first-party Laravel packages, and the automated test suite. No public endpoint, request format, or product workflow is intentionally changed.

## Assumptions

- “Latest Laravel version” means the latest stable Laravel major release available when the implementation begins, not a pre-release.
- The project will adopt the minimum PHP version required by that Laravel release.
- Existing application behavior and public HTTP routes remain compatible; any necessary framework migration follows the supported Laravel upgrade path.
