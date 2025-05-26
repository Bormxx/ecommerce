import {
  createOrder,
  getOrderById,
  getUserOrders,
} from "@/api/services/orderService";
import { NextApiResponse } from "next";
import { z } from "zod";

const orderSchema = z.object({
  comment: z.string().optional(),
  address: z.string().min(1, "Адрес обязателен"),
  phone: z.string().min(5, "Телефон обязателен"),
  isCourier: z.boolean(),
  payment: z.number().nullable().optional(),
});

// Получение всех заказов пользователя
export async function getOrdersHandler(userId: number, res: NextApiResponse) {
  try {
    const orders = await getUserOrders(userId);
    return res.status(200).json({ orders });
  } catch (error) {
    console.error("[LOG] Ошибка получения заказов:", error);
    return res.status(500).json({ error: "Ошибка при получении заказов" });
  }
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
  try {
    const parsedData = orderSchema.parse(data);

    const orderId = await createOrder(userId, parsedData);
    return res.status(201).json({ orderId });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Некорректные данные заказа",
        details: error.errors,
      });
    }
    console.error("[LOG] Ошибка создания заказа:", error);
    return res.status(500).json({ error: "Ошибка при создании заказа" });
  }
}

// Получение заказа по ID
export async function getOrderByIdHandler(
  userId: number,
  orderId: number,
  res: NextApiResponse,
) {
  try {
    const orderData = await getOrderById(userId, orderId);
    if (!orderData) {
      return res.status(404).json({ error: "Заказ не найден" });
    }
    return res.status(200).json(orderData);
  } catch (error) {
    console.error("[LOG] Ошибка получения заказа:", error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
