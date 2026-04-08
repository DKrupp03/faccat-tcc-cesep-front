import React, { type ReactNode, Suspense } from "react";

import { CommonFallbackLoading } from "../components/CommonFallbackLoading/CommonFallbackLoading";

const AuthProvider = React.lazy(() =>
  import("@/modules/auth/contexts/AuthContext").then((mod) => ({
    default: mod.AuthProvider,
  })),
);

const providers = [AuthProvider];

export const GlobalProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense fallback={<CommonFallbackLoading />}>
      {providers.reduceRight(
        (acc, Provider) => (
          <Provider>{acc}</Provider>
        ),
        children,
      )}
    </Suspense>
  );
};
