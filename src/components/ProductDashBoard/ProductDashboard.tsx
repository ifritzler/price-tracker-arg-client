"use client";
import { useEffect, useState } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import { Product } from "@/utils/data.types";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import Button from "../Button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { BsFilterSquareFill } from "react-icons/bs";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
} from "@nextui-org/react";

export function ProductDashboard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page") ?? "1")
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [discountFilter, setDiscountFilter] = useState<boolean>(
    Boolean(searchParams.get("p") === "true")
  );

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        setError(null);
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_HOST
          }/api/products?page=${currentPage}${discountFilter ? "&p=true" : ""}`
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
        setTotalPages(data.meta?.totalPages || 1);
      } catch (error) {
        setError(
          "El recurso no esta disponible en estos momentos, intente de nuevo mas tarde."
        );
      } finally {
        setLoading(false);
      }
    }
    router.push(
      `/?page=${currentPage}${discountFilter ? `&p=${discountFilter}` : ""}`
    );
    fetchData();
  }, [currentPage, discountFilter]);

  function handleSetCurrentPage(page: number) {
    setCurrentPage(page);
    window.scroll({ top: 0, behavior: "smooth" });
  }

  function onPageChange(page: number) {
    handleSetCurrentPage(page);
  }

  function prevPage() {
    if (currentPage <= 1) return;

    handleSetCurrentPage(currentPage - 1);
    window.scroll({ top: 0, behavior: "smooth" });
  }

  function nextPage() {
    if (currentPage >= totalPages) return;

    handleSetCurrentPage(currentPage + 1);
    window.scroll({ top: 0, behavior: "smooth" });
  }

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
          />
          <section className="flex justify-between gap-1">
            {currentPage > 1 && (
              <Button
                onClick={prevPage}
                typeb="button"
                text="Anterior"
                className="bg-graydark text-xs font-medium rounded-xl"
              />
            )}
            {currentPage < totalPages && (
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
            total={totalPages}
            initialPage={currentPage}
            aria-label="Paginas de productos"
            size="sm"
            className="dark"
            onChange={onPageChange}
          />
        )}
      </footer>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        className="max-w-[500px] dark:dark light:light dark:text-white"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Filtros</ModalHeader>
              <ModalBody>
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleSetCurrentPage(1);
                        setDiscountFilter(true);
                      } else {
                        handleSetCurrentPage(1);
                        setDiscountFilter(false);
                      }
                    }}
                    isSelected={discountFilter}
                  >
                    Promociones
                  </Checkbox>
                </div>
              </ModalBody>
              <ModalFooter>
                Recuerde que no es necesario recargar la pagina, espere unos
                segundos y los filtros seran aplicados
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
