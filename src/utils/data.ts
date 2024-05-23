import { Product } from "./data.types";

export const testProduct: Product = {
    id: 1,
    title: "Aceite de girasol Cocinero ecobotella 900 cc.",
    url: "https://www.carrefour.com.ar/aceite-de-girasol-cocinero-ecobotella-900-cc-732610/p",
    imageUrl: "https://carrefourar.vtexassets.com/arquivos/ids/422953-1200-auto?v=638373948257230000&width=1200&height=auto&aspect=true",
    available: true,
    categoryId: 1,
    supermarketId: 1,
    supermarket: {
      id: 1,
      name: "carrefour",
    },
    category: {
      id: 1,
      name: "Almacén",
    },
    dailyPrices: 
      {
        id: 1,
        productId: 1,
        hasDiscount: true,
        price: 10.99,
        discountPrice: 8.99,
        date: new Date(),
        diffPercentage: 18,
      },
  };