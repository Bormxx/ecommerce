import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../api/products";
import { ProductInfo } from "../../types";

export const useProductById = (id: number) => {
  const {
    data: product,
    isPending: isPendingProduct,
    isError: isErrorProduct,
    error: errorProduct,
  } = useQuery<ProductInfo, Error>({
    queryKey: ["productById", id],
    queryFn: async () => getProductById(id),
  });

  return {
    product,
    isPendingProduct,
    isErrorProduct,
    errorProduct,
  };
};
