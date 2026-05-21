import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { ServicesListContext } from "../contexts/ServicesListContext";
import { ServicesFilterModal } from "../components/ServicesFilterModal/ServicesFilterModal";
import { useServicesOperations } from "../hooks/useServicesOperations";
import type { Service, ServicesFilter, ServicesOrder } from "../types/service";

type ServicesListProviderProps = {
  children: React.ReactNode;
};

export const ServicesListProvider = ({ children }: ServicesListProviderProps) => {
  const { t } = useTranslation();
  const { fetchServices } = useServicesOperations();

  const defaultFilter: ServicesFilter = useMemo(() => ({}), []);

  const [services, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalFiltered, setTotalFiltered] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [filter, setFilter] = useState<ServicesFilter>(defaultFilter);
  const [page, setPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<ServicesOrder>("datetime_start_desc");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const filtratePanel = useCallback(async (
    newFilter: ServicesFilter = filter,
    newOrderBy: ServicesOrder = orderBy,
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
      const response = await fetchServices(newFilter, newOrderBy, newPage);

      if (!response.success) {
        throw new Error(response.error);
      }

      if (newPage === 1) {
        setServices(response.services);
        setTotal(response.total);
        setTotalFiltered(response.total_filtered);
      } else {
        setServices((prev) => {
          const existingIds = new Set(prev.map((s) => s.id));
          const newServices = response.services.filter((s) => !existingIds.has(s.id));
          return [...prev, ...newServices];
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

  const serviceFormCallback = useCallback((
    operation: "create" | "update" | "delete",
    service: Service,
  ) => {
    if (operation === "create") {
      setServices((prev) => [service, ...prev]);
      setTotal((prev) => prev + 1);
      setTotalFiltered((prev) => prev + 1);
    } else if (operation === "update") {
      setServices((prev) => prev.map((s) => s.id === service.id ? service : s));
    } else if (operation === "delete") {
      setServices((prev) => prev.filter((s) => s.id !== service.id));
      setTotal((prev) => prev - 1);
      setTotalFiltered((prev) => prev - 1);
    }
  }, []);

  const openFilter = useCallback(() => setIsFilterOpen(true), []);
  const closeFilter = useCallback(() => setIsFilterOpen(false), []);

  return (
    <ServicesListContext.Provider
      value={{
        services,
        total,
        totalFiltered,
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
        serviceFormCallback,
      }}
    >
      {children}
      <ServicesFilterModal />
    </ServicesListContext.Provider>
  );
};
