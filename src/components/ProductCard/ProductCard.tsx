import { Product } from "@/utils/data.types";
import { PriceTypeEnum } from "@/utils/prices/prices";
import Image from "next/image";
import Price from "../Price/Price";
import Button from "../Button/Button";
import { HiOutlineExternalLink } from "react-icons/hi";

interface Props {
  product: Product;
}

export function ProductCard(props: Props) {
  const { product } = props;

  return (
    <article
      className="max-w-[--max-card-with] px-4 py-3 bg-[--background-card] rounded-2xl shadow-md transition-transform hover:scale-105 flex flex-col gap-4"
      aria-label="Tarjeta de producto"
    >
      <section
        aria-label="Cabecera de tarjeta de producto"
        className="relative"
      >
        <Image
          alt={`Imagen del producto: ${product.title}`}
          src={product.imageUrl}
          className="rounded-2xl"
          width={300}
          height={300}
        />
        <Button
          text=""
          typeb="button-link"
          url={`${product.url}`}
          icon={<HiOutlineExternalLink size={20} />}
          onlyIcon
          className="absolute w-fit rounded-md top-3 right-3"
        />
      </section>
      <section
        aria-label="Cuerpo con información de la tarjeta de producto"
        className="flex flex-col gap-1"
      >
        <h2 aria-label="Título de producto" className="font-medium">
          {product.title}
        </h2>
        <div className="flex gap-4 text-xs justify-between">
          <span className="uppercase">{product.supermarket.name}</span>
          <span className="uppercase">{product.category.name}</span>
        </div>
        <div className="flex gap-4">
          {/* Daily prices should only appear if the dailyPrices prop exist */}
          {product.dailyPrices && (
            <section className="flex gap-4 items-center justify-between w-full">
              <span className="font-medium">Precio:</span>
              <Price
                price={product.dailyPrices[0].price}
                type={
                  product.dailyPrices[0].hasPromotion
                    ? PriceTypeEnum.STRIKE
                    : undefined
                }
              />
              {product.dailyPrices[0].hasPromotion && (
                <Price
                  price={product.dailyPrices[0].promoPrice}
                  type={PriceTypeEnum.DISCOUNT}
                />
              )}
            </section>
          )}
        </div>
      </section>
      <section
        aria-label="Pie de tarjeta de producto"
        className="flex flex-col gap-1"
      >
        <Button
          text="Ver estadísticas"
          typeb="button-link"
          url={`/product/${product.id}`}
        />
      </section>
    </article>
  );
}
