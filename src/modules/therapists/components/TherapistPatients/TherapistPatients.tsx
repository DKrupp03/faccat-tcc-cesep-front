import { useEffect } from "react";

import { usePatientsList } from "@/modules/patients/hooks/usePatientsList";
import { PatientsTable } from "@/modules/patients/components/PatientsTable/PatientsTable";
import { PatientsHeader } from "@/modules/patients/components/PatientsHeader/PatientsHeader";

export const TherapistPatients = () => {
  const { filtratePanel } = usePatientsList();

  useEffect(() => {
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PatientsTable />;
};

export const TherapistPatientsOptions = () => {
  return <PatientsHeader />;
};
