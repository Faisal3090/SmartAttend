/**
 * SmartAttend — TypeScript Type Definitions
 * User / Auth
 */

export type UserRole = 'student' | 'faculty' | 'admin';

export interface AuthUser {
  id: string;
  role: UserRole;
  displayName: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface LoginResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
}

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  tokens: AuthTokens | null;
}
