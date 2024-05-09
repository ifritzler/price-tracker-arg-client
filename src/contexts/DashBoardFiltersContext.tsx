"use client"
import { useProductsFilters } from "@/hooks/useProductFilters";
import { createContext, PropsWithChildren, useContext } from "react";

interface FilterProps {
    discountValue: boolean;
    increased: boolean;
  }

interface DashboardContextFilterProps {
    filters: FilterProps,
    setFilters: (props: Partial<FilterProps>) => void
}

const DashBoardFiltersContext = createContext<DashboardContextFilterProps | null>(null)

export const DashBoardFiltersProvider = ({ children }: PropsWithChildren) => {
    
    const [filters, setFilters] = useProductsFilters();

    return <DashBoardFiltersContext.Provider value={{filters, setFilters}}>
        {children}
    </DashBoardFiltersContext.Provider>
}

export const useFilterContext = () => useContext(DashBoardFiltersContext) as DashboardContextFilterProps;