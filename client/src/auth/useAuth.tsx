import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { api, type LoginResponse, setAuthToken } from "../api/client";
import { toast } from "react-hot-toast";

type User = { id: string; email: string; role: string } | null;

type AuthContextType = {
  user: User;
  token: string | null;
  signup: (email: string, password: string) => Promise<void>;
  login:  (email: string, password: string) => Promise<void>;
  logout: () => void;
  resendVerification: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);
const LS_KEY = "auth";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser]   = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      const parsedUser = parsed && typeof parsed === "object" && "user" in parsed ? (parsed.user as User) : null;
      const parsedToken = parsed && typeof parsed === "object" && typeof parsed.token === "string" ? (parsed.token as string) : null;

      setUser(parsedUser ?? null);
      setToken(parsedToken ?? null);
      setAuthToken(parsedToken ?? null);
    } catch {
      localStorage.removeItem(LS_KEY);
    }
  }, []);

  const persist = useCallback((payload: { user: User; token: string | null }) => {
    setUser(payload.user);
    setToken(payload.token);
    setAuthToken(payload.token);
    if (payload.token) {
      localStorage.setItem(LS_KEY, JSON.stringify(payload));
    } else {
      localStorage.removeItem(LS_KEY);
    }
  }, []);

  const fetchCsrfToken = useCallback(async () => {
    const res = await api.get<{ csrfToken: string }>("/auth/csrf-token", {
    credentials: "include"
    });
    return res.csrfToken;
  }, []);

  const signup = useCallback(async (email: string, password: string) => {
    const csrfToken = await fetchCsrfToken();
    const res = await api.post<LoginResponse>(
      "/auth/signup",
      { email, password },
      { headers: { "X-CSRF-Token": csrfToken }, credentials: "include"}
    );
    persist({ user: res.user, token: res.token });
    toast.success(`Account created! Welcome ${res.user.email}`);
  }, [persist, fetchCsrfToken]);

  const login = useCallback(async (email: string, password: string) => {
    const csrfToken = await fetchCsrfToken();
    const res = await api.post<LoginResponse>(
      "/auth/login",
      { email, password },
      { headers: { "X-CSRF-Token": csrfToken }, credentials: "include"}
    );
    persist({ user: res.user, token: res.token });
    toast.success(`Welcome ${res.user.email}`);
  }, [persist, fetchCsrfToken]);

  const resendVerification = useCallback(async (email: string) => {
    const csrfToken = await fetchCsrfToken();
    await api.post<{ message: string }>(
      "/auth/resend-verification",
      { email },
      { headers: { "X-CSRF-Token": csrfToken }, credentials: "include"}
    );
  }, [fetchCsrfToken]);

  const logout = useCallback(() => {
    console.log("[logout] done");
    persist({ user: null, token: null });
  }, [persist]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === LS_KEY && e.newValue === null) {
        setAuthToken(null);
        setUser(null);
        setToken(null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo(
    () => ({ user, token, signup, login, logout, resendVerification }),
    [user, token, signup, login, logout, resendVerification]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};
