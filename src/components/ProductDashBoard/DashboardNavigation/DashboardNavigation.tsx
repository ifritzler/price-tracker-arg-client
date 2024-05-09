import Button from "@/components/Button/Button";
import { BsFilterSquareFill } from "react-icons/bs";

interface Props {
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
  totalPages: number;
  openModal: () => void;
}

export default function DashBoardNavigation({
  currentPage,
  prevPage,
  nextPage,
  totalPages,
  openModal,
}: Props) {

  return (
    <header className="sticky top-0 bg-[--color-primary] p-4 z-10 rounded-t-lg flex flex-row justify-between items-center">
      <span className="text-[#FFFFFF] text-lg">Panel de productos</span>
      <section className="flex gap-4">
        <Button
          onlyIcon={true}
          icon={<BsFilterSquareFill size={20} />}
          typeb="button"
          text=""
          className="bg-graydark"
          onClick={openModal}
          aria-label="Selector de filtros"
        />
        <section className="flex justify-between gap-1">
          <Button
            onClick={prevPage}
            typeb="button"
            text="Anterior"
            className={`bg-graydark text-xs font-medium rounded-xl ${
              currentPage === 1 && "opacity-70"
            }`}
            disabled={currentPage === 1}
          />
          <Button
            onClick={nextPage}
            typeb="button"
            text="Siguiente"
            className={`bg-graydark text-xs font-medium rounded-xl ${
              currentPage === totalPages && "opacity-70"
            }`}
            disabled={currentPage === totalPages}
          />
        </section>
      </section>
    </header>
  );
}
