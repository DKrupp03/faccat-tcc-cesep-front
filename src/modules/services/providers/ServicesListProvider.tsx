import { useCallback, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import dayjs, { type Dayjs } from "dayjs";

import { ServicesListContext } from "../contexts/ServicesListContext";
import { ServicesFilterModal } from "../components/ServicesFilterModal/ServicesFilterModal";
import { useServicesOperations } from "../hooks/useServicesOperations";
import type {
  Service,
  ServicesFilter,
  ServicesOrder,
  ServicesPanelView,
} from "../types/service";

type ServicesListProviderProps = {
  therapistId?: number;
  patientId?: number;
  children: React.ReactNode;
};

export const ServicesListProvider = ({ therapistId, patientId, children }: ServicesListProviderProps) => {
  const { t } = useTranslation();
  const { fetchServices } = useServicesOperations();

  const defaultFilter: ServicesFilter = useMemo(() => ({
    therapist_id: therapistId,
    patient_id: patientId,
  }), [therapistId, patientId]);

  const [services, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [totalFiltered, setTotalFiltered] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [filter, setFilter] = useState<ServicesFilter>(defaultFilter);
  const [page, setPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<ServicesOrder>("datetime_start_desc");
  const [panelView, setPanelView] = useState<ServicesPanelView>("calendar");
  const [calendarMonth, setCalendarMonth] = useState<Dayjs>(dayjs());
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const fetchForView = useCallback(async (
    view: ServicesPanelView,
    month: Dayjs,
    newFilter: ServicesFilter,
    newOrderBy: ServicesOrder,
    newPage: number,
  ) => {
    let effectiveFilter = newFilter;
    if (therapistId) effectiveFilter = { ...effectiveFilter, therapist_id: therapistId };
    if (patientId) effectiveFilter = { ...effectiveFilter, patient_id: patientId };

    const isCalendar = view === "calendar";

    if (isCalendar) {
      effectiveFilter = {
        ...effectiveFilter,
        date_start: month.startOf("month").toISOString(),
        date_end: month.endOf("month").toISOString(),
      };
    }

    setFilter(effectiveFilter);
    setOrderBy(newOrderBy);
    setPage(newPage);

    // O calendário busca o mês inteiro (sem paginação); a lista pagina.
    if (isCalendar || newPage === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }

    try {
      const response = await fetchServices(
        effectiveFilter,
        newOrderBy,
        isCalendar ? undefined : newPage,
      );

      if (!response.success) {
        throw new Error(response.error);
      }

      if (isCalendar || newPage === 1) {
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
  }, [t, therapistId, patientId, fetchServices]);

  const filtratePanel = useCallback((
    newFilter: ServicesFilter = filter,
    newOrderBy: ServicesOrder = orderBy,
    newPage: number = 1,
  ) => fetchForView(panelView, calendarMonth, newFilter, newOrderBy, newPage),
  [fetchForView, panelView, calendarMonth, filter, orderBy]);

  const changeCalendarMonth = useCallback((month: Dayjs) => {
    setCalendarMonth(month);
    fetchForView("calendar", month, filter, orderBy, 1);
  }, [fetchForView, filter, orderBy]);

  const changePanelView = useCallback((view: ServicesPanelView) => {
    if (view === panelView) return;

    setPanelView(view);

    if (view === "list") {
      // O calendário "possui" o range de datas; ao voltar para a lista, limpa-o.
      fetchForView("list", calendarMonth, { ...filter, date_start: undefined, date_end: undefined }, orderBy, 1);
    } else {
      fetchForView("calendar", calendarMonth, filter, orderBy, 1);
    }
  }, [fetchForView, panelView, calendarMonth, filter, orderBy]);

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
        therapistId,
        patientId,
        services,
        total,
        totalFiltered,
        loading,
        loadingMore,
        filter,
        defaultFilter,
        page,
        orderBy,
        panelView,
        calendarMonth,
        isFilterOpen,
        filtratePanel,
        changePanelView,
        changeCalendarMonth,
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
