"use client";
import { useProductsFilters } from "@/hooks/useProductFilters";
import { createContext, PropsWithChildren, useContext } from "react";

type FilterProps = {
  discountValue: boolean;
  increased: boolean;
  page: number;
  totalPages: number;
};

type CommonFilterProps = Partial<Omit<FilterProps, "page" | "totalPages">>;

interface DashboardContextFilterProps {
  filters: CommonFilterProps;
  setFilters: (props: Partial<CommonFilterProps>) => void;
  setPaginationInfo: (paginationProps: Partial<{page: number, totalPages: number}>) => void;
  setPage: (page: number) => void;
  prevPage: () => void;
  nextPage: () => void;
  pagination: { currentPage: number; totalPages: number };
}

const DashBoardFiltersContext =
  createContext<DashboardContextFilterProps | null>(null);

export const DashBoardFiltersProvider = ({ children }: PropsWithChildren) => {
  const {
    commonFilters: filters,
    updateFilter: setFilters,
    nextPage,
    prevPage,
    setPage,
    setPaginationInfo,
    pagination,
  } = useProductsFilters();

  return (
    <DashBoardFiltersContext.Provider
      value={{ filters, setFilters, nextPage, prevPage, setPage, pagination, setPaginationInfo }}
    >
      {children}
    </DashBoardFiltersContext.Provider>
  );
};

export const useFilterContext = () =>
  useContext(DashBoardFiltersContext) as DashboardContextFilterProps;
