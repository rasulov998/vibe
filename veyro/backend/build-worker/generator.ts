import type { ProjectManifest } from "../project-engine/types";

export interface GeneratedFile {
  path: string;
  content: string;
}

export function generateAndroidProject(
  manifest: ProjectManifest,
): GeneratedFile[] {
  // V1: deterministic generation contract.
  // Actual Android templates are added after the isolated worker runtime is provisioned.
  return [
    {
      path: "VEYRO_PROJECT_MANIFEST.json",
      content: JSON.stringify(manifest, null, 2),
    },
  ];
}
