"use client";
import { useSearchParams } from "next/navigation";
import { useDisclosure } from "@nextui-org/react";
import Button from "../Button/Button";
import { FilterModal } from "../FilterModal/FilterModal";
import { useProducts } from "../../hooks/useProducts";
import { ProductCard } from "../ProductCard/ProductCard";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import { BsFilterSquareFill } from "react-icons/bs";
import { usePagination } from "../../hooks/usePagination";
import { Product } from "@/utils/data.types";
import { useProductsFilters } from "@/hooks/useProductFilters";

export function ProductDashboard() {
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currentPage = Number(searchParams.get("page") ?? "1");
  const discountParam = searchParams.get("p");
  const discountValue =
    discountParam === null ? false : discountParam === "true" ? true : false;

  const [discountFilter, setDiscountFilter] = useProductsFilters(discountValue);

  const { products, loading, meta, error } = useProducts(
    currentPage,
    discountFilter
  );

  const {
    currentPage: page,
    handleSetCurrentPage,
    prevPage,
    nextPage,
  } = usePagination(currentPage, meta?.totalPages || 1);

  const handleDiscountFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDiscountFilter(e.target.checked);
  };

  return (
    <section className="container relative rounded-lg mx-auto">
      <header className="sticky top-0 bg-[--color-primary] p-4 z-10 rounded-t-lg flex flex-row justify-between items-center">
        <span className="text-[#FFFFFF] text-lg">Panel de productos</span>
        <section className="flex gap-4">
          <Button
            onlyIcon={true}
            icon={<BsFilterSquareFill size={20} />}
            typeb="button"
            text=""
            className="bg-graydark"
            onClick={onOpen}
            aria-label="Selector de filtros"
          />
          <section className="flex justify-between gap-1">
            {page > 1 && (
              <Button
                onClick={prevPage}
                typeb="button"
                text="Anterior"
                className="bg-graydark text-xs font-medium rounded-xl"
              />
            )}
            {meta && page < meta.totalPages && (
              <Button
                onClick={nextPage}
                typeb="button"
                text="Siguiente"
                className="bg-graydark text-xs font-medium rounded-xl"
              />
            )}
          </section>
        </section>
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
        <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 place-items-stretch justify-items-center">
          {products?.map((product: Product) => (
            <ProductCard product={product} key={`product-${product.id}`} />
          ))}
        </main>
      )}
      <footer className="flex justify-center">
        {!error && !loading && (
          <Pagination
            total={meta?.totalPages || 1}
            initialPage={page}
            aria-label="Paginas de productos"
            size="sm"
            className="dark"
            onChange={handleSetCurrentPage}
          />
        )}
      </footer>
      <FilterModal
        isOpen={isOpen}
        onClose={onClose}
        handleDiscountFilterChange={handleDiscountFilterChange}
        discountFilter={discountFilter}
      />
    </section>
  );
}
