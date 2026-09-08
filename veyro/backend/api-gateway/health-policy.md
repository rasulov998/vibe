# Gateway health policy

Every provider adapter must pass these checks before it can be enabled:

1. DNS/TLS/network reachability.
2. Expected HTTP status.
3. Response schema validation.
4. Timeout threshold.
5. Rate-limit/header detection.
6. Authentication configuration check.
7. Terms/license review timestamp.
8. Error-rate threshold.

A provider that repeatedly fails health checks is automatically disabled for new generated projects.

## Retry policy

Only retry explicitly retryable failures. Use bounded exponential backoff with a hard request deadline. Never blindly retry non-idempotent operations.

## Observability

Track:
- request count
- success/error count
- latency
- provider status
- rate-limit events

Do not log API keys, authorization headers, tokens, or user secrets.
