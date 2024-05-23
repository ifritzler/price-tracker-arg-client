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
      className="max-w-[--max-card-with] dark:text-white px-4 py-3 bg-[--background-card] rounded-2xl shadow-md transition-transform hover:scale-105 flex flex-col gap-2 justify-between"
      aria-label="Tarjeta de producto"
    >
      <section
        aria-label="Cabecera de tarjeta de producto"
        className="relative flex flex-col gap-1"
      >
        <Image
          alt={`Imagen del producto: ${product.title}`}
          src={product.imageUrl}
          className="rounded-2xl"
          width={300}
          height={300}
        />
        {product && product.dailyPrices!.diffPercentage > 0 && (
          <span
            aria-label="Faja informativa de producto"
            className="absolute flex bottom-20 left-0 w-full h-6 bg-rose-800 z-50 opacity-95 text-xs justify-center items-center unselectable"
          >
            Aumento del {Number(product.dailyPrices!.diffPercentage).toFixed(0)}
            % en la última jornada
          </span>
        )}
        <Button
          text=""
          typeb="button-link"
          url={`${product.url}`}
          icon={<HiOutlineExternalLink size={20} />}
          onlyIcon
          className="absolute w-fit rounded-md top-3 right-3"
          aria-label="Ir a la pagina web del producto"
        />
      </section>
      <section
        aria-label="Cuerpo con información de la tarjeta de producto"
        className="flex flex-col gap-1 h-full justify-between"
      >
        <h2 aria-label="Título de producto" className="font-medium">
          {product.title}
        </h2>
        <div>
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
                  price={product.dailyPrices.price}
                  type={
                    product.dailyPrices.hasDiscount
                      ? PriceTypeEnum.STRIKE
                      : undefined
                  }
                />
                {product.dailyPrices.hasDiscount && (
                  <Price
                    price={product.dailyPrices.discountPrice}
                    type={PriceTypeEnum.DISCOUNT}
                  />
                )}
              </section>
            )}
          </div>
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
