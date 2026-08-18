import api from "@/shared/api/client";
import type { CommonResponse, CommonPanelResponse } from "@/shared/types/common";
import type { ProfileRole } from "@/shared/types/profile";

type ProfilesSelectOption = {
  id: number;
  name: string;
};

type ProfilesSelectResponse = CommonPanelResponse & {
  profiles: ProfilesSelectOption[];
};

type ProfileSelectResponse = CommonResponse & {
  // O backend retorna o perfil completo; aqui só usamos { id, name }.
  profile: ProfilesSelectOption;
};

type ProfilesSelectFilters = {
  name?: string;
  therapistId?: number;
  patientId?: number;
};

// Teto do backend por página. A busca por nome é server-side, mas a lista
// inicial vinha cortada em 30 opções sem nenhum aviso ao usuário.
const SELECT_PAGE_SIZE = 100;

const ProfilesSelectService = {
  async getProfiles(role: ProfileRole, filters: ProfilesSelectFilters = {}): Promise<ProfilesSelectResponse> {
    const response = await api.get("/profiles", {
      params: {
        profiles: {
          active: 1,
          role,
          name: filters.name,
          therapist_id: filters.therapistId,
          patient_id: filters.patientId,
        },
        order_by: "name_asc",
        page: 1,
        per_page: SELECT_PAGE_SIZE,
      },
    });
    return response.data;
  },

  async getProfile(id: number): Promise<ProfileSelectResponse> {
    const response = await api.get(`/profiles/${id}`);
    return response.data;
  },
};

export default ProfilesSelectService;
