import { useMemo } from "react";

import { useAuth } from "@/modules/auth/hooks/useAuth";

import { useCanReviewMedicalRecord } from "./useCanReviewMedicalRecord";

export type MedicalRecordAccess = {
  isServiceTherapist: boolean;
  isSupervisor: boolean;
  // Campos do prontuário (título, data, evolução, registro documental, anexos).
  canEditRecord: boolean;
  // Campos da supervisão (visto e registros da supervisão).
  canEditSupervision: boolean;
  canCreate: boolean;
  canDelete: boolean;
  canSubmit: boolean;
};

// Quem mexe no prontuário, campo a campo: o terapeuta do atendimento escreve o
// prontuário, o supervisor dele assina e comenta a supervisão, e mais ninguém
// edita — nem o admin, que só lê. Enquanto nada foi salvo o rascunho fica
// aberto (o atendimento ainda pode trocar, e com ele o terapeuta): o que barra
// quem não é o terapeuta é o botão de criar.
export const useMedicalRecordAccess = (
  serviceTherapistId?: number,
  isRecordSaved = false,
): MedicalRecordAccess => {
  const { profile } = useAuth();
  const isSupervisor = useCanReviewMedicalRecord(serviceTherapistId);

  return useMemo(() => {
    const isServiceTherapist = !!serviceTherapistId && profile?.id === serviceTherapistId;

    const canEditRecord = !isRecordSaved || isServiceTherapist;
    const canEditSupervision = isRecordSaved && isSupervisor;
    const canCreate = !isRecordSaved && isServiceTherapist;
    const canDelete = isRecordSaved && isServiceTherapist;

    return {
      isServiceTherapist,
      isSupervisor,
      canEditRecord,
      canEditSupervision,
      canCreate,
      canDelete,
      canSubmit: isRecordSaved
        ? isServiceTherapist || canEditSupervision
        : canCreate,
    };
  }, [profile, serviceTherapistId, isSupervisor, isRecordSaved]);
};
