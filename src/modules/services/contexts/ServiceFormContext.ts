import { createContext } from "react";

import type { Service, ServiceFormValues } from "../types/service";

export type ServiceFormContextType = {
  therapistId?: number;
  patientId?: number;
  isFormOpen: boolean;
  service: Service | undefined;
  isSubmitting: boolean;
  loadingService: boolean;
  openForm: (serviceId?: number) => void;
  closeForm: () => void;
  submitService: (values: ServiceFormValues) => void;
  deleteService: (serviceId: number) => void;
};

export const ServiceFormContext = createContext<ServiceFormContextType | null>(null);
