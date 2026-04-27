import { useCallback } from "react";

import { CommonDrawer } from "@/shared/components/CommonDrawer/CommonDrawer";

import { useProfiles } from "../../hooks/useProfiles";

export const ProfileDrawer = () => {
  const {
    isFormOpen,
    setIsFormOpen,
  } = useProfiles();

  const handleClose = useCallback(() => {
    setIsFormOpen(false);
  }, [setIsFormOpen]);

  return (
    <>
      <CommonDrawer
        isOpen={isFormOpen}
        close={handleClose}
        title="Profile"
      >
        teste
      </CommonDrawer>
    </>
  );
};
