# Build Engine security and lifecycle policy

## Lifecycle

queued → validating → building → testing → security_check → completed

Failure at any stage → failed, unless a bounded retry is safe.

## Retry rules

Only deterministic/transient failures may retry. Never retry a security rejection automatically.

## Worker isolation

A worker must run with:
- unique temporary workspace
- non-root user
- restricted filesystem
- deny-by-default network
- resource limits
- hard timeout
- cleanup after completion

## Artifact policy

APK/AAB artifacts are stored outside the Git repository. Download links are short-lived. Artifact metadata must not contain secrets.

## Signing

Debug builds use a non-production key. Release signing keys are managed by a dedicated secret-management system and are never committed to source control.
