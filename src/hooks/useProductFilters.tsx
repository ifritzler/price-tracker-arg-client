"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface FilterProps {
  discountValue: boolean;
  increased: boolean;
}

export function useProductsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const discountParam = searchParams.get("p");
  const increasedParam = searchParams.get("inc");

  const [filter, setFilter] = useState<FilterProps>({
    discountValue: discountParam === "true" ? true : false,
    increased: increasedParam === "true" ? true : false,
  });

  const updateFilter = (filterProps: Partial<FilterProps>) => {
    setFilter((prev) => {
      return {
        ...prev,
        ...filterProps,
      }
    });
  };

  useEffect(() => {
    const rawparams = new URLSearchParams()
    filter.discountValue && rawparams.set('p', String(filter.discountValue))
    filter.increased && rawparams.set('inc', String(filter.increased))

    router.push(
      `/?${rawparams.toString()}`
    );
  }, [filter])

  return [filter, updateFilter] as const;
}
