import Button from "@/components/Button/Button";
import { usePaginationStore } from "@/store/usePagination.store";
import { BsFilterSquareFill } from "react-icons/bs";

interface Props {
  openModal: () => void;
}

export default function DashBoardHeader({ openModal }: Props) {
  const nextPage = usePaginationStore.use.nextPage()
  const prevPage = usePaginationStore.use.prevPage()

  return (
    <section className="flex flex-col z-50 sticky top-0 ">
      <header className="bg-[--color-primary] p-4 rounded-t-lg flex flex-row flex-wrap gap-4 justify-between items-center">
        <span className="text-[#FFFFFF] text-lg">Panel de productos</span>
      </header>
      <footer className="flex p-4 bg-black rounded-b-lg light:from-white justify-between">
        <button
          onClick={openModal}
          aria-label="Selector de filtros"
          className="text-white flex gap-2 items-center px-4 py-2 bg-graydark font-medium rounded-3xl shadow-sm"
        >
          <BsFilterSquareFill size={20} />
          <span>Ver filtros</span>
        </button>
        <section className="flex gap-2">
          <Button
            onClick={prevPage}
            typeb="button"
            text="Anterior"
            className={`bg-graydark text-xs font-medium rounded-3xl max-w-24 shadow-sm`}
            disabled={false}
          />
          <Button
            onClick={nextPage}
            typeb="button"
            text="Siguiente"
            className={`bg-graydark text-xs font-medium rounded-3xl max-w-24 shadow-sm`}
            disabled={false}
          />
        </section>
      </footer>
    </section>
  );
}
