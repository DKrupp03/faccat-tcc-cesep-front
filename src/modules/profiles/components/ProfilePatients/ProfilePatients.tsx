import { useEffect } from "react";

import { ProfileFormProvider } from "../../providers/ProfileFormProvider";
import { useProfilesList } from "../../hooks/useProfilesList";
import { useProfilesForm } from "../../hooks/useProfilesForm";
import { ProfilesTable } from "../ProfilesTable/ProfilesTable";
import { ProfilesHeader } from "../ProfilesHeader/ProfilesHeader";
import type { ProfileRole } from "../../types/profile";

type ProfilePatientsProps = {
  therapistId: number;
  onOpenFormReady?: (openForm: (role: ProfileRole) => void) => void;
};

const PatientFormBridge = ({
  onOpenFormReady,
}: {
  onOpenFormReady?: (openForm: (role: ProfileRole) => void) => void;
}) => {
  const { openForm } = useProfilesForm();

  useEffect(() => {
    onOpenFormReady?.(openForm);
  }, [openForm, onOpenFormReady]);

  return null;
};

export const ProfilePatients = ({ therapistId, onOpenFormReady }: ProfilePatientsProps) => {
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
      <PatientFormBridge onOpenFormReady={onOpenFormReady} />
      <ProfilesTable />
    </ProfileFormProvider>
  );
};

export const ProfilePatientsOptions = ({
  onCreateClick,
}: {
  onCreateClick?: () => void;
}) => {
  return <ProfilesHeader onCreateClick={onCreateClick} />;
};
