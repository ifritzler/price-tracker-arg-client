"use client";
import { useDisclosure } from "@nextui-org/react";
import DashBoardHeader from "./DashboardHeader/DashboardHeader";
import { DashboardContent } from "./DashboardContent/DashboardContent";
import { FilterModal } from "./FilterModal/FilterModal";
import { useEffect } from "react";
// import { usePaginationStore } from "@/store/usePagination.store";
// import { useFilterStore } from "@/store/useFilter.store";

export function ProductDashboard() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  // const resetPaginationStore = usePaginationStore.use.reset()
  // const resetFilterStore = useFilterStore.use.reset()

  useEffect(() => {
    return () => {
      // TODO!: See this code later... This broke the entire querystring storage system on unmount
      // resetPaginationStore()
      // resetFilterStore()
    }
  }, [])
  return (
    <section className="container relative rounded-lg mx-auto">
      <DashBoardHeader openModal={onOpen} />
      <DashboardContent />
      <FilterModal isOpen={isOpen} onClose={onClose} />
    </section>
  );
}
