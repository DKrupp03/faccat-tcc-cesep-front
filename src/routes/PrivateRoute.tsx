import { Navigate } from "react-router-dom";
import { Flex } from "antd";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { PATHS, DEFAULT_PATH } from "./paths";
import { CommonSideMenu } from "@/shared/components/CommonSideMenu/CommonSideMenu";
import { CommonFallbackLoading } from "@/shared/components/CommonFallbackLoading/CommonFallbackLoading";

type PrivateRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

const PrivateRoute = ({ children, requireAdmin = false }: PrivateRouteProps) => {
  const { isAuthenticated, profile } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.login} replace />;
  }

  if (!profile) {
    return <CommonFallbackLoading />;
  }

  // Esconder a aba no menu não basta: sem esta checagem, digitar /therapists
  // na URL abria o painel inteiro para qualquer usuário autenticado.
  if (requireAdmin && !profile.admin) {
    return <Navigate to={DEFAULT_PATH} replace />;
  }

  return (
    <Flex>
      <CommonSideMenu />
      {children}
    </Flex>
  );
};

export default PrivateRoute;
