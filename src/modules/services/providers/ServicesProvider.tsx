import { ServicesListProvider } from "./ServicesListProvider";
import { ServiceFormProvider } from "./ServiceFormProvider";
import { useServicesList } from "../hooks/useServicesList";
import type { ServicesPanelView } from "../types/service";

type ServicesProviderProps = {
  therapistId?: number;
  patientId?: number;
  initialPanelView?: ServicesPanelView;
  children: React.ReactNode;
};

export const ServicesProvider = ({
  therapistId,
  patientId,
  initialPanelView,
  children,
}: ServicesProviderProps) => (
  <ServicesListProvider
    therapistId={therapistId}
    patientId={patientId}
    initialPanelView={initialPanelView}
  >
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
