import { Navigate } from "react-router-dom";
import { Flex } from "antd";

import { useAuth } from "../modules/auth/hooks/useAuth";
import { PATHS } from "./paths";
import { MainSideMenu } from "@/shared/components/MainSideMenu/MainSideMenu";
import { CommonHeader } from "@/shared/components/CommonHeader/CommonHeader";
import { CommonFallbackLoading } from "@/shared/components/CommonFallbackLoading/CommonFallbackLoading";

import styles from "./PrivateRoute.module.css";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, profile } = useAuth();

  if (isAuthenticated && !profile) {
    return <CommonFallbackLoading />;
  }

  if (isAuthenticated) {
    return (
      <Flex>
        <MainSideMenu />
        <Flex
          gap={24} vertical
          className={styles.pageContent}
        >
          <CommonHeader />
          <Flex className={styles.pageBody}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    );
  }

  return <Navigate to={PATHS.login} replace />;
};

export default PrivateRoute;
