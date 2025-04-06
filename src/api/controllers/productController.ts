import {
  createItem,
  getAllItems,
  getItemById,
} from "@/api/services/productService";
import { NextApiResponse } from "next";

// Получение всех товаров
export async function getAllItemsHandler(res: NextApiResponse) {
  const items = await getAllItems();
  res.status(200).json({ items });
}

// Получение товара по ID
export async function getItemByIdHandler(itemId: number, res: NextApiResponse) {
  const itemData = await getItemById(itemId);
  if (!itemData.item) {
    return res.status(404).json({ error: "Товар не найден" });
  }
  res.status(200).json({ ...itemData });
}

// Создание товара
export async function createItemHandler(
  data: {
    title: string;
    price: number;
    description: string;
    availability: boolean;
    photos?: { photoLink: string; isMainPhoto: boolean }[];
    characteristics?: {
      frameMatherials: string;
      linzeMatherials: string;
      linzeTypes: string;
      linzeUVDefences: string;
      linzeEffects: string;
    };
  },
  res: NextApiResponse,
) {
  const itemId = await createItem(data);
  res.status(201).json({ itemId });
}
