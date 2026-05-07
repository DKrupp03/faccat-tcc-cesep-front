import { createContext } from "react";

import type { ModuleKey } from "@/shared/contexts/ModulesContext";
import type { Profile, ProfileRole, ProfilesFilter, ProfilesOrder } from "../types/profile";

export type ProfilesListContextType = {
  module: ModuleKey;
  profileRole: ProfileRole;
  profiles: Profile[];
  total: number;
  totalFiltered: number;
  totalActive: number;
  loading: boolean;
  loadingMore: boolean;
  filter: ProfilesFilter;
  defaultFilter: ProfilesFilter;
  page: number;
  orderBy: ProfilesOrder;
  isFilterOpen: boolean;
  filtratePanel: (
    newFilter?: ProfilesFilter,
    newOrderBy?: ProfilesOrder,
    newPage?: number,
  ) => Promise<void>;
  openFilter: () => void;
  closeFilter: () => void;
  profileFormCallback: (operation: "create" | "update" | "delete", profile: Profile) => void;
};

export const ProfilesListContext = createContext<ProfilesListContextType | null>(null);
