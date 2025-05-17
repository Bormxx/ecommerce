// productService.test.ts
import { getFilteredItems } from "./productService";
import { items, characteristics, photos } from "@/api/models/product";

// Моки
const mockAll = jest.fn();
const mockWhere = jest.fn(() => ({ all: mockAll }));
const mockLeftJoinPhotos = jest.fn(() => ({ where: mockWhere }));
const mockLeftJoinCharacteristics = jest.fn(() => ({ leftJoin: mockLeftJoinPhotos }));
const mockFrom = jest.fn(() => ({ leftJoin: mockLeftJoinCharacteristics }));
const mockSelect = jest.fn(() => ({ from: mockFrom }));

jest.mock("@/api/db", () => {
  return {
    db: {
      select: (...args: any[]) => mockSelect(...args),
    },
  };
});

describe("getFilteredItems", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("должен возвращать отфильтрованные товары с главной фотографией", async () => {
    mockAll.mockResolvedValueOnce([
      {
        items: { id: 1, title: "Товар 1", price: 150, availability: 1, description: "Описание 1" },
        photos: { id: 101, itemId: 1, photoLink: "photo1.jpg", isMainPhoto: 1 },
      },
    ]);

    const filters = { priceMin: 100, priceMax: 200, availability: true };
    const result = await getFilteredItems(filters);

    expect(mockSelect).toHaveBeenCalled();
    expect(mockFrom).toHaveBeenCalledWith(items);
    expect(mockLeftJoinCharacteristics).toHaveBeenCalledWith(characteristics, expect.anything());
    expect(mockLeftJoinPhotos).toHaveBeenCalledWith(photos, expect.anything());
    expect(mockWhere).toHaveBeenCalledWith(expect.anything());

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
    expect(result[0].mainPhoto.photoLink).toBe("photo1.jpg");
  });

  it("должен корректно фильтровать по характеристикам (цвет)", async () => {
    mockAll.mockResolvedValueOnce([
      {
        items: { id: 2, title: "Товар 2", price: 300, availability: 1, description: "Описание 2" },
        photos: null,
      },
    ]);

    const filters = { color: ["red", "blue"] };
    const result = await getFilteredItems(filters);

    expect(mockSelect).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
    expect(result[0].mainPhoto).toBeUndefined();
  });

  it("должен возвращать пустой массив, если товаров нет", async () => {
    mockAll.mockResolvedValueOnce([]);
    const filters = { priceMin: 1000 };
    const result = await getFilteredItems(filters);
    expect(result).toEqual([]);
  });

  it("должен работать без фильтров", async () => {
    mockAll.mockResolvedValueOnce([
      {
        items: { id: 3, title: "Товар 3", price: 50, availability: 0, description: "Описание 3" },
        photos: { id: 103, itemId: 3, photoLink: "photo3.jpg", isMainPhoto: 1 },
      },
    ]);

    const result = await getFilteredItems({});
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
    expect(result[0].mainPhoto.photoLink).toBe("photo3.jpg");
  });

  it("должен фильтровать по availability = false", async () => {
    mockAll.mockResolvedValueOnce([
      {
        items: { id: 4, title: "Товар 4", price: 200, availability: 0, description: "Описание 4" },
        photos: null,
      },
    ]);

    const result = await getFilteredItems({ availability: false });
    expect(result).toHaveLength(1);
    expect(result[0].availability).toBe(0);
  });

  it("корректно обрабатывает фильтр по frameMatherials", async () => {
    mockAll.mockResolvedValueOnce([
      {
        items: { id: 5, title: "Товар 5", price: 500, availability: 1, description: "Описание 5" },
        photos: null,
      },
    ]);

    const result = await getFilteredItems({ frameMatherials: ["plastic"] });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(5);
  });

  it("фильтрует по нескольким параметрам одновременно", async () => {
    mockAll.mockResolvedValueOnce([
      {
        items: { id: 6, title: "Товар 6", price: 750, availability: 1, description: "Описание 6" },
        photos: { id: 106, itemId: 6, photoLink: "photo6.jpg", isMainPhoto: 1 },
      },
    ]);

    const filters = {
      priceMin: 700,
      priceMax: 800,
      availability: true,
      color: ["green"],
      linzeTypes: ["type1"],
    };

    const result = await getFilteredItems(filters);
    expect(result).toHaveLength(1);
    expect(result[0].price).toBe(750);
    expect(result[0].mainPhoto.photoLink).toBe("photo6.jpg");
  });

  it("возвращает пустой массив при несовпадении фильтров", async () => {
    mockAll.mockResolvedValueOnce([]);
    const filters = { color: ["nonexistent"] };
    const result = await getFilteredItems(filters);
    expect(result).toEqual([]);
  });

  it("работает с неполными фильтрами", async () => {
    mockAll.mockResolvedValueOnce([
      {
        items: { id: 7, title: "Товар 7", price: 1500, availability: 1, description: "Описание 7" },
        photos: null,
      },
    ]);

    const result = await getFilteredItems({ priceMax: 2000 });
    expect(result).toHaveLength(1);
    expect(result[0].price).toBe(1500);
  });

  it("вызывает все звенья ORM цепочки", async () => {
    mockAll.mockResolvedValueOnce([]);
    await getFilteredItems({});

    expect(mockSelect).toHaveBeenCalledTimes(1);
    expect(mockFrom).toHaveBeenCalledTimes(1);
    expect(mockLeftJoinCharacteristics).toHaveBeenCalledTimes(1);
    expect(mockLeftJoinPhotos).toHaveBeenCalledTimes(1);
    expect(mockWhere).toHaveBeenCalledTimes(1);
    expect(mockAll).toHaveBeenCalledTimes(1);
  });

  // =============================
  // Новые тесты: Некорректные значения фильтров
  // =============================

  it("игнорирует нечисловые значения priceMin и priceMax", async () => {
    mockAll.mockResolvedValueOnce([
      {
        items: { id: 9, title: "Товар 9", price: 250, availability: 1, description: "Описание 9" },
        photos: null,
      },
    ]);

    const result = await getFilteredItems({ priceMin: "cheap", priceMax: "expensive" } as any);
    expect(result).toHaveLength(1);
    expect(result[0].price).toBe(250);
  });

  it("игнорирует некорректное значение availability", async () => {
    mockAll.mockResolvedValueOnce([
      {
        items: { id: 10, title: "Товар 10", price: 300, availability: 1, description: "Описание 10" },
        photos: null,
      },
    ]);

    const result = await getFilteredItems({ availability: "yes" } as any);
    expect(result).toHaveLength(1);
    expect(result[0].availability).toBe(1);
  });

  it("игнорирует некорректные типы у фильтров-массивов", async () => {
    mockAll.mockResolvedValueOnce([
      {
        items: { id: 11, title: "Товар 11", price: 350, availability: 1, description: "Описание 11" },
        photos: null,
      },
    ]);

    const result = await getFilteredItems({
      color: "red",
      frameMatherials: { type: "plastic" },
      linzeTypes: 42,
    } as any);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(11);
  });

  it("возвращает товары при полностью невалидных фильтрах", async () => {
    mockAll.mockResolvedValueOnce([
      {
        items: { id: 12, title: "Товар 12", price: 1200, availability: 1, description: "Описание 12" },
        photos: null,
      },
    ]);

    const result = await getFilteredItems({
      priceMin: null,
      availability: "abc",
      color: 123,
      frameMatherials: false,
      linzeTypes: undefined,
    } as any);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(12);
  });
});
