import { useContext } from "react";

import { PatientAnamneseContext } from "../contexts/PatientAnamneseContext";

export const usePatientAnamnese = () => {
  const context = useContext(PatientAnamneseContext);

  if (!context) {
    throw new Error("usePatientAnamnese must be used within a PatientAnamneseProvider");
  }

  return context;
};
