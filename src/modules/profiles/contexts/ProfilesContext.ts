import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { Profile, ProfileRole, ProfilesFilter, ProfilesOrder } from "../types/profile";
import type { ModuleKey } from "@/shared/contexts/ModulesContext";

export type ProfilesContextType = {
  profiles: Profile[];
  setProfiles: Dispatch<SetStateAction<Profile[]>>;
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
  totalFiltered: number;
  setTotalFiltered: Dispatch<SetStateAction<number>>;
  totalActive: number;
  setTotalActive: Dispatch<SetStateAction<number>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  loadingMore: boolean;
  setLoadingMore: Dispatch<SetStateAction<boolean>>;
  filter: ProfilesFilter;
  setFilter: Dispatch<SetStateAction<ProfilesFilter>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  orderBy: ProfilesOrder;
  setOrderBy: Dispatch<SetStateAction<ProfilesOrder>>;
  isFilterOpen: boolean;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
  isFormOpen: boolean;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
  profile: Profile | undefined;
  setProfile: Dispatch<SetStateAction<Profile | undefined>>;
  editingRole: ProfileRole | undefined;
  setEditingRole: Dispatch<SetStateAction<ProfileRole | undefined>>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  loadingProfile: boolean;
  setLoadingProfile: Dispatch<SetStateAction<boolean>>;
  module: ModuleKey;
  profileRole: ProfileRole;
  defaultFilter: ProfilesFilter;
  filtratePanel: (
    newFilter?: ProfilesFilter,
    newOrderBy?: ProfilesOrder,
    newPage?: number,
  ) => Promise<void>;
  openForm: (role: ProfileRole, profileId?: number) => void;
  closeForm: () => void;
  submitProfile: (profile: Partial<Profile>) => void;
};

export const ProfilesContext = createContext<ProfilesContextType | null>(null);
