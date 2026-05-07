import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";

import { ProfilesListContext } from "../contexts/ProfilesListContext";
import { ProfilesFilterModal } from "../components/ProfilesFilterModal/ProfilesFilterModal";
import { useProfilesOperations } from "../hooks/useProfilesOperations";
import type { ProfilesFilter, ProfilesOrder, ProfileRole, Profile } from "../types/profile";

type ProfilesListProviderProps = {
  module: ModuleKey;
  therapistId?: number;
  children: React.ReactNode;
};

export const ProfilesListProvider = ({
  module,
  therapistId,
  children,
}: ProfilesListProviderProps) => {
  const { t } = useTranslation();
  const { fetchProfiles } = useProfilesOperations();

  const profileRole: ProfileRole = useMemo(() => {
    if (module === "patients") return "patient";
    return "therapist";
  }, [module]);

  const defaultFilter: ProfilesFilter = useMemo(() => ({
    active: 1,
    role: profileRole,
    payment_status: "all",
    therapist_id: therapistId,
  }), [profileRole, therapistId]);

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

  const filtratePanel = useCallback(async (
    newFilter: ProfilesFilter = filter,
    newOrderBy: ProfilesOrder = orderBy,
    newPage: number = 1,
  ) => {
    const effectiveFilter = therapistId
      ? { ...newFilter, therapist_id: therapistId }
      : newFilter;

    setFilter(effectiveFilter);
    setOrderBy(newOrderBy);
    setPage(newPage);

    if (newPage === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetchProfiles(effectiveFilter, newOrderBy, newPage);

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
  }, [t, therapistId]);

  const profileFormCallback = useCallback((
    operation: "create" | "update" | "delete",
    profile: Profile
  ) => {
    if (profile.role !== profileRole) return;

    if (operation === "create") {
      setProfiles((prev) => [...prev, profile]);
      setTotal((prev) => prev + 1);
      setTotalFiltered((prev) => prev + 1);
      if (profile.active) setTotalActive((prev) => prev + 1);
    } else if (operation === "update") {
      setProfiles((prev) => prev.map((p) => p.id === profile.id ? profile : p));
    } else if (operation === "delete") {
      setProfiles((prev) => prev.filter((p) => p.id !== profile.id));
      setTotal((prev) => prev - 1);
      setTotalFiltered((prev) => prev - 1);
      if (profile.active) setTotalActive((prev) => prev - 1);
    }
  }, [profileRole]);

  const openFilter = useCallback(() => setIsFilterOpen(true), []);
  const closeFilter = useCallback(() => setIsFilterOpen(false), []);

  return (
    <ProfilesListContext.Provider
      value={{
        module,
        therapistId,
        profileRole,
        profiles,
        total,
        totalFiltered,
        totalActive,
        loading,
        loadingMore,
        filter,
        defaultFilter,
        page,
        orderBy,
        isFilterOpen,
        filtratePanel,
        openFilter,
        closeFilter,
        profileFormCallback,
      }}
    >
      {children}
      <ProfilesFilterModal />
    </ProfilesListContext.Provider>
  );
};
