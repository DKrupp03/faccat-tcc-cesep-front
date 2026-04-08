import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { useNotification } from "../shared/hooks/useNotification";
import { PATHS } from "./paths";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { openNotification } = useNotification();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  openNotification("warning", t("auth.errors.notAuthenticated"));
  return <Navigate to={PATHS.login} replace />;
}
