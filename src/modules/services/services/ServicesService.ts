import api from "@/shared/api/client";
import type { CommonResponse } from "@/shared/types/common";
import type {
  Service,
  ServiceResponse,
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

  async createService(service: Partial<Service>): Promise<ServiceResponse> {
    const response = await api.post("/services", { service });
    return response.data;
  },

  async updateService(service: Partial<Service>): Promise<ServiceResponse> {
    const response = await api.put(`/services/${service.id}`, { service });
    return response.data;
  },

  async deleteService(serviceId: number): Promise<CommonResponse> {
    const response = await api.delete(`/services/${serviceId}`);
    return response.data;
  },
};

export default ServicesService;
