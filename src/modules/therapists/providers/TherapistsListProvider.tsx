import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { ProfilesOrder } from "@/shared/types/profile";

import { TherapistsListContext } from "../contexts/TherapistsListContext";
import { TherapistsFilterModal } from "../components/TherapistsFilterModal/TherapistsFilterModal";
import { useTherapistsOperations } from "../hooks/useTherapistsOperations";
import type { Therapist, TherapistsFilter } from "../types/therapist";

type TherapistsListProviderProps = {
  children: React.ReactNode;
};

export const TherapistsListProvider = ({ children }: TherapistsListProviderProps) => {
  const { t } = useTranslation();
  const { fetchTherapists } = useTherapistsOperations();

  const defaultFilter: TherapistsFilter = useMemo(() => ({
    active: 1,
  }), []);

  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalFiltered, setTotalFiltered] = useState<number>(0);
  const [totalActive, setTotalActive] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [filter, setFilter] = useState<TherapistsFilter>(defaultFilter);
  const [page, setPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<ProfilesOrder>("name_asc");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const filtratePanel = useCallback(async (
    newFilter: TherapistsFilter = filter,
    newOrderBy: ProfilesOrder = orderBy,
    newPage: number = 1,
  ) => {
    setFilter(newFilter);
    setOrderBy(newOrderBy);
    setPage(newPage);

    if (newPage === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetchTherapists(newFilter, newOrderBy, newPage);

      if (!response.success) {
        throw new Error(response.error);
      }

      if (newPage === 1) {
        setTherapists(response.profiles);
        setTotalActive(response.total_active!);
        setTotalFiltered(response.total_filtered);
        setTotal(response.total);
      } else {
        setTherapists((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const newTherapists = response.profiles.filter((p) => !existingIds.has(p.id));
          return [...prev, ...newTherapists];
        });
      }
    } catch (error) {
      console.error(error || t("common.errors.unknown"));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const therapistFormCallback = useCallback((
    operation: "create" | "update" | "delete",
    therapist: Therapist,
  ) => {
    if (operation === "create") {
      setTherapists((prev) => [...prev, therapist]);
      setTotal((prev) => prev + 1);
      setTotalFiltered((prev) => prev + 1);
      if (therapist.active) setTotalActive((prev) => prev + 1);
    } else if (operation === "update") {
      setTherapists((prev) => prev.map((p) => p.id === therapist.id ? therapist : p));
    } else if (operation === "delete") {
      setTherapists((prev) => prev.filter((p) => p.id !== therapist.id));
      setTotal((prev) => prev - 1);
      setTotalFiltered((prev) => prev - 1);
      if (therapist.active) setTotalActive((prev) => prev - 1);
    }
  }, []);

  const openFilter = useCallback(() => setIsFilterOpen(true), []);
  const closeFilter = useCallback(() => setIsFilterOpen(false), []);

  return (
    <TherapistsListContext.Provider
      value={{
        therapists,
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
        therapistFormCallback,
      }}
    >
      {children}
      <TherapistsFilterModal />
    </TherapistsListContext.Provider>
  );
};
