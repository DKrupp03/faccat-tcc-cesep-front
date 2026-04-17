import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, ForgotPasswordPage, ResetPasswordPage } from "../modules/auth/page";
import ServicesPage from "@/modules/services/page";
import ProfilesPage from "@/modules/profiles/page";
import PaymentsPage from "@/modules/payments/page";

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
  ];

  const privateRoutes: RouteType[] = [
    { path: PATHS.services, element: <ServicesPage /> },
    { path: PATHS.therapists, element: <ProfilesPage module="therapists" /> },
    { path: PATHS.patients, element: <ProfilesPage module="patients" /> },
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
