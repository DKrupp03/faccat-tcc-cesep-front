import api from "@/shared/api/client";
import type { CommonResponse } from "@/shared/types/common";
import type {
  ServiceFormValues,
  ServiceResponse,
  ServiceScope,
  ServicesResponse,
  ServicesPayload,
} from "../types/service";

const ServicesService = {
  async getService(id: number): Promise<ServiceResponse> {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  async getServices(params: ServicesPayload): Promise<ServicesResponse> {
    const response = await api.get("/services", { params });
    return response.data;
  },

  async createService(service: ServiceFormValues): Promise<ServiceResponse> {
    const response = await api.post("/services", { service });
    return response.data;
  },

  async updateService(
    service: ServiceFormValues,
    scope: ServiceScope = "single",
  ): Promise<ServiceResponse> {
    const response = await api.put(`/services/${service.id}`, { service, scope });
    return response.data;
  },

  async deleteService(
    serviceId: number,
    scope: ServiceScope = "single",
  ): Promise<CommonResponse> {
    const response = await api.delete(`/services/${serviceId}`, { params: { scope } });
    return response.data;
  },
};

export default ServicesService;
