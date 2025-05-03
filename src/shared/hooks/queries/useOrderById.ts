import { Order } from "@/shared/types/";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../api/order";

export const useOrderById = (id: number) => {
  const {
    data: order,
    isPending: isPendingOrder,
    isError: isErrorOrder,
    error: errorOrder,
  } = useQuery<Order, Error>({
    queryKey: ["orderById", id],
    queryFn: async () => getOrderById(id),
  });

  return {
    order,
    isPendingOrder,
    isErrorOrder,
    errorOrder,
  };
};
