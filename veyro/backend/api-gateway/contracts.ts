export type ProviderStatus = "approved" | "conditional" | "hold";

export type AuthMode =
  | "none"
  | "api_key"
  | "api_key_or_plan"
  | "key_or_supporter"
  | "api_access"
  | "varies";

export interface ProviderRecord {
  id: string;
  category: string;
  status: ProviderStatus;
  auth: AuthMode;
  baseUrl: string;
}

export interface GatewayRequest {
  providerId: string;
  operation: string;
  input: Record<string, unknown>;
  userId?: string;
}

export interface GatewayResponse<T = unknown> {
  ok: boolean;
  providerId: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    retryable: boolean;
  };
  requestId: string;
}
