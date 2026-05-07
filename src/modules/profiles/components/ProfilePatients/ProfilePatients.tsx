import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { CommonButton } from "@/shared/components/CommonButton/CommonButton";

import { ProfileFormProvider } from "../../providers/ProfileFormProvider";
import { useProfilesList } from "../../hooks/useProfilesList";
import { useProfilesForm } from "../../hooks/useProfilesForm";
import { ProfilesTable } from "../ProfilesTable/ProfilesTable";

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
  const { t } = useTranslation();
  const { openForm } = useProfilesForm();

  return (
    <CommonButton
      buttonVariant="primary"
      onClick={() => openForm("patient")}
    >
      {t("profiles.patients.actions.create")}
    </CommonButton>
  );
};
