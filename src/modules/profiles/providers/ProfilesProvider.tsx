import { useCallback, useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";

import { ProfilesListContext } from "../contexts/ProfilesListContext";
import { useProfilesOperations } from "../hooks/useProfilesOperations";
import type { ProfilesFilter, ProfilesOrder, ProfileRole } from "../types/profile";
import { ProfilesFilterModal } from "../components/ProfilesFilterModal/ProfilesFilterModal";
import { registerAfterSaveCallback, unregisterAfterSaveCallback, type AfterSavePayload } from "./ProfileFormProvider";

type ProfilesProviderProps = {
  module: ModuleKey;
  children: React.ReactNode;
};

export const ProfilesProvider = ({
  module,
  children,
}: ProfilesProviderProps) => {
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
  }), [profileRole]);

  const [profiles, setProfiles] = useState<import("../types/profile").Profile[]>([]);
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

  const profileFormCallback = useCallback((payload: AfterSavePayload) => {
    if (payload.action === "create") {
      setProfiles((prev) => [...prev, payload.profile]);
      setTotal((prev) => prev + 1);
      setTotalFiltered((prev) => prev + 1);
      if (payload.profile.active) setTotalActive((prev) => prev + 1);
    } else if (payload.action === "update") {
      setProfiles((prev) => prev.map((p) => p.id === payload.profile.id ? payload.profile : p));
    } else if (payload.action === "delete") {
      setProfiles((prev) => prev.filter((p) => p.id !== payload.profileId));
      setTotal((prev) => prev - 1);
      setTotalFiltered((prev) => prev - 1);
      if (payload.wasActive) setTotalActive((prev) => prev - 1);
    }
  }, []);

  useEffect(() => {
    registerAfterSaveCallback(profileFormCallback);
    return () => unregisterAfterSaveCallback();
  }, [profileFormCallback]);

  const openFilter = useCallback(() => setIsFilterOpen(true), []);
  const closeFilter = useCallback(() => setIsFilterOpen(false), []);

  const listContextValue = useMemo(() => ({
    module,
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
  }), [
    module,
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
  ]);

  return (
    <ProfilesListContext.Provider value={listContextValue}>
      {children}

      <ProfilesFilterModal />
    </ProfilesListContext.Provider>
  );
};
