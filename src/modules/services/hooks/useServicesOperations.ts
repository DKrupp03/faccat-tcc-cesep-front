import { useCallback } from "react";

import type {
  Service,
  ServicesFilter,
  ServicesOrder,
  ServicesPayload,
} from "../types/service";
import ServicesService from "../services/ServicesService";

export const useServicesOperations = () => {
  const createService = useCallback(async (service: Partial<Service>) => {
    return await ServicesService.createService(service);
  }, []);

  const updateService = useCallback(async (service: Partial<Service>) => {
    return await ServicesService.updateService(service);
  }, []);

  const deleteService = useCallback(async (serviceId: number) => {
    return await ServicesService.deleteService(serviceId);
  }, []);

  const fetchService = useCallback(async (serviceId: number) => {
    return await ServicesService.getService(serviceId);
  }, []);

  const fetchServices = useCallback(async (
    filter: ServicesFilter,
    orderBy: ServicesOrder = "datetime_start_desc",
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
