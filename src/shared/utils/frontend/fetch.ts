//Запрос для поставноки лайка
export const handleToggleFavorite = async (itemId: number) => {
  try {
    const response = await fetch("/api/products/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    });

    if (!response.ok) {
      throw new Error("Ошибка лайка");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    throw error;
  }
};

//Получение всех избранных товаров
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllFavorites = async (setFavorites: any) => {
  try {
    const response = await fetch("/api/products/favorites");

    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }

    const data = await response.json();
    setFavorites(data.favorites);
  } catch (err) {
    console.error(err);
  }
};
