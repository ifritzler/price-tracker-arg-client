import { ProductDashboard } from "@/components";
import HeroHeader from "@/components/HeroHeader/HeroHeader";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      <nav></nav>
      <HeroHeader />

      <ProductDashboard />
    </main>
  );
}
