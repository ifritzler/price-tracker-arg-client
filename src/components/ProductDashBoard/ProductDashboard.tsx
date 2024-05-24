"use client";
import { useFilterContext } from "@/contexts/DashBoardFiltersContext";
import { Product } from "@/utils/data.types";
import { Pagination } from "@nextui-org/pagination";
import { useDisclosure } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { useProducts } from "../../hooks/useProducts";
import { ProductCard } from "../ProductCard/ProductCard";
import DashBoardHeader from "./DashboardHeader/DashboardHeader";
import { FilterModal } from "./FilterModal/FilterModal";

export function ProductDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { products, loading, meta, error } = useProducts();
  const {
    pagination: { currentPage },
    setPage,
  } = useFilterContext();

  return (
    <section className="container relative rounded-lg mx-auto">
      <DashBoardHeader openModal={onOpen} loadingProducts={loading} />
      {loading && (
        <main className="w-full h-[700px] mx-auto flex justify-center items-center">
          <Spinner size="lg" />
        </main>
      )}
      {!loading && error && (
        <main className="w-full h-[700px] mx-auto flex justify-center items-center dark:text-white">
          <p className="max-w-80">{error}</p>
        </main>
      )}
      {!loading && !error && (
        <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 place-items-stretch justify-items-center">
          {products?.map((product: Product) => (
            <ProductCard product={product} key={`product-${product.id}`} />
          ))}
        </main>
      )}
      <footer className="flex justify-center">
        {!error && !loading && (
          <Pagination
            total={meta?.totalPages ?? 1}
            initialPage={currentPage}
            aria-label="Paginas de productos"
            size="sm"
            className="dark"
            onChange={setPage}
          />
        )}
      </footer>
      <FilterModal isOpen={isOpen} onClose={onClose} />
    </section>
  );
}
