import { useFilterContext } from "@/contexts/DashBoardFiltersContext";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const { filters, setFilters } = useFilterContext();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      className="max-w-[500px] dark:dark light:light dark:text-white"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Filtros</ModalHeader>
        <ModalBody>
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              name="discount-filter"
              classNames={{
                label: "text-small",
              }}
              onChange={(e) => {
                setFilters({
                  discountValue: e.target.checked,
                });
              }}
              isSelected={filters.discountValue}
            >
              Promociones
            </Checkbox>
          </div>
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              name="increse-filter"
              classNames={{
                label: "text-small",
              }}
              onChange={(e) => {
                setFilters({
                  increased: e.target.checked,
                });
              }}
              isSelected={filters.increased}
            >
              Incrementos de precio
            </Checkbox>
          </div>
        </ModalBody>
        <ModalFooter>
          Recuerde que no es necesario recargar la pagina, espere unos segundos
          y los filtros seran aplicados
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
