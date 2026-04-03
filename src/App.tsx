import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import LoginPage from './pages/login/LoginPage';
import TherapistsPage from './pages/therapists/TherapistsPage';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useNotification } from "./hooks/useNotification";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { openNotification } = useNotification();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  openNotification("warning", t("auth.errors.notAuthenticated"));
  return <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/therapists"
          element={
            <PrivateRoute>
              <TherapistsPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}
