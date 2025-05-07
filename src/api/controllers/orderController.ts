import {
  createOrder,
  getOrderById,
  getUserOrders,
} from "@/api/services/orderService";
import { NextApiResponse } from "next";

// TODO: Добавить запрос на получение списка товара в заказе с подробной инфой или см. задачу ниже (v2)
// TODO: Добавить обработку ошибок для остальных методов
// TODO: Добавить валидацию данных (опционально пока, не в приоритете)

// Получение всех заказов пользователя
export async function getOrdersHandler(userId: number, res: NextApiResponse) {
  const orders = await getUserOrders(userId);
  res.status(200).json({ orders });
}

// Создание заказа
export async function createOrderHandler(
  userId: number,
  data: {
    comment?: string;
    address: string;
    phone: string;
    isCourier: boolean;
    payment?: number;
  },
  res: NextApiResponse,
) {
  const orderId = await createOrder(userId, data);
  res.status(200).json({ orderId });
}

// Получение заказа по ID
export async function getOrderByIdHandler(
  userId: number,
  orderId: number,
  res: NextApiResponse,
) {
  const orderData = await getOrderById(userId, orderId);
  if (!orderData) {
    return res.status(404).json({ error: "Заказ не найден" });
  }
  res.status(200).json({ ...orderData });
}
