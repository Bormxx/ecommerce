import { Order, OrderInfo } from "../types";
import { TOrderFormSchema } from "../types/schemas/order";

// Запрос на получение всех заказов юзера
export const getOrdersUser = async (): Promise<Order[]> => {
  const response = await fetch("api/orders");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data.orders;
};

// Запрос на получение конкретного заказа юзера
// TODO: на стороне бека изменить ответ либо сделать доп запрос на получение нормального списка товаров в заказе
export const getOrderById = async (idOrder: number): Promise<OrderInfo> => {
  const response = await fetch(`api/orders/${idOrder}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

// Запрос на создание заказа
export const addOrder = async (
  form: TOrderFormSchema,
): Promise<{ orderId: number }> => {
  const response = await fetch(`/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
