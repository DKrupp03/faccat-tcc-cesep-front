import { useCallback, useMemo, useState } from "react";

import type { Therapist } from "../types/therapist";
import { useTherapistForm } from "./useTherapistForm";

export const useTherapistFormState = () => {
  const { isFormOpen, therapist, submitTherapist, loadingTherapist } = useTherapistForm();

  const [uploadedPhoto, setUploadedPhoto] = useState<File>();
  const [changedPhoto, setChangedPhoto] = useState<boolean>(false);

  // Reseta a foto enviada quando o form abre (sem efeito, para evitar renders
  // em cascata) comparando com o valor anterior de isFormOpen.
  const [wasOpen, setWasOpen] = useState(isFormOpen);
  if (wasOpen !== isFormOpen) {
    setWasOpen(isFormOpen);
    if (isFormOpen) {
      setUploadedPhoto(undefined);
      setChangedPhoto(false);
    }
  }

  const photoUrl = useMemo(() => {
    if (changedPhoto) {
      return uploadedPhoto ? URL.createObjectURL(uploadedPhoto) : undefined;
    }
    return therapist?.photo_url;
  }, [therapist?.photo_url, changedPhoto, uploadedPhoto]);

  const handleSubmit = useCallback((values: Partial<Therapist>) => {
    if (changedPhoto) {
      if (uploadedPhoto) {
        values.photo = uploadedPhoto;
      } else {
        values.remove_photo = true;
      }
    }
    submitTherapist(values);
  }, [submitTherapist, changedPhoto, uploadedPhoto]);

  return {
    isFormOpen,
    therapist,
    loadingTherapist,
    uploadedPhoto,
    setUploadedPhoto,
    changedPhoto,
    setChangedPhoto,
    photoUrl,
    handleSubmit,
  };
};
