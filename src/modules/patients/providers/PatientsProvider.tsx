import { PatientsListProvider } from "./PatientsListProvider";
import { PatientFormProvider } from "./PatientFormProvider";
import { usePatientsList } from "../hooks/usePatientsList";

type PatientsProviderProps = {
  children: React.ReactNode;
};

export const PatientsProvider = ({ children }: PatientsProviderProps) => (
  <PatientsListProvider>
    <PatientsProviderInner>{children}</PatientsProviderInner>
  </PatientsListProvider>
);

const PatientsProviderInner = ({ children }: { children: React.ReactNode }) => {
  const { patientFormCallback } = usePatientsList();

  return (
    <PatientFormProvider afterSaveCallback={patientFormCallback}>
      {children}
    </PatientFormProvider>
  );
};
