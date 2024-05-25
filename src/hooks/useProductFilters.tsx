"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterProps {
  discountValue: boolean;
  increased: boolean;
  page: number;
  totalPages: number;
}

export function useProductsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const discountParam = searchParams.get("p");
  const increasedParam = searchParams.get("inc");
  const pageParam = searchParams.get("page");

  const [filter, setFilter] = useState<FilterProps>({
    discountValue: discountParam === "true" ? true : false,
    increased: increasedParam === "true" ? true : false,
    page: Number(pageParam) || 1,
    totalPages: Number(pageParam) || 1,
  });

  const updateFilter = (
    filterProps: Partial<Omit<FilterProps, "page" | "totalPages">>
  ) => {
    setFilter((prev) => {
      return {
        ...prev,
        ...filterProps,
        page: 1
      };
    });
  };

  const setPaginationInfo = (paginationProps: Partial<{page: number, totalPages: number}>) => {
    setFilter((prev) => {
      return {
        ...prev,
        ...paginationProps,
      };
    });
  }

  const prevPage = () => {
    setFilter((prev) => {
      return {
        ...prev,
        page: prev.page <= 1 ? 1 : prev.page - 1,
      };
    });
  };

  const nextPage = () => {
    setFilter((prev) => {
      return {
        ...prev,
        page: prev.page >= prev.totalPages ? prev.totalPages : prev.page + 1,
      };
    });
  };

  const setPage = (page: number) => {
    if (page === filter.page) return;

    setFilter((prev) => {
      return {
        ...prev,
        page: page <= prev.totalPages && page >= 1 ? page : prev.page,
      };
    });
  };
  useEffect(() => {
    const rawparams = new URLSearchParams();
    filter.discountValue && rawparams.set("p", String(filter.discountValue));
    filter.increased && rawparams.set("inc", String(filter.increased));
    
    filter.page &&
      filter.page !== 1 &&
      rawparams.set("page", String(filter.page));
    router.push(`?${rawparams.toString()}`);
  }, [filter]);

  const { page: currentPage, totalPages, ...commonFilters } = filter;
  return {
    pagination: { currentPage, totalPages },
    commonFilters,
    updateFilter,
    setPaginationInfo,
    nextPage,
    prevPage,
    setPage,
  };
}
