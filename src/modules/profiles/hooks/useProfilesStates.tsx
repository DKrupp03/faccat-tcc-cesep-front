import { useMemo, useState } from "react";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";

import type {
  Profile,
  ProfileRole,
  ProfilesFilter,
  ProfilesOrder,
} from "../types/profile";

type useProfilesStatesProps = {
  module: ModuleKey;
};

export const useProfilesStates = ({
  module,
}: useProfilesStatesProps) => {
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

  return {
    defaultFilter,
    profileRole,
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
  };
};
