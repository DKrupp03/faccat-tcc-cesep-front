import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../modules/auth/page";
import TherapistsPage from "../modules/therapists/page";

import PrivateRoute from "./PrivateRoute";
import { useAuth } from "../modules/auth/hooks/useAuth";
import { PATHS } from "./paths";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path={PATHS.login}
        element={isAuthenticated ? <Navigate to={PATHS.therapists} replace /> : <LoginPage />}
      />
      <Route
        path={PATHS.therapists}
        element={
          <PrivateRoute>
            <TherapistsPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to={PATHS.login} replace />} />
    </Routes>
  );
}
