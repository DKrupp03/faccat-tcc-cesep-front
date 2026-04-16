import { useState, useCallback, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useNotification } from "@/shared/hooks/useNotification";
import { PATHS, DEFAULT_PATH } from "@/routes/paths";

import { authStorage } from "../utils/authStorage";
import { type BasicUser } from "../types/user";
import { type Profile } from "@/modules/auth/types/profile";
import { AuthService } from "../services/AuthService";
import ProfilesService from "@/modules/therapists/services/ProfilesService";
import { AuthContext } from "../contexts/AuthContext";

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

  useEffect(() => {
    if (!user) return;

    (async () => {
      const response = await ProfilesService.getProfile(user.profile_id);

      if (response.success) {
        setProfile(response.profile);
      }
    })();
  }, [user]);

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
};
