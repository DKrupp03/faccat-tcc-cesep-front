import { useCallback } from "react";

import type {
  ServiceFormValues,
  ServiceScope,
  ServicesFilter,
  ServicesOrder,
  ServicesPayload,
} from "../types/service";
import ServicesService from "../services/ServicesService";

export const useServicesOperations = () => {
  const createService = useCallback(async (service: ServiceFormValues) => {
    return await ServicesService.createService(service);
  }, []);

  const updateService = useCallback(async (service: ServiceFormValues, scope?: ServiceScope) => {
    return await ServicesService.updateService(service, scope);
  }, []);

  const deleteService = useCallback(async (serviceId: number, scope?: ServiceScope) => {
    return await ServicesService.deleteService(serviceId, scope);
  }, []);

  const fetchService = useCallback(async (serviceId: number) => {
    return await ServicesService.getService(serviceId);
  }, []);

  const fetchServices = useCallback(async (
    filter: ServicesFilter,
    orderBy: ServicesOrder = "date_desc",
    page?: number,
    perPage?: number,
  ) => {
    const payload: ServicesPayload = {
      services: filter,
      order_by: orderBy,
      page,
      per_page: perPage,
    };

    return await ServicesService.getServices(payload);
  }, []);

  return {
    createService,
    updateService,
    deleteService,
    fetchService,
    fetchServices,
  };
};
