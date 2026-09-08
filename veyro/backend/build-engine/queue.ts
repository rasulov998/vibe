import type { BuildJob, BuildFormat } from "./types";

export interface CreateBuildInput {
  projectId: string;
  userId: string;
  format: BuildFormat;
}

export function createBuildJob(input: CreateBuildInput, now = new Date().toISOString()): BuildJob {
  if (!input.projectId || !input.userId) {
    throw new Error("projectId and userId are required.");
  }

  return {
    id: crypto.randomUUID(),
    projectId: input.projectId,
    userId: input.userId,
    format: input.format,
    status: "queued",
    attempt: 0,
    maxAttempts: 3,
    createdAt: now,
  };
}
