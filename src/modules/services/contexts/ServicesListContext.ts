import { createContext } from "react";
import type { Dayjs } from "dayjs";

import type {
  Service,
  ServicesFilter,
  ServicesOrder,
  ServicesPanelView,
} from "../types/service";

export type ServicesListContextType = {
  therapistId?: number;
  patientId?: number;
  services: Service[];
  total: number;
  totalFiltered: number;
  loading: boolean;
  loadingMore: boolean;
  filter: ServicesFilter;
  defaultFilter: ServicesFilter;
  page: number;
  orderBy: ServicesOrder;
  panelView: ServicesPanelView;
  calendarMonth: Dayjs;
  isFilterOpen: boolean;
  filtratePanel: (
    newFilter?: ServicesFilter,
    newOrderBy?: ServicesOrder,
    newPage?: number,
  ) => Promise<void>;
  changePanelView: (view: ServicesPanelView) => void;
  changeCalendarMonth: (month: Dayjs) => void;
  openFilter: () => void;
  closeFilter: () => void;
  serviceFormCallback: (operation: "create" | "update" | "delete", service: Service) => void;
};

export const ServicesListContext = createContext<ServicesListContextType | null>(null);
