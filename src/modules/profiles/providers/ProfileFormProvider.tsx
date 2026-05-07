import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useNotification } from "@/shared/hooks/useNotification";
import { useModals } from "@/shared/hooks/useModals";

import { ProfilesFormContext } from "../contexts/ProfilesFormContext";
import { useProfilesOperations } from "../hooks/useProfilesOperations";
import type { Profile, ProfileRole } from "../types/profile";
import { ProfileDrawer } from "../components/ProfileDrawer/ProfileDrawer";

type ProfileFormProviderProps = {
  afterSaveCallback?: (
    operation: "create" | "update" | "delete",
    profile: Profile,
  ) => void;
  therapistId?: number;
  children: React.ReactNode;
};

export const ProfileFormProvider = ({
  afterSaveCallback,
  therapistId,
  children
}: ProfileFormProviderProps) => {
  const { t } = useTranslation();
  const {
    logout,
    profile: currentProfile,
    setProfile: setCurrentProfile,
  } = useAuth();
  const { openNotification } = useNotification();
  const { openConfirmationModal } = useModals();
  const {
    fetchProfile,
    createProfile: createProfileOperation,
    updateProfile: updateProfileOperation,
    deleteProfile: deleteProfileOperation,
  } = useProfilesOperations();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();
  const [editingRole, setEditingRole] = useState<ProfileRole>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);

  const openForm = useCallback(async (role: ProfileRole, profileId?: number) => {
    if (profileId) {
      setLoadingProfile(true);

      try {
        const response = await fetchProfile(profileId);

        if (response.success) {
          setProfile(response.profile);
        }
      } finally {
        setLoadingProfile(false);
      }
    } else {
      setProfile(undefined);
    }

    setEditingRole(role);
    setIsFormOpen(true);
  }, [fetchProfile]);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setProfile(undefined);
    setEditingRole(undefined);
  }, []);

  const createProfile = useCallback(async (profileData: Partial<Profile>) => {
    try {
      const response = await createProfileOperation(profileData);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      afterSaveCallback?.("create", response.profile);
      closeForm();
      openNotification("success", t(`profiles.${response.profile.role}s.actions.created`));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [
    t,
    createProfileOperation,
    afterSaveCallback,
    openNotification,
    closeForm,
  ]);

  const updateProfile = useCallback(async (profileData: Partial<Profile>) => {
    try {
      const response = await updateProfileOperation(profileData);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      if (currentProfile?.id === response.profile.id) {
        setCurrentProfile(response.profile);
      }

      afterSaveCallback?.("update", response.profile);
      closeForm();
      openNotification("success", t(`profiles.${response.profile.role}s.actions.updated`));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [
    t,
    updateProfileOperation,
    afterSaveCallback,
    openNotification,
    closeForm,
    currentProfile,
  ]);

  const submitProfile = useCallback(async (formValues: Partial<Profile>) => {
    setIsSubmitting(true);
    formValues.role = editingRole;
    formValues.default_value = formValues.default_value !== null
      ? Number(formValues.default_value)
      : undefined;

    if (profile?.id) {
      await updateProfile({ ...formValues, id: profile.id });
    } else {
      await createProfile(formValues);
    }
  }, [updateProfile, createProfile, editingRole, profile]);

  const deleteProfile = useCallback(async (profileId: number) => {
    openConfirmationModal(
      t(`profiles.${editingRole}s.actions.delete`),
      t(`profiles.${editingRole}s.actions.delete.confirmation`),
      async () => {
        try {
          const response = await deleteProfileOperation(profileId);

          if (!response.success) {
            openNotification("error", response.errors!);
            throw new Error(response.error);
          }

          closeForm();

          if (currentProfile?.id === profileId) return logout();

          afterSaveCallback?.("delete", profile!);
          openNotification("success", t(`profiles.${editingRole}s.actions.deleted`));
        } catch (error) {
          console.error(error || t("common.errors.unknown"));
        } finally {
          setIsSubmitting(false);
        }
      },
    );
  }, [
    t,
    openConfirmationModal,
    deleteProfileOperation,
    afterSaveCallback,
    openNotification,
    closeForm,
    editingRole,
    currentProfile?.id,
    logout,
  ]);

  return (
    <ProfilesFormContext.Provider
      value={{
        isFormOpen,
        profile,
        editingRole,
        isSubmitting,
        loadingProfile,
        therapistId,
        openForm,
        closeForm,
        submitProfile,
        deleteProfile,
      }}
    >
      {children}
      <ProfileDrawer />
    </ProfilesFormContext.Provider>
  );
};
