import { useEffect } from "react";

import { useMedicalRecords } from "../../hooks/useMedicalRecords";
import { MedicalRecordsTable } from "../MedicalRecordsTable/MedicalRecordsTable";
import { MedicalRecordsHeader } from "../MedicalRecordsHeader/MedicalRecordsHeader";

export const MedicalRecords = () => {
  const { filtratePanel } = useMedicalRecords();

  useEffect(() => {
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MedicalRecordsTable />;
};

export const MedicalRecordsOptions = () => {
  return <MedicalRecordsHeader />;
};
