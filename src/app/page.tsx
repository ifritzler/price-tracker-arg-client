import { ProductDashboard } from "@/components";
import HeroHeader from "@/components/HeroHeader/HeroHeader";
import { DashBoardFiltersProvider } from "@/contexts/DashBoardFiltersContext";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      <nav></nav>
      <HeroHeader />

      <Suspense>
        <DashBoardFiltersProvider>
          <ProductDashboard />
        </DashBoardFiltersProvider>
      </Suspense>
    </main>
  );
}
