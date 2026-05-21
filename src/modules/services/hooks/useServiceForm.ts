import { useContext } from "react";

import { ServiceFormContext } from "../contexts/ServiceFormContext";

export const useServiceForm = () => {
  const context = useContext(ServiceFormContext);

  if (!context) {
    throw new Error("useServiceForm must be used within a ServiceFormProvider");
  }

  return context;
};
