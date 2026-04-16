import { Navigate } from "react-router-dom";
import { Flex } from "antd";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { PATHS } from "./paths";
import { MainSideMenu } from "@/shared/components/MainSideMenu/MainSideMenu";
import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Flex>
        <MainSideMenu />
        <Flex style={{ marginLeft: 250, width: "calc(100vw - 250px)" }} gap={24} vertical>
          <CommonHeader />
          <Flex style={{ padding: "0px 30px" }}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return <Navigate to={PATHS.login} replace />;
};

export default PrivateRoute;
