import { createContext } from "react";

import type {
  MedicalRecordType,
  MedicalRecordsFilter,
  MedicalRecordsOrder,
} from "../types/medicalRecord";

export type MedicalRecordsContextType = {
  patientId?: number;
  medicalRecords: MedicalRecordType[];
  total: number;
  totalFiltered: number;
  loading: boolean;
  loadingMore: boolean;
  filter: MedicalRecordsFilter;
  defaultFilter: MedicalRecordsFilter;
  page: number;
  orderBy: MedicalRecordsOrder;
  isFilterOpen: boolean;
  isFormOpen: boolean;
  medicalRecord: MedicalRecordType | undefined;
  isSubmitting: boolean;
  loadingMedicalRecord: boolean;
  filtratePanel: (
    newFilter?: MedicalRecordsFilter,
    newOrderBy?: MedicalRecordsOrder,
    newPage?: number,
  ) => Promise<void>;
  openFilter: () => void;
  closeFilter: () => void;
  openForm: (medicalRecordId?: number) => void;
  closeForm: () => void;
  submitMedicalRecord: (values: Partial<MedicalRecordType>) => void;
  deleteMedicalRecord: (medicalRecordId: number) => void;
};

export const MedicalRecordsContext = createContext<MedicalRecordsContextType | null>(null);
