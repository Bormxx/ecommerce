import { Basket } from "../types";

// Получит информацию о корзине (Товары, общее количество товаров, общая стоимость)
export const getBasketInfo = async (): Promise<Basket> => {
  const response = await fetch("api/basket");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

// Изменить количетсов конкретного товара в корзине
export const updateQuantityProduct = async (
  idProduct: number,
  body: { quantity: number }, 
): Promise<{ message: string }> => {
  const response = await fetch(`api/basket/${idProduct}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

// Добавить товар в корзину
export const addProductInBacket = async (body: {
  itemId: number;
  quantity: number;
}): Promise<{ message: string }> => {
  const response = await fetch(`api/basket `, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};
