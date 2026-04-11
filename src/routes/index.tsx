import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, ForgotPasswordPage, ResetPasswordPage } from "../modules/auth/page";
import ServicesPage from "@/modules/services/page";
import TherapistsPage from "../modules/therapists/page";
import PatientsPage from "@/modules/patients/page";
import PaymentsPage from "@/modules/payments/page";

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
        path={PATHS.forgotPassword}
        element={<ForgotPasswordPage />}
      />
      <Route
        path={PATHS.resetPassword}
        element={<ResetPasswordPage />}
      />
      <Route
        path={PATHS.services}
        element={
          <PrivateRoute>
            <ServicesPage />
          </PrivateRoute>
        }
      />
      <Route
        path={PATHS.therapists}
        element={
          <PrivateRoute>
            <TherapistsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={PATHS.patients}
        element={
          <PrivateRoute>
            <PatientsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={PATHS.payments}
        element={
          <PrivateRoute>
            <PaymentsPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to={PATHS.login} replace />} />
    </Routes>
  );
}
