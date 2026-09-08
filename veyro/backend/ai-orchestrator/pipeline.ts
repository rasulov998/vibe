import type {
  AgentRole,
  AgentTask,
  BuildPlan,
  ProjectRequest,
} from "./types";

const ROLES: AgentRole[] = [
  "architect", "developer", "game", "ui_ux", "graphics", "audio",
  "logic", "security", "performance", "android", "ios_future",
  "bug_hunter", "testing", "localization", "accessibility",
  "monetization", "privacy", "quality", "documentation", "judge",
];

export function createInitialPlan(request: ProjectRequest): BuildPlan {
  const text = request.prompt.trim();

  if (!text) {
    throw new Error("Project prompt cannot be empty.");
  }

  const type = request.projectType ??
    (/\b(game|игра|бозӣ)\b/i.test(text) ? "game_2d" : "app");

  return {
    projectType: type,
    summary: text.slice(0, 500),
    features: [],
    requiredApis: [],
    risks: [],
    acceptanceCriteria: [
      "Project builds without compilation errors.",
      "Core user flow works in preview.",
      "Automated tests pass.",
      "Security checks pass.",
    ],
  };
}

export function createAgentTasks(plan: BuildPlan, projectId: string): AgentTask[] {
  return ROLES.map((role, index) => ({
    id: `${projectId}-agent-${index + 1}`,
    role,
    objective: role === "judge"
      ? "Review all specialist results and decide whether the project can proceed."
      : `Perform the ${role} review/build responsibility for this project.`,
    input: { plan },
    status: "queued",
  }));
}
