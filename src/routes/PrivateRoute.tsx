import { Navigate } from "react-router-dom";
import { Flex } from "antd";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { PATHS } from "./paths";
import { MainSideMenu } from "@/shared/components/MainSideMenu/MainSideMenu";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <Flex>
        <MainSideMenu />
        {children}
      </Flex>
    );
  }

  return <Navigate to={PATHS.login} replace />;
}
