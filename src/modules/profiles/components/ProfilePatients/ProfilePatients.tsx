import { useEffect } from "react";

import { ProfileFormProvider } from "../../providers/ProfileFormProvider";
import { useProfilesList } from "../../hooks/useProfilesList";
import { ProfilesTable } from "../ProfilesTable/ProfilesTable";
import { ProfilesHeader } from "../ProfilesHeader/ProfilesHeader";

type ProfilePatientsProps = {
  therapistId: number;
};

export const ProfilePatients = ({ therapistId }: ProfilePatientsProps) => {
  const { filtratePanel, profileFormCallback } = useProfilesList();

  useEffect(() => {
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProfileFormProvider
      afterSaveCallback={profileFormCallback}
      therapistId={therapistId}
    >
      <ProfilesTable />
    </ProfileFormProvider>
  );
};

export const ProfilePatientsOptions = () => {
  return (
    <ProfilesHeader />
  );
};
