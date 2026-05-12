import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, ForgotPasswordPage, ResetPasswordPage, SetPasswordPage } from "../modules/auth/pages";
import { ServicesPage } from "@/modules/services/pages";
import { TherapistsPage } from "@/modules/therapists/pages";
import { PatientsPage } from "@/modules/patients/pages";
import { PaymentsPage } from "@/modules/payments/pages";

import PrivateRoute from "./PrivateRoute";
import { useAuth } from "../modules/auth/hooks/useAuth";
import { PATHS, DEFAULT_PATH } from "./paths";

type RouteType = {
  path: string;
  element: React.ReactNode;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  const authRoutes: RouteType[] = [
    { path: PATHS.login, element: <LoginPage /> },
    { path: PATHS.forgotPassword, element: <ForgotPasswordPage /> },
    { path: PATHS.resetPassword, element: <ResetPasswordPage /> },
    { path: PATHS.setPassword, element: <SetPasswordPage /> },
  ];

  const privateRoutes: RouteType[] = [
    { path: PATHS.services, element: <ServicesPage /> },
    { path: PATHS.therapists, element: <TherapistsPage /> },
    { path: PATHS.patients, element: <PatientsPage /> },
    { path: PATHS.payments, element: <PaymentsPage /> },
  ];

  return (
    <Routes>
      {authRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={isAuthenticated ? <Navigate to={DEFAULT_PATH} replace /> : route.element}
        />
      ))}

      {privateRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<PrivateRoute>{route.element}</PrivateRoute>}
        />
      ))}

      <Route path="*" element={<Navigate to={DEFAULT_PATH} replace />} />
    </Routes>
  );
};

export default AppRoutes;
