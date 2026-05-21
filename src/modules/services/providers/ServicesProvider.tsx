import { ServicesListProvider } from "./ServicesListProvider";
import { ServiceFormProvider } from "./ServiceFormProvider";
import { useServicesList } from "../hooks/useServicesList";

type ServicesProviderProps = {
  children: React.ReactNode;
};

export const ServicesProvider = ({ children }: ServicesProviderProps) => (
  <ServicesListProvider>
    <ServicesProviderInner>{children}</ServicesProviderInner>
  </ServicesListProvider>
);

const ServicesProviderInner = ({ children }: { children: React.ReactNode }) => {
  const { serviceFormCallback } = useServicesList();

  return (
    <ServiceFormProvider afterSaveCallback={serviceFormCallback}>
      {children}
    </ServiceFormProvider>
  );
};
