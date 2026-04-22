import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";

import { ProfilesContext } from "../contexts/ProfilesContext";
import { useProfilesOperations } from "../hooks/useProfilesOperations";
import { useProfilesStates } from "../hooks/useProfilesStates";
import type { ProfilesFilter, ProfilesOrder } from "../types/profile";
import { ProfilesFilterModal } from "../components/ProfilesFilterModal/ProfilesFilterModal";

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
  const {
    profileRole,
    profiles, setProfiles,
    total, setTotal,
    totalFiltered, setTotalFiltered,
    totalActive, setTotalActive,
    loading, setLoading,
    filter, setFilter,
    page, setPage,
    orderBy, setOrderBy,
    isFilterOpen, setIsFilterOpen,
  } = useProfilesStates({ module });

  const filtratePanel = useCallback(async (
    newFilter: ProfilesFilter = filter,
    newOrderBy: ProfilesOrder = orderBy,
    newPage: number = 1,
  ) => {
    setFilter(newFilter);
    setOrderBy(newOrderBy);
    setPage(newPage);

    if (page === 1) {
      setLoading(true);
    }

    try {
      const response = await fetchProfiles(newFilter, newOrderBy, newPage);

      if (!response.success) {
        throw new Error(response.error);
      }

      setProfiles(response.profiles);
      setTotalActive(response.total_active!);
      setTotalFiltered(response.total_filtered);
      setTotal(response.total);
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  return (
    <ProfilesContext.Provider value={{
      filtratePanel,
      profiles,
      setProfiles,
      total,
      totalFiltered,
      totalActive,
      loading,
      filter,
      page,
      orderBy,
      setOrderBy,
      profileRole,
      setIsFilterOpen,
    }}>
      {children}

      <ProfilesFilterModal
        isOpen={isFilterOpen}
        close={() => setIsFilterOpen(false)}
        filtrate={filtratePanel}
      />
    </ProfilesContext.Provider>
  );
};
