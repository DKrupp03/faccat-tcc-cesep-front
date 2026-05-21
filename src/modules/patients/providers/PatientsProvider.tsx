import { PatientsListProvider } from "./PatientsListProvider";
import { PatientFormProvider } from "./PatientFormProvider";
import { usePatientsList } from "../hooks/usePatientsList";

type PatientsProviderProps = {
  therapistId?: number;
  children: React.ReactNode;
};

export const PatientsProvider = ({ therapistId, children }: PatientsProviderProps) => (
  <PatientsListProvider therapistId={therapistId}>
    <PatientsProviderInner therapistId={therapistId}>
      {children}
    </PatientsProviderInner>
  </PatientsListProvider>
);

const PatientsProviderInner = ({ therapistId, children }: PatientsProviderProps) => {
  const { patientFormCallback } = usePatientsList();

  return (
    <PatientFormProvider therapistId={therapistId} afterSaveCallback={patientFormCallback}>
      {children}
    </PatientFormProvider>
  );
};
