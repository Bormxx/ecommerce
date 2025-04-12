import { basket } from "@/api/models/cart";
import { lists, Order, OrderItem, orders } from "@/api/models/order";

import { eq } from "drizzle-orm";
import { db } from "../../api/db";

// Получение всех заказов пользователя
export async function getUserOrders(userId: number): Promise<Order[]> {
  return db.select().from(orders).where(eq(orders.userId, userId));
}

// Получение заказа по ID
export async function getOrderById(
  userId: number,
  orderId: number,
): Promise<{ order: Order; items: OrderItem[] } | null> {
  const order = await db
    .select()
    .from(orders)
    .where(eq(orders.id, orderId) && eq(orders.userId, userId))
    .get();

  if (!order) {
    return null;
  }

  const items = await db.select().from(lists).where(eq(lists.orderId, orderId));

  return { order, items };
}

// TODO: Исправить возможность создание заказа с пустой корзиной. Оставил пока такую реализацию, чтобы проще тестировать
export async function createOrder(
  userId: number,
  orderData: {
    comment?: string;
    address: string;
    phone: string;
    isCourier: boolean;
    payment?: number;
  },
): Promise<number> {
  return db.transaction(async (tx) => {
    const [newOrder] = await tx
      .insert(orders)
      .values({
        userId,
        comment: orderData.comment,
        address: orderData.address,
        phone: orderData.phone,
        isCourier: orderData.isCourier,
        payment: orderData.payment,
      })
      .returning({ id: orders.id });

    const cartItems = await tx
      .select()
      .from(basket)
      .where(eq(basket.userId, userId));

    if (cartItems.length > 0) {
      await tx.insert(lists).values(
        cartItems.map((item) => ({
          orderId: newOrder.id,
          itemId: item.itemId,
          quantity: item.quantity,
        })),
      );

      await tx.delete(basket).where(eq(basket.userId, userId));
    }

    return newOrder.id;
  });
}
