export function formatPrice(priceNumber: number): string {
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return priceFormatter.format(priceNumber);
}

export enum PriceTypeEnum {
  DISCOUNT,
  STRIKE,
}
