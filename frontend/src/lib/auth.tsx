"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { login as apiLogin, type User, api } from "@/lib/api";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem("mia_token");
    const u = localStorage.getItem("mia_user");
    if (t && u) {
      setToken(t);
      setUser(JSON.parse(u));
      api("/auth/me")
        .then((me) => {
          setUser(me as User);
          localStorage.setItem("mia_user", JSON.stringify(me));
        })
        .catch(() => {
          localStorage.removeItem("mia_token");
          localStorage.removeItem("mia_user");
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiLogin(email, password);
    localStorage.setItem("mia_token", res.access_token);
    localStorage.setItem("mia_user", JSON.stringify(res.user));
    setToken(res.access_token);
    setUser(res.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("mia_token");
    localStorage.removeItem("mia_user");
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, login, logout }),
    [user, token, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
