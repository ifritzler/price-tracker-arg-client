import { testProduct } from "@/utils/data";
import { Product } from "@/utils/data.types";
import { formatPrice } from "@/utils/prices/prices";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";

describe("Product Card", () => {
  it("renders product card unchanged", () => {
    const { container } = render(<ProductCard product={testProduct} />);
    expect(container).toMatchSnapshot();
  });

  it("should be render", () => {
    render(<ProductCard product={testProduct} />);

    const card = screen.getByRole("article");

    expect(card).toBeInTheDocument();
  });

  it("props are well defined", () => {
    render(<ProductCard product={testProduct} />);

    const image = screen.getByAltText(
      `Imagen del producto: ${testProduct.title}`
    );
    const title = screen.getByLabelText("Título de producto");

    expect(image).toBeInTheDocument();
    expect(title).toHaveTextContent(testProduct.title);
  });

  it("price with discount shows correctly", () => {
    render(<ProductCard product={testProduct} />);

    const price = screen.getByLabelText("Precio anterior");
    const discountPrice = screen.getByLabelText(
      "Precio de promoción del producto"
    );

    expect(price).toHaveTextContent(
      formatPrice(testProduct.dailyPrices![0].price)
    );
    expect(discountPrice).toHaveTextContent(
      formatPrice(testProduct.dailyPrices![0].promoPrice)
    );
  });

  it("should only shows price if hasPromotion equals false", () => {
    const mockProduct: Product = {
      ...testProduct,
      dailyPrices: [{ ...testProduct.dailyPrices![0], hasPromotion: false }],
    };
    render(<ProductCard product={mockProduct} />);

    const price = screen.getByLabelText("Precio de lista del producto");

    expect(price).toBeInTheDocument();

    const prices = screen.getAllByTestId("Precio");
    expect(prices.length).toBe(1);
  });

  it("should see both price and discount price if hasPromotion is true", () => {
    render(<ProductCard product={testProduct} />);

    const price = screen.getByLabelText("Precio anterior");
    const discount = screen.getByLabelText("Precio de promoción del producto");

    const prices = screen.getAllByTestId("Precio");
    expect(prices.length).toBe(2);

    expect(price).toBeInTheDocument();
    expect(discount).toBeInTheDocument();
  });

  it("styles shows correctly in case of discount", () => {
    render(<ProductCard product={testProduct} />);

    const price = screen.getByLabelText("Precio anterior");
    const discount = screen.getByLabelText("Precio de promoción del producto");

    expect(price.classList).toContain("text-[--color-gray-disabled]");
    expect(discount.classList).toContain("text-[--color-discount]");
  });

  it("should have two buttons", () => {
    render(<ProductCard product={testProduct} />);

    const button = screen.getAllByRole("button");

    expect(button.length).toBe(2);
  });
});
