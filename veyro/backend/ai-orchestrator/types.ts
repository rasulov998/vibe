export type ProjectType = "app" | "game_2d";

export type AgentRole =
  | "architect"
  | "developer"
  | "game"
  | "ui_ux"
  | "graphics"
  | "audio"
  | "logic"
  | "security"
  | "performance"
  | "android"
  | "ios_future"
  | "bug_hunter"
  | "testing"
  | "localization"
  | "accessibility"
  | "monetization"
  | "privacy"
  | "quality"
  | "documentation"
  | "judge";

export type TaskStatus = "queued" | "running" | "passed" | "failed" | "blocked";

export interface ProjectRequest {
  projectId: string;
  prompt: string;
  language: string;
  projectType?: ProjectType;
}

export interface BuildPlan {
  projectType: ProjectType;
  summary: string;
  features: string[];
  requiredApis: string[];
  risks: string[];
  acceptanceCriteria: string[];
}

export interface AgentTask {
  id: string;
  role: AgentRole;
  objective: string;
  input: Record<string, unknown>;
  output?: Record<string, unknown>;
  status: TaskStatus;
}

export interface OrchestrationResult {
  projectId: string;
  plan: BuildPlan;
  tasks: AgentTask[];
  readyForPreview: boolean;
  readyForBuild: boolean;
}
