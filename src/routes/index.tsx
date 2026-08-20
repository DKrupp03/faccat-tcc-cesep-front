import { Routes, Route, Navigate } from "react-router-dom";

import { LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, SetPasswordPage } from "../modules/auth/pages";
import { ServicesPage } from "@/modules/services/pages";
import { TherapistsPage } from "@/modules/therapists/pages";
import { PatientsPage } from "@/modules/patients/pages";
import { PaymentsPage } from "@/modules/payments/pages";

import PrivateRoute from "./PrivateRoute";
import { useAuth } from "../modules/auth/hooks/useAuth";
import { CommonFallbackLoading } from "@/shared/components/CommonFallbackLoading/CommonFallbackLoading";
import { PATHS, DEFAULT_PATH } from "./paths";

type RouteType = {
  path: string;
  element: React.ReactNode;
  requireAdmin?: boolean;
};

const AppRoutes = () => {
  const { isAuthenticated, initializing } = useAuth();

  // Aguarda a reidratação da sessão (GET /me) antes de decidir a rota, senão o
  // usuário logado seria redirecionado ao login ao recarregar a página.
  if (initializing) {
    return <CommonFallbackLoading />;
  }

  const authRoutes: RouteType[] = [
    { path: PATHS.login, element: <LoginPage /> },
    { path: PATHS.register, element: <RegisterPage /> },
    { path: PATHS.forgotPassword, element: <ForgotPasswordPage /> },
    { path: PATHS.resetPassword, element: <ResetPasswordPage /> },
    { path: PATHS.setPassword, element: <SetPasswordPage /> },
  ];

  const privateRoutes: RouteType[] = [
    { path: PATHS.services, element: <ServicesPage /> },
    { path: PATHS.therapists, element: <TherapistsPage />, requireAdmin: true },
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
          element={
            <PrivateRoute requireAdmin={route.requireAdmin}>
              {route.element}
            </PrivateRoute>
          }
        />
      ))}

      <Route path="*" element={<Navigate to={DEFAULT_PATH} replace />} />
    </Routes>
  );
};

export default AppRoutes;
