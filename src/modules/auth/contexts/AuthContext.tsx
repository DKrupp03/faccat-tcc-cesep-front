import { createContext, useState, useCallback, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useNotification } from "@/shared/hooks/useNotification";
import { PATHS, DEFAULT_PATH } from "@/routes/paths";

import { authStorage } from "../utils/authStorage";
import { type AuthContextType } from "../types/auth";
import { type BasicUser } from "../types/user";
import { type Profile } from "@/modules/auth/types/profile";
import { AuthService } from "../services/AuthService";
import ProfilesService from "@/modules/therapists/services/ProfilesService";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openNotification } = useNotification();

  const [token, setToken] = useState<string | null>(() => authStorage.getToken());
  const [user, setUser] = useState<BasicUser | null>(() => authStorage.getUser());
  const [profile, setProfile] = useState<Profile | null>(null);

  const isAdmin = useMemo(() => (
    profile?.role === "admin"
  ), [profile?.role]);

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

      navigate(DEFAULT_PATH, { replace: true });
    } catch {
      openNotification("error", t("auth.errors.invalidCredentials"));
      throw new Error();
    }
  }, [t, openNotification, navigate]);

  const logout = useCallback(async () => {
    const response = await AuthService.logout();

    if (response.success) {
      authStorage.clear();

      setToken(null);
      setUser(null);

      navigate(PATHS.login, { replace: true });
    }
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        profile,
        isAdmin,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
