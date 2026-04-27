import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { CommonDrawer } from "@/shared/components/CommonDrawer/CommonDrawer";

import { useProfiles } from "../../hooks/useProfiles";
import { ProfileForm } from "../ProfileForm/ProfileForm";

type TabsType = "form"
  | "anamnese"
  | "medicalRecords"
  | "services"
  | "payments";

export const ProfileDrawer = () => {
  const { t } = useTranslation();
  const {
    isFormOpen,
    setIsFormOpen,
    profile,
    editingRole,
  } = useProfiles();

  const [tab, setTab] = useState<TabsType>("form");

  const title = useMemo(() => {
    if (!profile?.id) {
      return t(`profiles.${editingRole}s.actions.create`);
    }

    if (tab === "form") {
      return t(`profiles.${editingRole}s.actions.edit`);
    }

    return "";
  }, [t, profile?.id, editingRole]);

  const handleClose = useCallback(() => {
    setIsFormOpen(false);
  }, [setIsFormOpen]);

  return (
    <>
      <CommonDrawer
        isOpen={isFormOpen}
        close={handleClose}
        title={title}
      >
        {tab === "form" && <ProfileForm />}
      </CommonDrawer>
    </>
  );
};
