# Build Worker policy

## Isolation

The worker must run:
- as a non-root identity
- in a fresh workspace for every job
- with CPU/RAM/disk quotas
- with a hard wall-clock timeout
- with restricted filesystem access
- with deny-by-default outbound network access
- with automatic cleanup

## Command execution

Only VEYRO-owned build commands from an immutable allowlist may execute. User/AI-generated strings must never become shell commands.

## Secrets

No API provider secret, signing private key, database credential, or access token may enter the generated project workspace unless explicitly injected by a trusted signing/build service for the minimum required duration.

## Failure handling

Security failures are terminal. Transient infrastructure failures may retry up to the Build Engine's configured limit.
