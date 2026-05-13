import { useContext } from "react";

import { MedicalRecordsContext } from "../contexts/MedicalRecordsContext";

export const useMedicalRecords = () => {
  const context = useContext(MedicalRecordsContext);

  if (!context) {
    throw new Error("useMedicalRecords must be used within a MedicalRecordsProvider");
  }

  return context;
};
