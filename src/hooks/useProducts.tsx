"use client";
import { Product } from "@/utils/data.types";
import { useState, useEffect } from "react";

export function useProducts(page: number, discountFilter: boolean) {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<{ totalPages: number; } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        setError(null);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/products?page=${page}${discountFilter ? "&p=true" : ""}`
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
  }, [page, discountFilter]);

  return { products, loading, error, meta };
}
