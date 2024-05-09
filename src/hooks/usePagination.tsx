"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Custom hook to manage pagination
export function usePagination(initialPage: number, totalPages: number) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const page = params.get("page");
    if (page !== null) {
      setCurrentPage(parseInt(page));
    }
  }, [searchParams]);

  function handleSetCurrentPage(page: number) {
    window.scroll({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  }

  function prevPage() {
    if (currentPage <= 1) return;
    handleSetCurrentPage(currentPage - 1);
  }

  function nextPage() {
    if (currentPage >= totalPages) return;
    handleSetCurrentPage(currentPage + 1);
  }

  return { currentPage, handleSetCurrentPage, prevPage, nextPage };
}
