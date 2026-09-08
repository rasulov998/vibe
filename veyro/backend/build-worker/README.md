# VEYRO Build Worker — V1

A dedicated worker executes Android builds outside the API process.

V1 contract:
1. Receive an authenticated build-job payload.
2. Fetch the validated project manifest.
3. Create a clean temporary workspace.
4. Generate the Android project from the manifest.
5. Run Gradle with hard resource/time limits.
6. Run tests and security checks.
7. Upload the resulting APK/AAB as an artifact.
8. Report status and structured logs.
9. Delete the workspace.

The worker must not trust client-supplied paths or shell commands. Generated project content is data, not an instruction to execute arbitrary commands.
