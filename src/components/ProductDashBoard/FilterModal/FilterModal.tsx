"use client";
import { useFilterStore } from "@/store/useFilter.store";
import { usePaginationStore } from "@/store/usePagination.store";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const discountValue = useFilterStore.use.discountValue();
  const setDiscountValue = useFilterStore.use.setDiscountValue();
  const increased = useFilterStore.use.increased();
  const setIncreased = useFilterStore.use.setIncreased();
  const resetPagination = usePaginationStore.use.reset();
  const resetFilterStore = useFilterStore.use.reset();
  const supermarketValue = useFilterStore.use.supermarket();
  const setSupermarketValue = useFilterStore.use.setSupermarketValue();

  const supermercados = [
    { name: "Todos", value: 0 },
    { name: "carrefour", value: 1 },
    { name: "Vea", value: 3 },
  ];

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
                setDiscountValue(e.target.checked);
                resetPagination();
              }}
              isSelected={discountValue}
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
                setIncreased(e.target.checked);
                resetPagination();
              }}
              isSelected={increased}
            >
              Incrementos de precio
            </Checkbox>
          </div>
          <Select
            label="Supermercado Seleccionado"
            placeholder="Elije un supermercado"
            className="max-w-xs"
            selectedKeys={[supermarketValue]}
            // @ts-expect-error expect error that i dont know how it works but works :)
            onSelectionChange={(e: {currentKey: number}) => {
              resetPagination()
              resetPagination()
              return setSupermarketValue(e.currentKey);
            }}
          >
            {supermercados.map((supermercado) => (
              <SelectItem key={supermercado.value} >
                {supermercado.name.slice(0, 1).toUpperCase() +
                  supermercado.name.slice(1, supermercado.name.length)}
              </SelectItem>
            ))}
          </Select>
          <Button
            size="sm"
            color="danger"
            onClick={() => {
              resetFilterStore();
              resetPagination();
            }}
          >
            Reiniciar filtros
          </Button>
        </ModalBody>
        <ModalFooter>
          Recuerde que no es necesario recargar la pagina, espere unos segundos
          y los filtros seran aplicados
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
