import { useCallback } from "react";

import type { ProfilesOrder } from "@/shared/types/profile";
import type {
  Therapist,
  TherapistsFilter,
  TherapistsPayload,
  TherapistSubmitPayload,
} from "../types/therapist";
import TherapistsService from "../services/TherapistsService";

export const useTherapistsOperations = () => {
  const createTherapist = useCallback(async (therapist: Partial<Therapist>) => {
    const payload: TherapistSubmitPayload = {
      email: therapist.email!,
      profile: therapist,
    };

    return await TherapistsService.createTherapist(payload);
  }, []);

  const updateTherapist = useCallback(async (therapist: Partial<Therapist>) => {
    return await TherapistsService.updateTherapist(therapist);
  }, []);

  const deleteTherapist = useCallback(async (therapistId: number) => {
    return await TherapistsService.deleteTherapist(therapistId);
  }, []);

  const fetchTherapist = useCallback(async (therapistId: number) => {
    return await TherapistsService.getTherapist(therapistId);
  }, []);

  const fetchTherapists = useCallback(async (
    filter: TherapistsFilter,
    orderBy: ProfilesOrder = "name_asc",
    page?: number,
    perPage?: number,
  ) => {
    const payload: TherapistsPayload = {
      profiles: { ...filter, role: "therapist" },
      order_by: orderBy,
      page,
      per_page: perPage,
    };

    return await TherapistsService.getTherapists(payload);
  }, []);

  return {
    createTherapist,
    updateTherapist,
    deleteTherapist,
    fetchTherapist,
    fetchTherapists,
  };
};
