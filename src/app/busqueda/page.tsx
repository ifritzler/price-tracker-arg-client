import { ProductDashboard } from "@/components";
import { Suspense } from "react";

export default function Busqueda() {
  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      <Suspense>
          <ProductDashboard />
      </Suspense>
    </main>
  );
}
