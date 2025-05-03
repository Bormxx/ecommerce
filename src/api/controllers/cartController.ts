import {
  addItemToCart,
  getCart,
  updateCartItemQuantity,
} from "@/api/services/cartService";
import { NextApiResponse } from "next";

// TODO: Добавить обработку ошибок для остальных методов
// TODO: Добавить валидацию данных (опционально пока, не в приоритете)

// Добавить товар в корзину
export async function addItemToCartHandler(
  userId: number,
  data: { itemId: number; quantity: number },
  res: NextApiResponse,
) {
  await addItemToCart(userId, data.itemId, data.quantity);
  res.status(201).json({ message: "Товар успешно добавлен в корзину" });
}

// Обновить количество товара в корзине
export async function updateCartItemQuantityHandler(
  userId: number,
  itemId: number,
  quantity: number,
  res: NextApiResponse,
) {
  try {
    await updateCartItemQuantity(userId, itemId, quantity);
    res.status(200).json({ message: "Корзина успешна обновлена" });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Item not found in cart"
    ) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

// Получить корзину пользователя
export async function getCartHandler(userId: number, res: NextApiResponse) {
  const cart = await getCart(userId);
  res.status(200).json({ ...cart });
}
