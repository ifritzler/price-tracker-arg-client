// useFilter.ts
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useProductsFilters(defaultValue: boolean) {
  const router = useRouter();
  const [filter, setFilter] = useState<boolean>(defaultValue);

  const updateFilter = (value: boolean) => {
    setFilter(value);
    router.push(`?${value ? `p=${value}` : ""}`);
  };

  return [filter, updateFilter] as const;
}
