"use client";
import { useDisclosure } from "@nextui-org/react";
import DashBoardHeader from "./DashboardHeader/DashboardHeader";
import { DashboardContent } from "./DashboardContent/DashboardContent";
import { FilterModal } from "./FilterModal/FilterModal";
import { useEffect } from "react";

export function ProductDashboard() {
  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <section className="container relative rounded-lg mx-auto">
      <DashBoardHeader openModal={onOpen} />
      <DashboardContent />
      <FilterModal isOpen={isOpen} onClose={onClose} />
    </section>
  );
}
