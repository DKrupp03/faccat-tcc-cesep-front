import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { Profile, ProfileRole, ProfilesFilter, ProfilesOrder } from "../types/profile";

export type ProfilesContextType = {
  filtratePanel: (newFilter?: ProfilesFilter, newOrderBy?: ProfilesOrder, newPage?: number) => Promise<void>;
  profiles: Profile[];
  total: number;
  totalFiltered: number;
  totalActive: number;
  setProfiles: Dispatch<SetStateAction<Profile[]>>;
  loading: boolean;
  filter: ProfilesFilter;
  page: number;
  orderBy: ProfilesOrder;
  setOrderBy: Dispatch<SetStateAction<ProfilesOrder>>;
  profileRole: ProfileRole;
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
};

export const ProfilesContext = createContext<ProfilesContextType | null>(null);
