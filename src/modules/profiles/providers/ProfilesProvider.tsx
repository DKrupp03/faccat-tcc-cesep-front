import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";
import { useNotification } from "@/shared/hooks/useNotification";
import { useModals } from "@/shared/hooks/useModals";

import { ProfilesContext } from "../contexts/ProfilesContext";
import { useProfilesOperations } from "../hooks/useProfilesOperations";
import type { Profile, ProfilesFilter, ProfilesOrder, ProfileRole } from "../types/profile";
import { ProfilesFilterModal } from "../components/ProfilesFilterModal/ProfilesFilterModal";
import { ProfileDrawer } from "../components/ProfileDrawer/ProfileDrawer";

type ProfilesProviderProps = {
  module: ModuleKey
  children: React.ReactNode;
};

export const ProfilesProvider = ({
  module,
  children,
}: ProfilesProviderProps) => {
  const { t } = useTranslation();
  const { openNotification } = useNotification();
  const { openConfirmationModal } = useModals();
  const {
    fetchProfiles,
    fetchProfile,
    createProfile: createProfileOperation,
    updateProfile: updateProfileOperation,
    deleteProfile: deleteProfileOperation,
  } = useProfilesOperations();
  
  const profileRole: ProfileRole = useMemo(() => {
    if (module === "patients") return "patient";
    return "therapist";
  }, [module]);

  const defaultFilter: ProfilesFilter = useMemo(() => ({
    active: 1,
    role: profileRole,
    payment_status: "all",
  }), [profileRole]);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalFiltered, setTotalFiltered] = useState<number>(0);
  const [totalActive, setTotalActive] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [filter, setFilter] = useState<ProfilesFilter>(defaultFilter);
  const [page, setPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<ProfilesOrder>("name_asc");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();
  const [editingRole, setEditingRole] = useState<ProfileRole>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);

  const filtratePanel = useCallback(async (
    newFilter: ProfilesFilter = filter,
    newOrderBy: ProfilesOrder = orderBy,
    newPage: number = 1,
  ) => {
    setFilter(newFilter);
    setOrderBy(newOrderBy);
    setPage(newPage);

    if (newPage === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetchProfiles(newFilter, newOrderBy, newPage);

      if (!response.success) {
        throw new Error(response.error);
      }

      if (newPage === 1) {
        setProfiles(response.profiles);
        setTotalActive(response.total_active!);
        setTotalFiltered(response.total_filtered);
        setTotal(response.total);
      } else {
        setProfiles((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newProfiles = response.profiles.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newProfiles];
        });
      }
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

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

  const createProfile = useCallback(async (profile: Partial<Profile>) => {
    try {
      const response = await createProfileOperation(profile);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      setProfiles((prev) => [...prev, response.profile]);
      setTotal((prev) => prev + 1);
      setTotalFiltered((prev) => prev + 1);
      if (response.profile.active) setTotalActive((prev) => prev + 1);
      closeForm();
      openNotification("success", t(`profiles.${response.profile.role}s.actions.created`));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [t, createProfileOperation, openNotification, closeForm]);

  const updateProfile = useCallback(async (profile: Partial<Profile>) => {
    try {
      const response = await updateProfileOperation(profile);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      setProfiles((prev) => (
        prev.map((p) => p.id === response.profile.id ? response.profile : p)
      ));
      closeForm();
      openNotification("success", t(`profiles.${response.profile.role}s.actions.updated`));
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [t, updateProfileOperation, openNotification, closeForm]);

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

          setTotal((prev) => prev + 1);
          setTotalFiltered((prev) => prev + 1);
          if (profile?.active) setTotalActive((prev) => prev + 1);
          setProfiles((prev) => prev.filter((p) => p.id !== profileId));
          closeForm();
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
    openNotification,
    closeForm,
    profile,
    editingRole,
  ]);

  return (
    <ProfilesContext.Provider value={{
      profiles, setProfiles,
      total, setTotal,
      totalFiltered, setTotalFiltered,
      totalActive, setTotalActive,
      loading, setLoading,
      loadingMore, setLoadingMore,
      filter, setFilter,
      page, setPage,
      orderBy, setOrderBy,
      isFilterOpen, setIsFilterOpen,
      isFormOpen, setIsFormOpen,
      profile, setProfile,
      editingRole, setEditingRole,
      isSubmitting, setIsSubmitting,
      loadingProfile, setLoadingProfile,

      module,
      profileRole,
      defaultFilter,

      filtratePanel,
      openForm,
      closeForm,
      submitProfile,
      deleteProfile,
    }}>
      {children}

      <ProfilesFilterModal />
      <ProfileDrawer />
    </ProfilesContext.Provider>
  );
};
