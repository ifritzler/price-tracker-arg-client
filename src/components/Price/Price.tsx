import { formatPrice, PriceTypeEnum } from "@/utils/prices/prices";

interface Props {
  price: number;
  type?: PriceTypeEnum;
}

export default function Price({ price, type }: Props) {
  const priceContent = formatPrice(price);

  if (type === PriceTypeEnum.DISCOUNT) {
    return (
      <span
        className="font-bold text-sm text-[--color-discount]"
        aria-label="Precio de promoción del producto"
        data-testid="Precio"
      >
        {priceContent}
      </span>
    );
  }
  if (type === PriceTypeEnum.STRIKE) {
    return (
      <span
        className="font-medium text-sm line-through text-[--color-text-disabled]"
        aria-label="Precio anterior"
        data-testid="Precio"
      >
        {priceContent}
      </span>
    );
  }

  return (
    <span
      className="font-medium text-sm"
      aria-label="Precio de lista del producto"
      data-testid="Precio"
    >
      {priceContent}
    </span>
  );
}
