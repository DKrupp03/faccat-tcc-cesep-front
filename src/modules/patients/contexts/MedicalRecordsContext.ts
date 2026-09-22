import { createContext } from "react";

import type { ServiceProfile } from "@/modules/services/types/service";

import type { MedicalRecordAccess } from "../hooks/useMedicalRecordAccess";
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
  // Terapeuta do atendimento escolhido no formulário: mora aqui porque o
  // rodapé da drawer (fora do Form) também depende dele para liberar o botão.
  serviceTherapist: ServiceProfile | undefined;
  access: MedicalRecordAccess;
  setFormServiceId: (serviceId: number) => void;
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
