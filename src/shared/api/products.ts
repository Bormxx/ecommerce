import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`/api/products`);
  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data.items;
};
