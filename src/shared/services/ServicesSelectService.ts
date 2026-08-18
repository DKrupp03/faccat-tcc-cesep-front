import api from "@/shared/api/client";
import type { CommonResponse, CommonPanelResponse } from "@/shared/types/common";
import type { Service } from "@/modules/services/types/service";

type ServicesSelectResponse = CommonPanelResponse & {
  services: Service[];
};

type ServiceSelectResponse = CommonResponse & {
  service: Service;
};

export type ServicesSelectFilter = {
  patient_id?: number;
  without_payment?: boolean;
  without_medical_record?: boolean;
};

// Teto do backend por página: a lista vinha cortada em 30 opções sem aviso.
const SELECT_PAGE_SIZE = 100;

const ServicesSelectService = {
  async getServices(filter: ServicesSelectFilter = {}): Promise<ServicesSelectResponse> {
    const response = await api.get("/services", {
      params: {
        services: filter,
        order_by: "date_desc",
        page: 1,
        per_page: SELECT_PAGE_SIZE,
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
