import { useCallback } from "react";

import type { ProfilesOrder } from "@/shared/types/profile";
import type {
  Patient,
  PatientsFilter,
  PatientsPayload,
} from "../types/patient";
import PatientsService from "../services/PatientsService";

export const usePatientsOperations = () => {
  const createPatient = useCallback(async (patient: Partial<Patient>) => {
    return await PatientsService.createPatient(patient);
  }, []);

  const updatePatient = useCallback(async (patient: Partial<Patient>) => {
    return await PatientsService.updatePatient(patient);
  }, []);

  const deletePatient = useCallback(async (patientId: number) => {
    return await PatientsService.deletePatient(patientId);
  }, []);

  const fetchPatient = useCallback(async (patientId: number) => {
    return await PatientsService.getPatient(patientId);
  }, []);

  const fetchPatients = useCallback(async (
    filter: PatientsFilter,
    orderBy: ProfilesOrder = "name_asc",
    page?: number,
    perPage?: number,
  ) => {
    const payload: PatientsPayload = {
      profiles: { ...filter, role: "patient" },
      order_by: orderBy,
      page,
      per_page: perPage,
    };

    return await PatientsService.getPatients(payload);
  }, []);

  return {
    createPatient,
    updatePatient,
    deletePatient,
    fetchPatient,
    fetchPatients,
  };
};
