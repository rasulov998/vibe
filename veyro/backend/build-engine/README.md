# VEYRO Build Engine — V1

The Build Engine converts a validated ProjectManifest into an Android build job.

## Flow

POST build request
→ validate manifest
→ create queued job
→ isolated worker
→ generate Android project
→ Gradle compile
→ tests/security checks
→ produce APK/AAB
→ store artifact
→ return short-lived download URL

## Non-negotiable security

- Build workers are isolated per job.
- Never execute generated code in the API process.
- No access to other projects.
- No provider/API secrets in generated source.
- CPU, memory, disk and wall-clock limits are enforced.
- Network access is deny-by-default and explicitly allowlisted.
- Artifacts are scanned and expire according to retention policy.
- Signing keys are held outside source control and outside generated projects.

V1 intentionally defines the contract first. A real Android worker is enabled only after the sandbox and signing infrastructure are available.
