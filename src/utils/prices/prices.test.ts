import { formatPrice } from "./prices";

describe("Test formatPrice utility", () => {
  it("a value should be transform in the correct currency Argentinian Pesos", () => {
    const price = 10.99;
    const expected = "$10.99";
    const priceResult = formatPrice(price);
    expect(priceResult).toBe(expected);
  });

  it("should price equal $0.00 when param is null", () => {
    const price = null;
    const expected = "$0.00";
    const result = formatPrice(price as unknown as number);
    expect(result).toBe(expected)
  });
});
