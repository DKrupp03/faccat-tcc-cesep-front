import { ServicesListProvider } from "./ServicesListProvider";
import { ServiceFormProvider } from "./ServiceFormProvider";
import { useServicesList } from "../hooks/useServicesList";

type ServicesProviderProps = {
  therapistId?: number;
  children: React.ReactNode;
};

export const ServicesProvider = ({ therapistId, children }: ServicesProviderProps) => (
  <ServicesListProvider therapistId={therapistId}>
    <ServicesProviderInner therapistId={therapistId}>
      {children}
    </ServicesProviderInner>
  </ServicesListProvider>
);

const ServicesProviderInner = ({ therapistId, children }: ServicesProviderProps) => {
  const { serviceFormCallback } = useServicesList();

  return (
    <ServiceFormProvider therapistId={therapistId} afterSaveCallback={serviceFormCallback}>
      {children}
    </ServiceFormProvider>
  );
};
