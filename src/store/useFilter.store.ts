import { create } from "zustand";
import { createSelectors } from "./createSelectors";
import { querystring } from "zustand-querystring";

const initialState = {
  discountValue: false,
  increased: false,
  searchValue: "",
};

type FilterState = {
  discountValue: boolean;
  increased: boolean;
  searchValue: string;
  setDiscountValue: (value: boolean) => void;
  setIncreased: (value: boolean) => void;
  setSearchValue: (value: string) => void;
  reset: () => void;
};

export const useFilterStore = createSelectors(
  create<FilterState>()(
    querystring(
      (set) => ({
        discountValue: false,
        increased: false,
        searchValue: "",
        setDiscountValue: (value) => set(() => ({ discountValue: value })),
        setIncreased: (value) => set(() => ({ increased: value })),
        setSearchValue: (value) => set(() => ({ searchValue: value })),
        reset: () => {
          set(initialState);
        },
      }),
      {
        select: (pathname) => ({
          discountValue: "/busqueda" === pathname,
          increased: "/busqueda" === pathname,
          searchValue: "/busqueda" === pathname,
        }),
      }
    )
  )
);
