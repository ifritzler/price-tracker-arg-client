import { ProductCard } from "@/components/ProductCard/ProductCard";
import { useFilterStore } from "@/store/useFilter.store";
import { usePaginationStore } from "@/store/usePagination.store";
import { Product } from "@/utils/data.types";
import { useDisclosure } from "@nextui-org/modal";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import {
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useEffect } from "react";

export function DashboardContent() {
  // Filters
  const increased = useFilterStore.use.increased();
  const searchValue = useFilterStore.use.searchValue();
  const discountValue = useFilterStore.use.discountValue();

  // Pagination
  const page = usePaginationStore.use.page();
  const setTotalPages = usePaginationStore.use.setTotalPages();
  const totalPages = usePaginationStore.use.totalPages();
  const setPage = usePaginationStore.use.setPage();
  // Fetch function

  const fetchProducts = async (
    page: number,
    increased: boolean,
    discountValue: boolean,
    searchValue: string
  ) => {
    return fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/products?${
        page && `page=${page}`
      }${discountValue ? `&p=true` : ""}${increased ? `&inc=true` : ""}${
        searchValue ? `&q=${searchValue.trim()}` : ""
      }`
    ).then((response) => response.json());
  };

  // Query info
  const queryResult = useSuspenseQuery<
    any,
    any,
    { data: Product[]; meta: { totalPages: number } }
  >({
    queryKey: ["products", page, increased, discountValue, searchValue],
    queryFn: () => fetchProducts(page, increased, discountValue, searchValue),
  });
  const { isPending, isError, error, data } = queryResult;

  /// Observer

  useEffect(() => {
    return () => {
      setTotalPages(data.meta.totalPages);
    };
  }, [data]);

  // Modal operations
  const { isOpen, onClose } = useDisclosure();

  if (isPending) {
    return (
      <main className="w-full h-[700px] mx-auto flex justify-center items-center">
        <Spinner size="lg" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="w-full h-[700px] mx-auto flex justify-center items-center dark:text-white">
        <p className="max-w-80">{error?.message}</p>
      </main>
    );
  }

  // Here we know the totalPages of the operation

  return (
    <>
      <main className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 place-items-stretch justify-items-center">
        {data.data?.map((product: Product) => (
          <ProductCard product={product} key={`product-${product.id}`} />
        ))}
      </main>
      <footer className="flex justify-center">
        <Pagination
          total={totalPages}
          initialPage={1}
          aria-label="Paginas de productos"
          size="sm"
          className="dark"
          onChange={(e) => {
            console.log(e)
            setPage(e)
          }}
        />
      </footer>
    </>
  );
}
