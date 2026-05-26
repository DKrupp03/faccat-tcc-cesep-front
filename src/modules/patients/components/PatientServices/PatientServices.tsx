import { useEffect } from "react";

import { useServicesList } from "@/modules/services/hooks/useServicesList";
import { ServicesTable } from "@/modules/services/components/ServicesTable/ServicesTable";
import { ServicesHeader } from "@/modules/services/components/ServicesHeader/ServicesHeader";

export const PatientServices = () => {
  const { filtratePanel } = useServicesList();

  useEffect(() => {
    filtratePanel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ServicesTable />;
};

export const PatientServicesOptions = () => {
  return <ServicesHeader />;
};
