import { createContext } from "react";

import type { Patient } from "../types/patient";

export type PatientFormContextType = {
  isFormOpen: boolean;
  patient: Patient | undefined;
  isSubmitting: boolean;
  loadingPatient: boolean;
  therapistId?: number;
  openForm: (patientId?: number) => void;
  closeForm: () => void;
  submitPatient: (values: Partial<Patient>) => void;
  deletePatient: (patientId: number) => void;
  updatePatientAttribute: (changes: Partial<Patient>) => void;
};

export const PatientFormContext = createContext<PatientFormContextType | null>(null);
