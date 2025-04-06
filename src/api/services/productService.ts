import {
  Characteristic,
  characteristics,
  Item,
  items,
  Photo,
  photos,
  Post,
} from "@/api/models/product";
import { db } from "../db";
import { averageRatingFunc } from "../utils/averageRatingFunc";
import { round } from "../utils/round";

// TODO: Реализовать метод для фильтров, для карусели, для полуения постов, но поудмать для чего отдельный запрос

// Получение всех товаров
export async function getAllItems(): Promise<Item[]> {
  return db.select().from(items);
}

// Получение товара по ID
export async function getItemById(itemId: number): Promise<{
  item: Item | null;
  photos: Photo[];
  characteristics: Characteristic[];
  posts: Post[];
  averageRating: number;
  postsCount: number;
}> {
  const item = await db.query.items.findFirst({
    where: (item, { eq }) => eq(item.id, itemId),
  });

  if (!item) {
    return {
      item: null,
      photos: [],
      characteristics: [],
      posts: [],
      averageRating: 0,
      postsCount: 0,
    };
  }

  const photos = await db.query.photos.findMany({
    where: (photo, { eq }) => eq(photo.itemId, itemId),
  });

  const characteristics = await db.query.characteristics.findMany({
    where: (characteristic, { eq }) => eq(characteristic.itemId, itemId),
  });

  const posts = await db.query.posts.findMany({
    where: (post, { eq }) => eq(post.itemId, itemId),
  });

  const ratings = posts.map((post) => post.rating);
  const postsCount = ratings.length;
  const averageRating =
    postsCount > 0 ? round(averageRatingFunc(ratings), 1) : 0;

  return {
    item,
    photos: photos,
    characteristics: characteristics,
    posts: posts,
    averageRating,
    postsCount: postsCount,
  };
}

// Создание товара
export async function createItem(itemData: {
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
}): Promise<number> {
  return db.transaction(async (tx) => {
    const [newItem] = await tx
      .insert(items)
      .values({
        title: itemData.title,
        price: itemData.price,
        description: itemData.description,
        availability: itemData.availability,
      })
      .returning({ id: items.id });

    if (itemData.photos && itemData.photos.length > 0) {
      await tx.insert(photos).values(
        itemData.photos.map((photo) => ({
          itemId: newItem.id,
          photoLink: photo.photoLink,
          isMainPhoto: photo.isMainPhoto,
        })),
      );
    }

    if (itemData.characteristics) {
      await tx.insert(characteristics).values({
        itemId: newItem.id,
        frameMatherials: itemData.characteristics.frameMatherials,
        linzeMatherials: itemData.characteristics.linzeMatherials,
        linzeTypes: itemData.characteristics.linzeTypes,
        linzeUVDefences: itemData.characteristics.linzeUVDefences,
        linzeEffects: itemData.characteristics.linzeEffects,
      });
    }

    return newItem.id;
  });
}
