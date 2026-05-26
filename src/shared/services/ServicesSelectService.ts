import api from "@/shared/api/client";
import type { CommonResponse, CommonPanelResponse } from "@/shared/types/common";
import type { Service } from "@/modules/services/types/service";

type ServicesSelectResponse = CommonPanelResponse & {
  services: Service[];
};

type ServiceSelectResponse = CommonResponse & {
  service: Service;
};

const ServicesSelectService = {
  async getServices(): Promise<ServicesSelectResponse> {
    const response = await api.get("/services", {
      params: {
        services: {},
        order_by: "datetime_start_desc",
        page: 1,
      },
    });
    return response.data;
  },

  async getService(id: number): Promise<ServiceSelectResponse> {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },
};

export default ServicesSelectService;
