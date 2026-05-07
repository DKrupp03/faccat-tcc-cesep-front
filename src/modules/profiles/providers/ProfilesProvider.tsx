import type { ModuleKey } from "@/shared/contexts/ModulesContext";

import { ProfilesListProvider } from "./ProfilesListProvider";
import { ProfileFormProvider } from "./ProfileFormProvider";
import { useProfilesList } from "../hooks/useProfilesList";

type ProfilesProviderProps = {
  module: ModuleKey;
  children: React.ReactNode;
};

export const ProfilesProvider = ({
  module,
  children,
}: ProfilesProviderProps) => (
  <ProfilesListProvider module={module}>
    <ProfilesProviderInner>{children}</ProfilesProviderInner>
  </ProfilesListProvider>
);

const ProfilesProviderInner = ({ children }: { children: React.ReactNode }) => {
  const { profileFormCallback } = useProfilesList();

  return (
    <ProfileFormProvider afterSaveCallback={profileFormCallback}>
      {children}
    </ProfileFormProvider>
  );
};
