import { createContext, useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useNotification } from "@/shared/hooks/useNotification";

import { authStorage } from "../utils/authStorage";
import { type AuthContextType } from "../types/auth";
import { type BasicUser } from "../types/user";
import { type Profile } from "@/modules/therapists/types/profile";
import AuthService from "../services/AuthService";
import ProfilesService from "@/modules/therapists/services/ProfilesService";

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { openNotification } = useNotification();

  const [token, setToken] = useState<string | null>(() => authStorage.getToken());
  const [user, setUser] = useState<BasicUser | null>(() => authStorage.getUser());
  const [profile, setProfile] = useState<Profile | null>(null);

  const getProfile = useCallback(async (profileId: number) => {
    const response = await ProfilesService.getProfile(profileId);

    if (response.success) {
      setProfile(response.profile);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getProfile(user.profile_id);
    }
  }, [getProfile, user]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await AuthService.signIn(email, password);

      authStorage.set(response.token, response.user);

      setToken(response.token);
      setUser(response.user);
    } catch {
      openNotification("error", t("login.errors.invalidCredentials"));
      throw new Error();
    }
  }, [t, openNotification]);

  const logout = useCallback(() => {
    authStorage.clear();

    setToken(null);
    setUser(null);
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
