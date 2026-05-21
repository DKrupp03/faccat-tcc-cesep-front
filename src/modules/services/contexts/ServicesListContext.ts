import { createContext } from "react";

import type { Service, ServicesFilter, ServicesOrder } from "../types/service";

export type ServicesListContextType = {
  services: Service[];
  total: number;
  totalFiltered: number;
  loading: boolean;
  loadingMore: boolean;
  filter: ServicesFilter;
  defaultFilter: ServicesFilter;
  page: number;
  orderBy: ServicesOrder;
  isFilterOpen: boolean;
  filtratePanel: (
    newFilter?: ServicesFilter,
    newOrderBy?: ServicesOrder,
    newPage?: number,
  ) => Promise<void>;
  openFilter: () => void;
  closeFilter: () => void;
  serviceFormCallback: (operation: "create" | "update" | "delete", service: Service) => void;
};

export const ServicesListContext = createContext<ServicesListContextType | null>(null);
