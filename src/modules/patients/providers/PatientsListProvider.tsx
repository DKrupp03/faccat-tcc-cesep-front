import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { ProfilesOrder } from "@/shared/types/profile";

import { PatientsListContext } from "../contexts/PatientsListContext";
import { PatientsFilterModal } from "../components/PatientsFilterModal/PatientsFilterModal";
import { usePatientsOperations } from "../hooks/usePatientsOperations";
import type { Patient, PatientsFilter } from "../types/patient";

type PatientsListProviderProps = {
  therapistId?: number;
  children: React.ReactNode;
};

export const PatientsListProvider = ({
  therapistId,
  children,
}: PatientsListProviderProps) => {
  const { t } = useTranslation();
  const { fetchPatients } = usePatientsOperations();

  const defaultFilter: PatientsFilter = useMemo(() => ({
    active: 1,
    payment_status: "all",
    therapist_id: therapistId,
  }), [therapistId]);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalFiltered, setTotalFiltered] = useState<number>(0);
  const [totalActive, setTotalActive] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [filter, setFilter] = useState<PatientsFilter>(defaultFilter);
  const [page, setPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<ProfilesOrder>("name_asc");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const filtratePanel = useCallback(async (
    newFilter: PatientsFilter = filter,
    newOrderBy: ProfilesOrder = orderBy,
    newPage: number = 1,
  ) => {
    const effectiveFilter = therapistId
      ? { ...newFilter, therapist_id: therapistId }
      : newFilter;

    setFilter(effectiveFilter);
    setOrderBy(newOrderBy);
    setPage(newPage);

    if (newPage === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetchPatients(effectiveFilter, newOrderBy, newPage);

      if (!response.success) {
        throw new Error(response.error);
      }

      if (newPage === 1) {
        setPatients(response.profiles);
        setTotalActive(response.total_active!);
        setTotalFiltered(response.total_filtered);
        setTotal(response.total);
      } else {
        setPatients((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newPatients = response.profiles.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newPatients];
        });
      }
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, therapistId]);

  const patientFormCallback = useCallback((
    operation: "create" | "update" | "delete",
    patient: Patient,
  ) => {
    if (operation === "create") {
      setPatients((prev) => [...prev, patient]);
      setTotal((prev) => prev + 1);
      setTotalFiltered((prev) => prev + 1);
      if (patient.active) setTotalActive((prev) => prev + 1);
    } else if (operation === "update") {
      setPatients((prev) => prev.map((p) => p.id === patient.id ? patient : p));
    } else if (operation === "delete") {
      setPatients((prev) => prev.filter((p) => p.id !== patient.id));
      setTotal((prev) => prev - 1);
      setTotalFiltered((prev) => prev - 1);
      if (patient.active) setTotalActive((prev) => prev - 1);
    }
  }, []);

  const openFilter = useCallback(() => setIsFilterOpen(true), []);
  const closeFilter = useCallback(() => setIsFilterOpen(false), []);

  return (
    <PatientsListContext.Provider
      value={{
        therapistId,
        patients,
        total,
        totalFiltered,
        totalActive,
        loading,
        loadingMore,
        filter,
        defaultFilter,
        page,
        orderBy,
        isFilterOpen,
        filtratePanel,
        openFilter,
        closeFilter,
        patientFormCallback,
      }}
    >
      {children}
      <PatientsFilterModal />
    </PatientsListContext.Provider>
  );
};
