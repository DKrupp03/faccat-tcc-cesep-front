import { createContext } from "react";

import type { Therapist } from "../types/therapist";

export type TherapistFormContextType = {
  isFormOpen: boolean;
  therapist: Therapist | undefined;
  isSubmitting: boolean;
  loadingTherapist: boolean;
  openForm: (therapistId?: number) => void;
  closeForm: () => void;
  submitTherapist: (values: Partial<Therapist>) => void;
  deleteTherapist: (therapistId: number) => void;
};

export const TherapistFormContext = createContext<TherapistFormContextType | null>(null);
