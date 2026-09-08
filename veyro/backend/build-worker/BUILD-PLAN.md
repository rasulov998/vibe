# First real APK build plan

The first build will use a controlled Android template rather than executing AI-generated shell commands.

## Steps

1. Create a minimal Android/Flutter template owned by VEYRO.
2. Map ProjectManifest components into the template.
3. Run the GitHub Actions worker.
4. Compile a debug APK.
5. Upload the APK as a workflow artifact.
6. Install/test the APK on an emulator.
7. Only after that enable AAB/release signing.

This separation prevents generated project content from becoming arbitrary CI commands.
