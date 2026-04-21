import { Navigate } from "react-router-dom";
import { Flex } from "antd";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { PATHS } from "./paths";
import { MainSideMenu } from "@/shared/components/MainSideMenu/MainSideMenu";
import { CommonFallbackLoading } from "@/shared/components/CommonFallbackLoading/CommonFallbackLoading";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, profile } = useAuth();

  if (isAuthenticated) {
    if (!profile) {
      return <CommonFallbackLoading />;
    }

    return (
      <Flex>
        <MainSideMenu />
        {children}
      </Flex>
    );
  }

  return <Navigate to={PATHS.login} replace />;
};

export default PrivateRoute;
