export type BuildFormat = "apk" | "aab";
export type BuildStatus =
  | "queued"
  | "validating"
  | "building"
  | "testing"
  | "security_check"
  | "completed"
  | "failed"
  | "cancelled";

export interface BuildJob {
  id: string;
  projectId: string;
  userId: string;
  format: BuildFormat;
  status: BuildStatus;
  attempt: number;
  maxAttempts: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  artifactId?: string;
  errorCode?: string;
  errorMessage?: string;
}

export interface BuildLimits {
  maxAttempts: number;
  maxDurationSeconds: number;
  maxCpuSeconds: number;
  maxMemoryMb: number;
  maxDiskMb: number;
  maxArtifactMb: number;
}

export const DEFAULT_BUILD_LIMITS: BuildLimits = {
  maxAttempts: 3,
  maxDurationSeconds: 900,
  maxCpuSeconds: 600,
  maxMemoryMb: 2048,
  maxDiskMb: 4096,
  maxArtifactMb: 500,
};
