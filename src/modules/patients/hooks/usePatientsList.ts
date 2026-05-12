import { useContext } from "react";

import { PatientsListContext } from "../contexts/PatientsListContext";

export const usePatientsList = () => {
  const context = useContext(PatientsListContext);

  if (!context) {
    throw new Error("usePatientsList must be used within a PatientsListProvider");
  }

  return context;
};
