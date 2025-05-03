import { basket } from "@/api/models/cart";
import {
  lists,
  orders,
  OrderWithItems,
} from "@/api/models/order";


import { eq } from "drizzle-orm";
import { db } from "../../api/db";

// Получение всех заказов пользователя
export async function getUserOrders(userId: number): Promise<OrderWithItems[]> {
  try {
    const userOrders = await db.query.orders.findMany({
      where: (order, { eq }) =>
        eq(order.userId, userId),

      with: {
        lists: {
          with: {
            item: {
              with: {
                photos: {
                  where: (photo, { eq }) =>
                    eq(photo.isMainPhoto, true),
                  limit: 1,
                },
                characteristics: true,
              },
            },
          },
        },
      },
    });

    return userOrders.map((order) => {
      const orderItems = order.lists.map((listItem) => ({
        item: listItem.item,
        quantity: listItem.quantity,
      }));

      const totalQuantity = orderItems.reduce(
        (sum, orderItem) => sum + orderItem.quantity,
        0,
      );

      const totalPrice = orderItems.reduce(
        (sum, orderItem) => sum + orderItem.quantity * orderItem.item.price,
        0,
      );

      const { lists, ...orderWithoutLists } = order;

      return {
        ...orderWithoutLists,
        items: orderItems,
        totalQuantity,
        totalPrice,
      };
    });
  } catch (error) {
    console.error("Ошибка в getUserOrders:", error);
    throw error;
  }
}

// Получение заказа по ID
export async function getOrderById(
  userId: number,
  orderId: number,
): Promise<OrderWithItems | null> {
  const order = await db.query.orders.findFirst({
    where: (order, { eq, and }) =>
      and(eq(order.id, orderId), eq(order.userId, userId)),
    with: {
      lists: {
        with: {
          item: {
            with: {
              photos: {
                where: (photo, { eq }) => eq(photo.isMainPhoto, true),
                limit: 1,
              },
            },
          },
        },
      },
    },
  });

  if (order) {
    console.log("[LOG] Заказ найден:", order);
    const orderItems = order.lists.map((listItem) => ({
      item: listItem.item,
      quantity: listItem.quantity,
    }));

    const totalQuantity = orderItems.reduce(
      (sum, orderItem) => sum + orderItem.quantity,
      0,
    );

    const totalPrice = orderItems.reduce(
      (sum, orderItem) => sum + orderItem.quantity * orderItem.item.price,
      0,
    );

    const { lists, ...orderWithoutLists } = order;

    return {
      ...orderWithoutLists,
      items: orderItems,
      totalQuantity,
      totalPrice,
    };
  } else {
    return null;
  }
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
        createOrderDate: new Date()
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
