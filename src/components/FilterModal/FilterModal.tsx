// FilterModal.tsx
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  discountFilter: boolean;
  handleDiscountFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FilterModal({ isOpen, onClose, handleDiscountFilterChange, discountFilter }: FilterModalProps) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} placement="center" className="max-w-[500px] dark:dark light:light dark:text-white">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Filtros</ModalHeader>
        <ModalBody>
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
              classNames={{
                label: "text-small",
              }}
              onChange={handleDiscountFilterChange}
              isSelected={discountFilter}
            >
              Promociones
            </Checkbox>
          </div>
        </ModalBody>
        <ModalFooter>
          Recuerde que no es necesario recargar la pagina, espere unos segundos y los filtros seran aplicados
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
