import { Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`/api/products`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data.items;
};
