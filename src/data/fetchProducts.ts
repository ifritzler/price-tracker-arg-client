export const fetchProducts = async (
  page: number,
  increased: boolean,
  discountValue: boolean,
  searchValue: string,
  supermarketId: string
) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/products?${
      page && `page=${page}`
    }${discountValue ? `&p=true` : ""}${increased ? `&inc=true` : ""}${
      searchValue ? `&q=${searchValue.trim()}` : ""
    }${supermarketId ? `&supId=${supermarketId.trim()}` : ""}`
  ).then((response) => response.json());
};

export const fetchProductData = async (productId: string) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/products/${productId}`
  ).then((response) => response.json());
};

export const fetchProductMetrics = async (
  productId: string,
  dayRecords: number
) => {
  return fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_HOST
    }/api/products/metrics/${productId}?d=${dayRecords || 7}`
  ).then((response) => response.json());
};
