# VEYRO API Gateway — V1

The gateway is the only server-side entry point for provider APIs that require secrets, quotas, caching, or policy enforcement.

## Request flow

Client → VEYRO API Gateway → Provider → normalized response → Client

## Safety rules

- Never ship provider API keys inside APK/AAB.
- Validate provider and operation against the registry before making a request.
- Enforce per-user and per-provider rate limits.
- Apply request timeouts and bounded retries.
- Cache safe GET responses where provider terms permit.
- Record health/latency/error metrics without storing secrets.
- Keep provider credentials in server-side secrets only.
- Reject providers marked HOLD.
- Re-check provider status/terms before production onboarding.

## V1 implementation boundary

This directory defines the gateway contract and provider registry first. Network adapters are added only after each provider has a verified integration contract.
