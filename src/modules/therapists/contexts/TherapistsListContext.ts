import { createContext } from "react";

import type { ProfilesOrder } from "@/shared/types/profile";
import type { Therapist, TherapistsFilter } from "../types/therapist";

export type TherapistsListContextType = {
  therapists: Therapist[];
  total: number;
  totalFiltered: number;
  totalActive: number;
  loading: boolean;
  loadingMore: boolean;
  filter: TherapistsFilter;
  defaultFilter: TherapistsFilter;
  page: number;
  orderBy: ProfilesOrder;
  isFilterOpen: boolean;
  filtratePanel: (
    newFilter?: TherapistsFilter,
    newOrderBy?: ProfilesOrder,
    newPage?: number,
  ) => Promise<void>;
  openFilter: () => void;
  closeFilter: () => void;
  therapistFormCallback: (operation: "create" | "update" | "delete", therapist: Therapist) => void;
};

export const TherapistsListContext = createContext<TherapistsListContextType | null>(null);
