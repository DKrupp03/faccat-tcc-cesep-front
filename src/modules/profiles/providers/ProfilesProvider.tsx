import { useMemo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";

import { ProfilesContext } from "../contexts/ProfilesContext";
import { useProfilesCommon } from "../hooks/useProfilesCommon";
import type {
  Profile,
  ProfilesFilter,
  ProfilesOrder,
} from "../types/profile";

type ProfilesProviderProps = {
  module: ModuleKey
  children: React.ReactNode;
};

export const ProfilesProvider = ({
  module,
  children,
}: ProfilesProviderProps) => {
  const { t } = useTranslation()
  const { fetchProfiles } = useProfilesCommon();

  const profileRole = useMemo(() => {
    if (module === "patients") return "patient";
    return "therapist";
  }, [module]);

  const defaultFilter: ProfilesFilter = useMemo(() => ({
    active: true,
    role: profileRole,
  }), [profileRole]);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalFiltered, setTotalFiltered] = useState<number>(0);
  const [totalActive, setTotalActive] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<ProfilesFilter>(defaultFilter);
  const [page, setPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<ProfilesOrder>("name_asc");

  const filtratePanel = useCallback(async (
    newFilter: ProfilesFilter = filter,
    newOrderBy: ProfilesOrder = orderBy,
    newPage: number = page,
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
    }}>
      {children}
    </ProfilesContext.Provider>
  );
};
