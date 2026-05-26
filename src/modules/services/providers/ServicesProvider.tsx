import { ServicesListProvider } from "./ServicesListProvider";
import { ServiceFormProvider } from "./ServiceFormProvider";
import { useServicesList } from "../hooks/useServicesList";

type ServicesProviderProps = {
  therapistId?: number;
  patientId?: number;
  children: React.ReactNode;
};

export const ServicesProvider = ({ therapistId, patientId, children }: ServicesProviderProps) => (
  <ServicesListProvider therapistId={therapistId} patientId={patientId}>
    <ServicesProviderInner therapistId={therapistId} patientId={patientId}>
      {children}
    </ServicesProviderInner>
  </ServicesListProvider>
);

const ServicesProviderInner = ({ therapistId, patientId, children }: ServicesProviderProps) => {
  const { serviceFormCallback } = useServicesList();

  return (
    <ServiceFormProvider
      therapistId={therapistId}
      patientId={patientId}
      afterSaveCallback={serviceFormCallback}
    >
      {children}
    </ServiceFormProvider>
  );
};
