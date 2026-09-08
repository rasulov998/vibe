# VEYRO AI Orchestrator — V1

The orchestrator converts a user's project request into a controlled build plan.

Flow:
Prompt → classify → plan → specialist tasks → review → test → fix loop → preview/build approval.

## Guardrails

- The client never calls model providers directly.
- Provider/model credentials remain server-side.
- Every task has an explicit input/output contract.
- Specialist agents cannot publish a build directly.
- The Judge/QA stage can reject a plan or request fixes.
- Maximum fix iterations are bounded.
- Project context is scoped to the current project.
- Secrets and credentials are excluded from model context and logs.

## Agent roles

1. Architect
2. Developer
3. Game
4. UI/UX
5. Graphics
6. Audio
7. Logic
8. Security
9. Performance
10. Android
11. iOS (future)
12. Bug Hunter
13. Testing
14. Localization
15. Accessibility
16. Monetization
17. Privacy
18. Quality
19. Documentation
20. Judge

The first V1 implementation may route multiple roles to the same underlying model/provider. The roles are logical responsibilities, not a promise of 20 separate model subscriptions.
