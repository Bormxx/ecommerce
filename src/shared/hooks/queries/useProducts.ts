import { Product } from "@/shared/types/";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/products";

export const useProducts = () => {
  const {
    data: products,
    isPending: isPendingProducts,
    isError: isErrorProducts,
    error: errorProducts,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return {
    products: products || [],
    isPendingProducts,
    isErrorProducts,
    errorProducts,
  };
};
