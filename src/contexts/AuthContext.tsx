import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useNotification } from "../hooks/useNotification";

import { authStorage } from "../utils/authStorage";
import { type AuthContextType } from "../types/auth";
import { type BasicUser } from "../types/user";
import { type Profile } from "../types/profile";
import AuthService from "../services/AuthService";
import ProfilesService from "../services/ProfilesService";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { openNotification } = useNotification();

  const [token, setToken] = useState<string | null>(() => authStorage.getToken());
  const [user, setUser] = useState<BasicUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  const getProfile = useCallback(async (profileId: number) => {
    const response = await ProfilesService.getProfile(profileId);

    if (response.success) {
      setProfile(response.profile);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await AuthService.signIn(email, password);

      authStorage.set(response.token, response.user);

      setToken(response.token);
      setUser(response.user);
      getProfile(response.user.profile_id);
    } catch {
      openNotification("error", t("login.errors.invalidCredentials"));
      throw new Error();
    }
  }, [t, getProfile, openNotification]);

  const logout = useCallback(() => {
    authStorage.clear();

    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const storedToken = authStorage.getToken();
    const storedUser = authStorage.getUser();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      getProfile(storedUser.profile_id);
    } else {
      setToken(null);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        profile,
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
