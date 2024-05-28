import { ProductCard } from "@/components/ProductCard/ProductCard";
import { fetchProducts } from "@/data/fetchProducts";
import { useFilterStore } from "@/store/useFilter.store";
import { usePaginationStore } from "@/store/usePagination.store";
import { Product } from "@/utils/data.types";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

type ResponseData = { data: Product[]; meta: { totalPages: number } };

export function DashboardContent() {
  // Filters
  const increased = useFilterStore.use.increased();
  const searchValue = useFilterStore.use.searchValue();
  const discountValue = useFilterStore.use.discountValue();
  const supermarketValue = useFilterStore.use.supermarket();

  // Pagination
  const page = usePaginationStore.use.page();
  const setTotalPages = usePaginationStore.use.setTotalPages();
  const totalPages = usePaginationStore.use.totalPages();
  const setPage = usePaginationStore.use.setPage();

  // Query info
  const { isPending, isError, error, data } = useQuery<any, any, ResponseData>({
    queryKey: [
      "products",
      page,
      increased,
      discountValue,
      searchValue,
      supermarketValue,
    ],
    queryFn: () =>
      fetchProducts(
        page,
        increased,
        discountValue,
        searchValue,
        String(supermarketValue)
      ),
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (data) {
      setTotalPages(data.meta.totalPages);
    }
  }, [data]);

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
          page={page}
          initialPage={page}
          aria-label="Paginas de productos"
          size="sm"
          className="dark"
          onChange={setPage}
        />
      </footer>
    </>
  );
}
