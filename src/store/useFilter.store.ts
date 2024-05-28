import { create } from "zustand";
import { createSelectors } from "./createSelectors";
import { querystring } from "zustand-querystring";

const initialState = {
  discountValue: false,
  increased: false,
  searchValue: "",
  supermarket: 0,
};

type FilterState = {
  discountValue: boolean;
  increased: boolean;
  searchValue: string;
  supermarket: number;
  setDiscountValue: (value: boolean) => void;
  setIncreased: (value: boolean) => void;
  setSearchValue: (value: string) => void;
  setSupermarketValue: (value: number) => void;
  reset: () => void;
};

export const useFilterStore = createSelectors(
  create<FilterState>()(
    querystring(
      (set) => ({
        discountValue: false,
        increased: false,
        searchValue: "",
        supermarket: 0,
        setDiscountValue: (value) => set(() => ({ discountValue: value })),
        setIncreased: (value) => set(() => ({ increased: value })),
        setSearchValue: (value) => set(() => ({ searchValue: value })),
        setSupermarketValue: (value) => set(() => ({ supermarket: value })),
        reset: () => {
          set(initialState);
        },
      }),
      {
        select: (pathname) => ({
          discountValue: "/busqueda" === pathname,
          increased: "/busqueda" === pathname,
          searchValue: "/busqueda" === pathname,
          supermarket: "/busqueda" === pathname,
        }),
      }
    )
  )
);
