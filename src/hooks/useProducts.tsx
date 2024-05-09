"use client";
import { useFilterContext } from "@/contexts/DashBoardFiltersContext";
import { Product } from "@/utils/data.types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<{ totalPages: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const { filters } = useFilterContext();

  useEffect(() => {
    setLoading(true);
    const page = searchParams.get("page") ?? 1;
    async function fetchData() {
      try {
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/products?${
            page && `page=${page}`
          }${filters.discountValue ? `&p=true` : ""}${
            filters.increased ? `&inc=true` : ""
          }`
        );
        if (response.status !== 200) {
          setError(
            "La url no es correcta para la petición de datos que desea realizar."
          );
          setLoading(false);
          return;
        }
        const data = await response.json();
        setProducts(data.data);
        setMeta(data.meta);
      } catch (error) {
        setError(
          "El recurso no esta disponible en estos momentos, intente de nuevo mas tarde."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchParams, filters]);

  return { products, loading, error, meta };
}
