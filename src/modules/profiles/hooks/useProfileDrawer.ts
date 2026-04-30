import { useCallback, useState } from "react";

import { useProfilesForm } from "./useProfilesForm";

export type ProfileDrawerTab = "form" | "anamnese" | "medicalRecords" | "services" | "payments" | "patients";

export const useProfileDrawer = () => {
  const { isFormOpen, profile, editingRole, closeForm } = useProfilesForm();

  const [tab, setTab] = useState<ProfileDrawerTab>("form");

  const handleClose = useCallback(() => closeForm(), [closeForm]);

  const handleChangeTab = useCallback((key: string) => setTab(key as ProfileDrawerTab), []);

  return {
    isFormOpen,
    profile,
    editingRole,
    tab,
    handleClose,
    handleChangeTab,
  };
};
