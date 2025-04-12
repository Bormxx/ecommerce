import { useQuery } from "@tanstack/react-query";
import { getOrdersUser } from "../../api/order";
import { Order } from "../../types";

export const useOrders = () => {
  const {
    data: orders,
    isPending: isPendingOrders,
    isError: isErrorOrders,
    error: errorOrders,
  } = useQuery<Order[], Error>({
    queryKey: ["orders"],
    queryFn: getOrdersUser,
  });

  return {
    orders,
    isPendingOrders,
    isErrorOrders,
    errorOrders,
  };
};
