import type {
  ComponentDefinition,
  ProjectManifest,
} from "./types";

const COMPONENT_TYPES = new Set<ComponentDefinition["type"]>([
  "text", "image", "button", "input", "list", "card", "video",
  "player", "enemy", "coin", "platform", "background",
]);

const ACTION_TYPES = new Set([
  "navigate", "open_url", "api_request", "set_state", "play_sound",
]);

export function validateProjectManifest(project: ProjectManifest): string[] {
  const errors: string[] = [];

  if (project.schemaVersion !== 1) errors.push("Unsupported schema version.");
  if (!/^[a-zA-Z0-9._-]{3,80}$/.test(project.projectId)) errors.push("Invalid projectId.");
  if (!project.name.trim()) errors.push("Project name is required.");
  if (!project.screens.length) errors.push("At least one screen is required.");

  for (const screen of project.screens) {
    if (!screen.id || !screen.name.trim()) errors.push("Every screen needs an id and name.");

    for (const component of screen.components) {
      if (!COMPONENT_TYPES.has(component.type)) {
        errors.push(`Unsupported component type: ${component.type}`);
      }
      for (const action of component.actions) {
        if (!ACTION_TYPES.has(action.type)) {
          errors.push(`Unsupported action type: ${action.type}`);
        }
      }
    }
  }

  if (!/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/.test(project.build.packageId)) {
    errors.push("Invalid Android packageId.");
  }

  if (!/^\d+\.\d+\.\d+$/.test(project.build.versionName)) {
    errors.push("versionName must use semantic version format.");
  }

  if (project.build.minSdk < 21) errors.push("minSdk must be >= 21.");
  if (project.build.targetSdk < project.build.minSdk) {
    errors.push("targetSdk cannot be below minSdk.");
  }

  for (const binding of project.apiBindings) {
    if (!binding.providerId || !binding.operation) {
      errors.push("API bindings require providerId and operation.");
    }
    if (JSON.stringify(binding.config).match(/(api[_-]?key|secret|token|password)/i)) {
      errors.push(`Secrets are not allowed in API binding config: ${binding.id}`);
    }
  }

  return errors;
}
