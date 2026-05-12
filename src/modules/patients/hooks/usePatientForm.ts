import { useContext } from "react";

import { PatientFormContext } from "../contexts/PatientFormContext";

export const usePatientForm = () => {
  const context = useContext(PatientFormContext);

  if (!context) {
    throw new Error("usePatientForm must be used within a PatientFormProvider");
  }

  return context;
};
