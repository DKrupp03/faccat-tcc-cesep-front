import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

import type { Profile, ProfilesFilter, ProfilesOrder } from "../types/profile";

export type ProfilesContextType = {
  filtratePanel: (newFilter?: ProfilesFilter, newOrderBy?: ProfilesOrder, newPage?: number) => Promise<void>;
  profiles: Profile[];
  total: number;
  totalFiltered: number;
  setProfiles: Dispatch<SetStateAction<Profile[]>>;
  loading: boolean;
  filter: ProfilesFilter;
  page: number;
  orderBy: ProfilesOrder;
  setOrderBy: Dispatch<SetStateAction<ProfilesOrder>>;
};

export const ProfilesContext = createContext<ProfilesContextType | null>(null);
