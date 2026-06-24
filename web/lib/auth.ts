/**
 * Client-side session helpers. Gojo Africa's web app stores the JWT and a
 * small user profile snapshot in localStorage so the header nav and
 * auth-gated pages (e.g. /properties/new) can read auth state without a
 * server round-trip on every render. Token verification still happens
 * server-side on every API call -- this is just UI state.
 */

export interface AuthUser {
  id: string;
  phone: string | null;
  email: string | null;
  full_name: string;
  role: string;
  locale?: string;
  trust_score: number;
  verification_status: string;
}

const TOKEN_KEY = "gojoafrica_token";
const USER_KEY = "gojoafrica_user";

export function saveSession(token: string, user: AuthUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
