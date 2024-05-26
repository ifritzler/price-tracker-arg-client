import { create } from "zustand";
import { createSelectors } from "./createSelectors";
import { querystring } from "zustand-querystring";

const initialState = {
  page: 1,
  totalPages: 1,
};

type PaginationState = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  setTotalPages: (totalPages: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  reset: () => void;
};

export const usePaginationStore = createSelectors(
  create<PaginationState>()(
    querystring(
      (set) => ({
        page: 1,
        totalPages: 1,
        setPage: (page) =>
          set((state) => ({
            page: page <= state.totalPages && page >= 1 ? page : state.page,
          })),
        setTotalPages: (totalPages) => set(() => ({ totalPages })),
        nextPage: () =>
          set((state) => ({
            page: state.page < state.totalPages ? state.page + 1 : state.page,
          })),
        prevPage: () =>
          set((state) => ({
            page: state.page > 1 ? state.page - 1 : state.page,
          })),
        reset: () => {
          set(initialState);
        },
      }),
      {
        select: (pathname) => ({
          page: pathname === "/busqueda",
        }),
      }
    )
  )
);
