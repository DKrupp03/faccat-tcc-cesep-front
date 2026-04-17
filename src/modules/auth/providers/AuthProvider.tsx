import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useNotification } from "@/shared/hooks/useNotification";
import { PATHS, DEFAULT_PATH } from "@/routes/paths";

import { authStorage } from "../utils/authStorage";
import { type BasicUser } from "../../therapists/types/user";
import { type Profile } from "@/modules/therapists/types/profile";
import { AuthService } from "../services/AuthService";
import { AuthContext } from "../contexts/AuthContext"
import { useProfilesOperations } from "@/modules/therapists/hooks/useProfilesOperations";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { openNotification } = useNotification();
  const { fetchProfile } = useProfilesOperations();

  const [token, setToken] = useState<string | null>(() => authStorage.getToken());
  const [user, setUser] = useState<BasicUser | null>(() => authStorage.getUser());
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user) return;

    (async () => {
      const response = await fetchProfile(user.profile_id);
      if (response.success) setProfile(response.profile);
    })();
  }, [user, fetchProfile]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await AuthService.signIn(email, password);

      authStorage.set(response.token, response.user);

      setToken(response.token);
      setUser(response.user);

      navigate(DEFAULT_PATH, { replace: true });
    } catch (error) {
      openNotification("error", t("auth.errors.invalidCredentials"));
      console.error(error, t("auth.errors.invalidCredentials"));
    }
  }, [t, openNotification, navigate]);

  const logout = useCallback(async () => {
    try {
      const response = await AuthService.logout();

      if (response.success) {
        authStorage.clear();

        setToken(null);
        setUser(null);

        navigate(PATHS.login, { replace: true });
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    }
  }, [t, navigate]);

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
};
