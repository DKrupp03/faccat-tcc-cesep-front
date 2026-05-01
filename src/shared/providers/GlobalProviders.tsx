import React, { type ReactNode, Suspense } from "react";

import { CommonFallbackLoading } from "../components/CommonFallbackLoading/CommonFallbackLoading";

const AuthProvider = React.lazy(() =>
  import("@/modules/auth/providers/AuthProvider").then((mod) => ({
    default: mod.AuthProvider,
  })),
);

const ModulesProvider = React.lazy(() =>
  import("@/shared/providers/ModulesProvider").then((mod) => ({
    default: mod.ModulesProvider,
  })),
);

const ModalsProvider = React.lazy(() =>
  import("@/shared/providers/ModalsProvider").then((mod) => ({
    default: mod.ModalsProvider,
  })),
);

const ProfileFormProvider = React.lazy(() =>
  import("@/modules/profiles/providers/ProfileFormProvider").then((mod) => ({
    default: mod.ProfileFormProvider,
  })),
);

const providers = [
  AuthProvider,
  ModulesProvider,
  ModalsProvider,
  ProfileFormProvider,
];

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
