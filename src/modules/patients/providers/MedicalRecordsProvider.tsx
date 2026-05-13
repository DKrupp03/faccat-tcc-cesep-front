import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { useNotification } from "@/shared/hooks/useNotification";
import { useModals } from "@/shared/hooks/useModals";

import { MedicalRecordsContext } from "../contexts/MedicalRecordsContext";
import { MedicalRecordsFilterModal } from "../components/MedicalRecordsFilterModal/MedicalRecordsFilterModal";
import { MedicalRecordForm } from "../components/MedicalRecordForm/MedicalRecordForm";
import MedicalRecordsService from "../services/MedicalRecordsService";
import type {
  MedicalRecordType,
  MedicalRecordsFilter,
  MedicalRecordsOrder,
  MedicalRecordsPayload,
} from "../types/medicalRecord";

type MedicalRecordsProviderProps = {
  patientId?: number;
  children: React.ReactNode;
};

export const MedicalRecordsProvider = ({
  patientId,
  children,
}: MedicalRecordsProviderProps) => {
  const { t } = useTranslation();
  const { openNotification } = useNotification();
  const { openConfirmationModal } = useModals();

  const defaultFilter: MedicalRecordsFilter = useMemo(() => ({
    date_start: undefined,
    date_end: undefined,
  }), []);

  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalFiltered, setTotalFiltered] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [filter, setFilter] = useState<MedicalRecordsFilter>(defaultFilter);
  const [page, setPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<MedicalRecordsOrder>("date_desc");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecordType>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [loadingMedicalRecord, setLoadingMedicalRecord] = useState<boolean>(false);

  const filtratePanel = useCallback(async (
    newFilter: MedicalRecordsFilter = filter,
    newOrderBy: MedicalRecordsOrder = orderBy,
    newPage: number = 1,
  ) => {
    if (!patientId) return;

    setFilter(newFilter);
    setOrderBy(newOrderBy);
    setPage(newPage);

    if (newPage === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const payload: MedicalRecordsPayload = {
        medical_records: newFilter,
        order_by: newOrderBy,
        page: newPage,
      };

      const response = await MedicalRecordsService.getMedicalRecords(patientId, payload);

      if (!response.success) {
        throw new Error(response.error);
      }

      if (newPage === 1) {
        setMedicalRecords(response.medical_records);
        setTotalFiltered(response.total_filtered);
        setTotal(response.total);
      } else {
        setMedicalRecords((prev) => {
          const existingIds = new Set(prev.map((r) => r.id));
          const incoming = response.medical_records.filter((r) => !existingIds.has(r.id));
          return [...prev, ...incoming];
        });
      }
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, patientId]);

  const openFilter = useCallback(() => setIsFilterOpen(true), []);
  const closeFilter = useCallback(() => setIsFilterOpen(false), []);

  const openForm = useCallback(async (medicalRecordId?: number) => {
    if (!patientId) return;

    if (medicalRecordId) {
      setLoadingMedicalRecord(true);

      try {
        const response = await MedicalRecordsService.getMedicalRecord(patientId, medicalRecordId);

        if (response.success) {
          setMedicalRecord(response.medical_record);
        }
      } finally {
        setLoadingMedicalRecord(false);
      }
    } else {
      setMedicalRecord(undefined);
    }

    setIsFormOpen(true);
  }, [patientId]);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setMedicalRecord(undefined);
  }, []);

  const submitMedicalRecord = useCallback(async (values: Partial<MedicalRecordType>) => {
    if (!patientId) return;

    setIsSubmitting(true);

    try {
      const response = medicalRecord?.id
        ? await MedicalRecordsService.updateMedicalRecord(patientId, { ...values, id: medicalRecord.id })
        : await MedicalRecordsService.createMedicalRecord(patientId, values);

      if (!response.success) {
        openNotification("error", response.errors!);
        throw new Error(response.error);
      }

      const saved = response.medical_record;

      if (medicalRecord?.id) {
        setMedicalRecords((prev) => prev.map((r) => r.id === saved.id ? saved : r));
        openNotification("success", t("patients.medicalRecords.actions.updated"));
      } else {
        setMedicalRecords((prev) => [saved, ...prev]);
        setTotal((prev) => prev + 1);
        setTotalFiltered((prev) => prev + 1);
        openNotification("success", t("patients.medicalRecords.actions.created"));
      }

      closeForm();
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setIsSubmitting(false);
    }
  }, [t, patientId, medicalRecord, openNotification, closeForm]);

  const deleteMedicalRecord = useCallback(async (medicalRecordId: number) => {
    if (!patientId) return;

    openConfirmationModal(
      t("patients.medicalRecords.actions.delete"),
      t("patients.medicalRecords.actions.delete.confirmation"),
      async () => {
        try {
          const response = await MedicalRecordsService.deleteMedicalRecord(patientId, medicalRecordId);

          if (!response.success) {
            openNotification("error", response.errors!);
            throw new Error(response.error);
          }

          setMedicalRecords((prev) => prev.filter((r) => r.id !== medicalRecordId));
          setTotal((prev) => prev - 1);
          setTotalFiltered((prev) => prev - 1);
          closeForm();
          openNotification("success", t("patients.medicalRecords.actions.deleted"));
        } catch (error) {
          console.error(error || t("common.errors.unknown"));
        } finally {
          setIsSubmitting(false);
        }
      },
    );
  }, [t, patientId, openConfirmationModal, openNotification, closeForm]);

  return (
    <MedicalRecordsContext.Provider
      value={{
        patientId,
        medicalRecords,
        total,
        totalFiltered,
        loading,
        loadingMore,
        filter,
        defaultFilter,
        page,
        orderBy,
        isFilterOpen,
        isFormOpen,
        medicalRecord,
        isSubmitting,
        loadingMedicalRecord,
        filtratePanel,
        openFilter,
        closeFilter,
        openForm,
        closeForm,
        submitMedicalRecord,
        deleteMedicalRecord,
      }}
    >
      {children}
      <MedicalRecordsFilterModal />
      <MedicalRecordForm />
    </MedicalRecordsContext.Provider>
  );
};
