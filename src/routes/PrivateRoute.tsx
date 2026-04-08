import { Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { PATHS } from "./paths";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <Navigate to={PATHS.login} replace />;
}
