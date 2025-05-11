import { useQuery } from "@tanstack/react-query";
import { getBasketInfo } from "@/shared/api/basket";
import { useUserStore } from "@/shared/store/auth";
import { Basket } from "@/shared/types";

export const useBasket = () => {
  const { isAuthenticated } = useUserStore();

  const {
    data: basket,
    isPending: isPendingBasket,
    isError: isErrorBasket,
    error: errorBasket,
  } = useQuery<Basket, Error>({
    queryKey: ["basketInfo"],
    queryFn: getBasketInfo,
    enabled: isAuthenticated, // <- ключевая строка
  });

  return {
    basket,
    isPendingBasket,
    isErrorBasket,
    errorBasket,
  };
};
