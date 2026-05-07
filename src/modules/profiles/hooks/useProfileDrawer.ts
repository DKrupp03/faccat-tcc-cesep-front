import { useCallback, useState, useEffect } from "react";

import { useProfilesForm } from "./useProfilesForm";

export type ProfileDrawerTab = "form" | "anamnese" | "medicalRecords" | "services" | "payments" | "patients";

export const useProfileDrawer = () => {
  const { isFormOpen, profile, editingRole, closeForm } = useProfilesForm();

  const [tab, setTab] = useState<ProfileDrawerTab>("form");

  useEffect(() => {
    setTab("form");
  }, [editingRole]);

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
