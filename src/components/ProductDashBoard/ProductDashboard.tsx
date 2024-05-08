"use client";
import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { Product } from "@/utils/data.types";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";

export function ProductDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        setError(null);
        const response = await fetch(
          `http://localhost:3001/api/products?page=${currentPage}`
        );
        const data = await response.json();
        setProducts(data.data);
        setTotalPages(data.meta?.totalPages || 1);
      } catch (error) {
        setError(
          "El recurso no esta disponible en estos momentos, intente de nuevo mas tarde."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentPage]);

  function onPageChange(page: number) {
    setCurrentPage(page);
    window.scroll({ top: 0, behavior: "smooth" });
  }

  return (
    <section className="container relative rounded-lg mx-auto">
      <header className="sticky top-0 bg-[--color-primary] p-4 z-10 rounded-t-lg flex flex-row justify-between items-center">
        <span className="text-[#FFFFFF] text-xl">Filtros</span>
        <Pagination
          total={totalPages}
          initialPage={currentPage}
          aria-label="Paginas de productos"
          size="md"
          className="dark"
          onChange={onPageChange}
        />
      </header>
      {loading && (
        <main className="w-full h-[700px] mx-auto flex justify-center items-center">
          <Spinner size="lg" />
        </main>
      )}
      {!loading && error && (
        <main className="w-full h-[700px] mx-auto flex justify-center items-center">
          <p className="max-w-80">{error}</p>
        </main>
      )}
      {!loading && !error && (
        <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 place-items-stretch">
          {products.map((product: Product) => (
            <ProductCard product={product} key={`product-${product.id}`} />
          ))}
        </main>
      )}
      <footer></footer>
    </section>
  );
}
