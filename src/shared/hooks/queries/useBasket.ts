import { useQuery } from "@tanstack/react-query";
import { getBasketInfo } from "../../api/basket";
import { Basket } from "../../types";

export const useBasket = () => {
  const {
    data: basket,
    isPending: isPendingBasket,
    isError: isErrorBasket,
    error: errorBasket,
  } = useQuery<Basket, Error>({
    queryKey: ["basketInfo"],
    queryFn: getBasketInfo,
  });

  return {
    basket,
    isPendingBasket,
    isErrorBasket,
    errorBasket,
  };
};
