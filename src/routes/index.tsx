import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../modules/auth/page";
import TherapistsPage from "../modules/therapists/page";

import PrivateRoute from "./PrivateRoute";
import { PATHS } from "./paths";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={PATHS.login} element={<LoginPage />} />
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
