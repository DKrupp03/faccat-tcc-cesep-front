import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {
          // <Route
          //   path="/dashboard"
          //   element={
          //     <PrivateRoute>
          //       <DashboardPage />
          //     </PrivateRoute>
          //   }
          // />
        }
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}
