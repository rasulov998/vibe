# VEYRO Project Engine — V1

The Project Engine turns an approved BuildPlan into a deterministic project manifest.

The manifest is the source of truth for generated project structure. AI suggestions are inputs; the engine validates and normalizes them before files are generated.

## V1 project model

Project
- metadata
- screens (apps)
- scenes/levels (2D games)
- components/objects
- assets
- actions
- API bindings
- build configuration

## Rules

- Every project has a stable projectId.
- Generated identifiers are sanitized and deterministic.
- Unknown component/action types are rejected.
- Secrets are never stored in the project manifest.
- API credentials are references to gateway providers, never raw keys.
- Build configuration is validated before build.
