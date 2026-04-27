import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";

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
  const { t } = useTranslation()
  const { fetchProfiles } = useProfilesOperations();
  
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
  const [formProfileId, setFormProfileId] = useState<number>();

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
        setProfiles((prev) => [...prev, ...response.profiles]);
      }
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [t]);

  const openForm = useCallback((profileId?: number) => {
    setFormProfileId(profileId);
    setIsFormOpen(true);
  }, []);

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
      formProfileId, setFormProfileId,

      module,
      profileRole,
      defaultFilter,

      filtratePanel,
      openForm,
    }}>
      {children}

      <ProfilesFilterModal />
      <ProfileDrawer />
    </ProfilesContext.Provider>
  );
};
