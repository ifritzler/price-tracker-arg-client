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

    expect(price.classList).toContain("text-[--color-text-disabled]");
    expect(discount.classList).toContain("text-[--color-discount]");
  });

  it("should have 2 links", () => {
    render(<ProductCard product={testProduct} />);

    const button = screen.getAllByRole("link");

    expect(button.length).toBe(2);
  });

  it("should have a flag with information within when price has incresed", () => {
    render(<ProductCard product={testProduct} />);

    const flag = screen.getByLabelText("Faja informativa de producto");

    expect(flag).toBeInTheDocument();
  });

  it("flag must render the correct porcentage of increse", () => {
    render(<ProductCard product={testProduct} />);

    const flag = screen.getByLabelText("Faja informativa de producto");

    expect(flag).toHaveTextContent("Aumento del 18% en la última jornada");
  });

  it("flag shouldn't be appear if the percentage of increse is 0", () => {
    render(
      <ProductCard
        product={{
          ...testProduct,
          dailyPrices: [
            {
              ...testProduct.dailyPrices![0],
              diffPercentage: 0, // this is the object of the test
            },
          ],
        }}
      />
    );

    screen.queryByLabelText('Faja informativa de producto')
    const flag = screen.queryByLabelText('Faja informativa de producto')

    expect(flag).toBe(null);
  });
});
