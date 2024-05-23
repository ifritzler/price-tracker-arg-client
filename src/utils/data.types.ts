export type Product = {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  available: boolean;
  categoryId?: number;
  supermarketId?: number;
  supermarket: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  dailyPrices?: {
    id: number;
    productId: number;
    hasDiscount: boolean;
    price: number;
    discountPrice: number;
    date: Date;
    diffPercentage: number;
  };
};
