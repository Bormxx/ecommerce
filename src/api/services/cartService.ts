import { basket, CartItem } from "@/api/models/cart";
import { Item, items } from "@/api/models/product";
import { and, eq } from "drizzle-orm";
import { db } from "../db";

// Добавление товара в корзину
export async function addItemToCart(
  userId: number,
  itemId: number,
  quantity: number,
): Promise<void> {
  const existingItem = await db.query.basket.findFirst({
    where: (basket, { eq }) =>
      and(eq(basket.userId, userId), eq(basket.itemId, itemId)),
  });

  if (existingItem) {
    await db
      .update(basket)
      .set({ quantity: existingItem.quantity + quantity })
      .where(eq(basket.id, existingItem.id));
  } else {
    await db.insert(basket).values({ userId, itemId, quantity });
  }
}

// Изменение количества товара в корзине
export async function updateCartItemQuantity(
  userId: number,
  itemId: number,
  quantity: number,
): Promise<void> {
  const existingItem = await db.query.basket.findFirst({
    where: (basket, { eq }) =>
      and(eq(basket.userId, userId), eq(basket.itemId, itemId)),
  });

  if (!existingItem) {
    throw new Error("Item not found in cart");
  }

  if (quantity <= 0) {
    await db.delete(basket).where(eq(basket.id, existingItem.id));
  } else {
    await db
      .update(basket)
      .set({ quantity })
      .where(eq(basket.id, existingItem.id));
  }
}

// Получение информации о корзине
export async function getCart(userId: number): Promise<{
  items: (CartItem & { item: Item })[];
  totalQuantity: number;
  totalPrice: number;
}> {
  const cartItems = (await db
    .select({
      id: basket.id,
      userId: basket.userId,
      itemId: basket.itemId,
      quantity: basket.quantity,
      item: {
        id: items.id,
        title: items.title,
        price: items.price,
        description: items.description,
        availability: items.availability,
      },
    })
    .from(basket)
    .leftJoin(items, eq(basket.itemId, items.id))
    .where(eq(basket.userId, userId))) as (CartItem & { item: Item })[];

  let totalQuantity = 0;
  let totalPrice = 0;

  cartItems.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
    if (cartItem.item) {
      totalPrice += cartItem.item.price * cartItem.quantity;
    }
  });

  return { items: cartItems, totalQuantity, totalPrice };
}
