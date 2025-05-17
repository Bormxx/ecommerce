import {
  createItem,
  getAllItems,
  getItemById,
  getFilteredItems,
} from "@/api/services/productService";
import { NextApiRequest, NextApiResponse } from "next";

// TODO: Добавить запросы на получение характеристик товара, параметров, категории и тд. Потребуется для фильтра (Возможно определить в другую группу)
// TODO: Добавить обработку ошибок для остальных методов
// TODO: Добавить валидацию данных (опционально пока, не в приоритете)

// Получение всех товаров
export async function getAllItemsHandler(res: NextApiResponse) {
  const items = await getAllItems();
  res.status(200).json({ items });
}

// Получение отфильтрованных товаров
export async function getFilteredItemsHandler(req:NextApiRequest, res: NextApiResponse) {
   const {
    priceMin,
    priceMax,
    availability,
    color = [],
    frameMatherials = [],
    linzeMatherials = [],
    linzeTypes = [],
    linzeUVDefences = [],
    linzeEffects = [],
  } = req.body;

 const items = await getFilteredItems({
    priceMin: priceMin !== undefined ? parseInt(priceMin) : undefined,
    priceMax: priceMax !== undefined ? parseInt(priceMax) : undefined,
    availability: availability !== undefined ? availability === true : undefined,
    color: Array.isArray(color) ? color : [color],
    frameMatherials: Array.isArray(frameMatherials) ? frameMatherials : [frameMatherials],
    linzeMatherials: Array.isArray(linzeMatherials) ? linzeMatherials : [linzeMatherials],
    linzeTypes: Array.isArray(linzeTypes) ? linzeTypes : [linzeTypes],
    linzeUVDefences: Array.isArray(linzeUVDefences) ? linzeUVDefences : [linzeUVDefences],
    linzeEffects: Array.isArray(linzeEffects) ? linzeEffects : [linzeEffects],
  });

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
      color: string;
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
