/**
 * SmartAttend — AuthContext & AuthProvider
 *
 * Manages:
 * - Authentication state (user, role, tokens)
 * - Login / Logout actions
 * - Session persistence via expo-secure-store (native) / localStorage (web)
 * - Loading state for initial session restore
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { loginApi } from '../api/client';
import { AuthState, AuthUser, AuthTokens, UserRole } from '../types/auth';

import { apiRequest } from '../services/api';

// ─── Platform-safe storage ───────────────────────────────────────────────────
// expo-secure-store doesn't work on web; fall back to localStorage.
const Storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  deleteItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

// ─── Keys ────────────────────────────────────────────────────────────────────
const KEYS = {
  USER: 'smartattend_user',
  ACCESS_TOKEN: 'smartattend_access_token',
  REFRESH_TOKEN: 'smartattend_refresh_token',
} as const;

// ─── Context shape ────────────────────────────────────────────────────────────
interface AuthContextValue extends AuthState {
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  role: UserRole | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    tokens: null,
  });

  // ── Restore session on mount ──────────────────────────────────────────────
  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const [userJson, accessToken, refreshToken] = await Promise.all([
        Storage.getItem(KEYS.USER),
        Storage.getItem(KEYS.ACCESS_TOKEN),
        Storage.getItem(KEYS.REFRESH_TOKEN),
      ]);

      if (userJson && accessToken) {
        const user: AuthUser = JSON.parse(userJson);
        setState({
          isLoading: false,
          isAuthenticated: true,
          user,
          tokens: { accessToken, refreshToken: refreshToken ?? undefined },
        });
      } else {
        setState((s) => ({ ...s, isLoading: false }));
      }
    } catch {
      // Corrupted storage — start fresh
      await clearStorage();
      setState({ isLoading: false, isAuthenticated: false, user: null, tokens: null });
    }
  };

  // ── Login ─────────────────────────────────────────────────────────────────
 const login = useCallback(async (identifier: string, password: string) => {
  const response = await loginApi(identifier, password);

  const user: AuthUser = {
    id: String(response.data.user.id),
    displayName: response.data.user.name,
    role: response.data.user.role.toLowerCase() as UserRole,
  };

  const tokens: AuthTokens = {
    accessToken: response.data.token,
  };

  await Promise.all([
    Storage.setItem(KEYS.USER, JSON.stringify(user)),
    Storage.setItem(KEYS.ACCESS_TOKEN, tokens.accessToken),
    Storage.deleteItem(KEYS.REFRESH_TOKEN),
  ]);

  setState({
    isLoading: false,
    isAuthenticated: true,
    user,
    tokens,
  });
}, []);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await clearStorage();
    setState({ isLoading: false, isAuthenticated: false, user: null, tokens: null });
  }, []);

  const clearStorage = async () => {
    await Promise.all([
      Storage.deleteItem(KEYS.USER).catch(() => {}),
      Storage.deleteItem(KEYS.ACCESS_TOKEN).catch(() => {}),
      Storage.deleteItem(KEYS.REFRESH_TOKEN).catch(() => {}),
    ]);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      role: state.user?.role ?? null,
      login,
      logout,
    }),
    [state, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
