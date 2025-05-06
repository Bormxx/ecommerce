import { Product, ProductInfo } from "../types";

// Получить список товаров
export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`/api/products`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data.items;
};

// Получить товар по ID
export const getProductById = async (
  idProduct: number,
): Promise<ProductInfo> => {
  const response = await fetch(`/api/products/${idProduct}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  console.log(data, " 123");
  return data;
};

export const getFavoritesInfo = async () => {
  const response = await fetch(
    "https://ecommerce-bay-xi.vercel.app/api/products/favorites",
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
