import { createContext, useContext, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { type User } from "../types/user";
import { useNotification } from "../hooks/useNotification";

import AuthService from "../services/AuthService";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { openNotification } = useNotification();

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await AuthService.signIn(email, password);
      localStorage.setItem("token", response.token);
      setToken(response.token);
    } catch {
      openNotification("error", t("login.errors.invalidCredentials"));
      throw new Error();
    }
  }, [t, openNotification]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
