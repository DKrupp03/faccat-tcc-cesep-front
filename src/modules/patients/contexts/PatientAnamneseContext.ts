import { createContext } from "react";
import type { FormInstance } from "antd";

import type {
  ProfileGender,
  ProfileEducationLevel,
  ProfileMaritalStatus,
} from "@/shared/types/profile";

import type { AnamneseProfileType, AnamneseType } from "../types/anamnese";
import type { Patient } from "../types/patient";

// Sementes do formulário, não um AnamneseType: só os campos herdados do
// cadastro do paciente nascem preenchidos, e os numéricos vivem como texto.
export type PatientAnamneseInitialValues = {
  anamnese_type: AnamneseProfileType;
  patient_id?: number;
  therapist_id?: number;
  created_at: string;
  anamnese_data: {
    identificationData: {
      name?: string;
      birth?: string;
      age?: string;
      gender?: ProfileGender;
      educationLevel?: ProfileEducationLevel;
      maritalStatus?: ProfileMaritalStatus;
    };
  };
};

export type PatientAnamneseContextType = {
  form: FormInstance<Partial<AnamneseType>>;
  anamneseType?: AnamneseProfileType;
  initialAnamnese: PatientAnamneseInitialValues;
  isSubmitting: boolean;
  patient: Patient | undefined;
  handleSubmitAnamnese: () => void;
};

export const PatientAnamneseContext = createContext<PatientAnamneseContextType | null>(null);
