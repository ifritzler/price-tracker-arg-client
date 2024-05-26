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
              onChange={() => {}}
              isSelected={false}
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
              onChange={() => {}}
              isSelected={false}
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
