import { useEffect } from "react";

import { ProfileFormProvider } from "../../providers/ProfileFormProvider";
import { useProfilesList } from "../../hooks/useProfilesList";
import { ProfilesTable } from "../ProfilesTable/ProfilesTable";
import { ProfilesHeader } from "../ProfilesHeader/ProfilesHeader";

export const ProfilePatients = () => {
  const { filtratePanel, profileFormCallback } = useProfilesList();

  useEffect(() => {
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileFormProvider afterSaveCallback={profileFormCallback}>
      <ProfilesTable />
    </ProfileFormProvider>
  );
};

export const ProfilePatientsOptions = () => {
  return (
    <ProfilesHeader />
  );
};
