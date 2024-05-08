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
    hasPromotion: boolean;
    price: number;
    promoPrice: number;
    date: Date;
    diffPercentage: number;
  }[];
};
