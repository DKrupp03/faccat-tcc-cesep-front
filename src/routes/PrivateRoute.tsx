import { Navigate } from "react-router-dom";
import { Flex } from "antd";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { PATHS } from "./paths";
import { CommonSideMenu } from "@/shared/components/CommonSideMenu/CommonSideMenu";
import { CommonFallbackLoading } from "@/shared/components/CommonFallbackLoading/CommonFallbackLoading";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, profile } = useAuth();

  if (isAuthenticated) {
    if (!profile) {
      return <CommonFallbackLoading />;
    }

    return (
      <Flex>
        <CommonSideMenu />
        {children}
      </Flex>
    );
  }

  return <Navigate to={PATHS.login} replace />;
};

export default PrivateRoute;
