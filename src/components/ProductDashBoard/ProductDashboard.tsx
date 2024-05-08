import { testProduct } from "@/utils/data";
import { ProductCard } from "../ProductCard/ProductCard";

export function ProductDashboard() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-content-center">
      <ProductCard product={testProduct} />
    </section>
  );
}
