import { Navigate } from "react-router-dom";
import { Flex } from "antd";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { PATHS } from "./paths";
import { MainSideMenu } from "@/shared/components/MainSideMenu/MainSideMenu";
import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Flex>
        <MainSideMenu />
        <Flex style={{ marginLeft: 250, padding: 30 }} gap={24} vertical>
          <CommonHeader />
          {children}
        </Flex>
      </Flex>
    );
  }

  return <Navigate to={PATHS.login} replace />;
}
