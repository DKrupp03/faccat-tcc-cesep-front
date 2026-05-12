import { createContext } from "react";

import type { ProfilesOrder } from "@/shared/types/profile";
import type { Patient, PatientsFilter } from "../types/patient";

export type PatientsListContextType = {
  therapistId?: number;
  patients: Patient[];
  total: number;
  totalFiltered: number;
  totalActive: number;
  loading: boolean;
  loadingMore: boolean;
  filter: PatientsFilter;
  defaultFilter: PatientsFilter;
  page: number;
  orderBy: ProfilesOrder;
  isFilterOpen: boolean;
  filtratePanel: (
    newFilter?: PatientsFilter,
    newOrderBy?: ProfilesOrder,
    newPage?: number,
  ) => Promise<void>;
  openFilter: () => void;
  closeFilter: () => void;
  patientFormCallback: (operation: "create" | "update" | "delete", patient: Patient) => void;
};

export const PatientsListContext = createContext<PatientsListContextType | null>(null);
