# AI Orchestrator policy

## Execution order

1. Architect creates the canonical plan.
2. Developer/Game/Logic/UI specialists implement against that plan.
3. Security, Privacy and Accessibility review the generated result.
4. Testing and Bug Hunter run checks.
5. Performance and Quality review the result.
6. Judge makes the final preview/build decision.
7. Failed checks enter a bounded fix loop.
8. Only a passing result may enter the build pipeline.

## Important V1 boundary

The orchestrator is a contract and scheduling layer first. Actual model-provider adapters will be added only after the model gateway and secret management are in place.

No model API keys belong in Flutter code, generated project source, Git history, or client logs.
