export type ProjectKind = "app" | "game_2d";

export interface ProjectManifest {
  schemaVersion: 1;
  projectId: string;
  name: string;
  kind: ProjectKind;
  description: string;
  screens: ScreenDefinition[];
  assets: AssetDefinition[];
  apiBindings: ApiBinding[];
  build: BuildConfig;
}

export interface ScreenDefinition {
  id: string;
  name: string;
  components: ComponentDefinition[];
}

export interface ComponentDefinition {
  id: string;
  type:
    | "text"
    | "image"
    | "button"
    | "input"
    | "list"
    | "card"
    | "video"
    | "player"
    | "enemy"
    | "coin"
    | "platform"
    | "background";
  properties: Record<string, unknown>;
  actions: ActionDefinition[];
}

export interface ActionDefinition {
  type:
    | "navigate"
    | "open_url"
    | "api_request"
    | "set_state"
    | "play_sound";
  params: Record<string, unknown>;
}

export interface AssetDefinition {
  id: string;
  kind: "image" | "audio" | "font" | "other";
  source: "generated" | "upload" | "remote";
  uri?: string;
}

export interface ApiBinding {
  id: string;
  providerId: string;
  operation: string;
  config: Record<string, unknown>;
}

export interface BuildConfig {
  packageId: string;
  versionName: string;
  minSdk: number;
  targetSdk: number;
}
