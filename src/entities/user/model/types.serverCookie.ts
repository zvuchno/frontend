export type TServerAuthResponse = {
  authenticated: boolean;
};

export type TServerRefreshResponse = {
  refreshed: true;
};

export interface AuthResponse {
  access_token: string;
  access_expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  message: string;
}

export interface IRequest {
  email?: string;
  password?: string;
  new_password?: string;
  code?: string;
  user_id?: string;
}

export interface ICredentials extends IRequest {
  type: "registration" | "login" | "recoveryPass";
}
