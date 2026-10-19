## 1. Dependency Upgrade

- [x] 1.1 Update `composer.json` to require the latest stable Laravel major release and its required PHP version, and update each direct Laravel integration and development dependency to a release compatible with it; verify `composer validate` succeeds in CI.
- [x] 1.2 Regenerate `composer.lock` from the updated constraints without retaining incompatible packages; verify CI can install the locked dependency set and `php artisan --version` reports the selected Laravel release.

## 2. Application Compatibility

- [ ] 2.1 Migrate the application bootstrap, middleware registration, exception handling, route registration, and console configuration where required by the selected Laravel release while preserving the existing web and API route definitions; verify `php artisan route:list` includes the existing public, authenticated, subscribed, and API routes in CI.
- [ ] 2.2 Update framework-dependent application and package configuration, including authentication, Sanctum, Cashier, Inertia, Reverb, queues, and scheduled commands, to their compatible supported forms; verify `php artisan config:cache` and `php artisan optimize:clear` succeed in CI.

## 3. Regression Coverage

- [ ] 3.1 Update the test bootstrap and existing tests for the upgraded framework APIs; add feature coverage that confirms the home page remains available and guest-only, authenticated, and subscription-protected routes retain their access controls; verify the added tests pass in CI.
- [ ] 3.2 Add automated coverage for the existing authenticated Sanctum API endpoint and for dispatching the application’s content-generation job without serialization or framework errors; verify `php artisan test` passes in CI.
- [ ] 3.3 Reviewer: confirm the deployed application completes login, plan checkout, and content-generation flows using the upgraded dependency set.
