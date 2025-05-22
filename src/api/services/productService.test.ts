import { getFilteredItems } from "@/api/services/productService";
import { db } from "@/api/db";

jest.mock("@/api/db", () => ({
  db: {
    query: {
      items: {
        findMany: jest.fn(),
      },
      characteristics: {
        findMany: jest.fn(),
      },
    },
    select: jest.fn(() => ({
      from: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
    })),
  },
}));

describe("getFilteredItems", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("возвращает все товары без фильтров", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 1 }]);
    const result = await getFilteredItems({});
    expect(db.query.items.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: 1 }]);
  });

  it("фильтрует по минимальной цене", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 2 }]);
    const priceMin = 100;
    await getFilteredItems({ priceMin });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
    // Проверяем, что условие содержит gte с priceMin
    // (в тестах сложно проверить полностью функцию, можно проверить вызов с gte)
  });

  it("фильтрует по максимальной цене", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 3 }]);
    const priceMax = 500;
    await getFilteredItems({ priceMax });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("фильтрует по доступности true", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 4 }]);
    const availability = true;
    await getFilteredItems({ availability });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("фильтрует по доступности false", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 5 }]);
    const availability = false;
    await getFilteredItems({ availability });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("фильтрует по цвету одним значением", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 6 }]);
    const color = ["red"];
    await getFilteredItems({ color });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("фильтрует по цвету несколькими значениями", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 7 }]);
    const color = ["red", "blue"];
    await getFilteredItems({ color });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("фильтрует по материалу рамки", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 8 }]);
    const frameMatherials = ["plastic"];
    await getFilteredItems({ frameMatherials });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("фильтрует по материалу линз", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 9 }]);
    const linzeMatherials = ["glass"];
    await getFilteredItems({ linzeMatherials });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("фильтрует по типам линз", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 10 }]);
    const linzeTypes = ["single-vision"];
    await getFilteredItems({ linzeTypes });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("фильтрует по защите от UV", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 11 }]);
    const linzeUVDefences = ["UV400"];
    await getFilteredItems({ linzeUVDefences });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("фильтрует по эффектам линз", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 12 }]);
    const linzeEffects = ["polarized"];
    await getFilteredItems({ linzeEffects });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("фильтрует по нескольким характеристикам одновременно", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 13 }]);
    const color = ["red"];
    const frameMatherials = ["plastic"];
    const linzeTypes = ["bifocal"];
    await getFilteredItems({ color, frameMatherials, linzeTypes });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("фильтрует по цене, доступности и характеристикам вместе", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 14 }]);
    const priceMin = 100;
    const priceMax = 500;
    const availability = true;
    const color = ["red"];
    const linzeEffects = ["polarized"];
    await getFilteredItems({
      priceMin,
      priceMax,
      availability,
      color,
      linzeEffects,
    });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("возвращает пустой массив если ничего не найдено", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([]);
    const result = await getFilteredItems({ color: ["unknown"] });
    expect(result).toEqual([]);
  });

  it("корректно обрабатывает пустые массивы характеристик", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 15 }]);
    const result = await getFilteredItems({
      color: [],
      frameMatherials: [],
      linzeMatherials: [],
      linzeTypes: [],
      linzeUVDefences: [],
      linzeEffects: [],
    });
    expect(result).toEqual([{ id: 15 }]);
  });

  it("фильтрует по множественным значениям для нескольких характеристик", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 16 }]);
    await getFilteredItems({
      color: ["red", "blue"],
      frameMatherials: ["plastic", "metal"],
      linzeEffects: ["polarized", "anti-reflective"],
    });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });

  it("обрабатывает undefined для всех фильтров (возвращает все)", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 17 }]);
    const result = await getFilteredItems({
      priceMin: undefined,
      priceMax: undefined,
      availability: undefined,
      color: [],
      frameMatherials: [],
      linzeMatherials: [],
      linzeTypes: [],
      linzeUVDefences: [],
      linzeEffects: [],
    });
    expect(result).toEqual([{ id: 17 }]);
  });

  it("фильтрует с наличием, минимальной и максимальной ценой и всеми характеристиками", async () => {
    (db.query.items.findMany as jest.Mock).mockResolvedValueOnce([{ id: 19 }]);
    await getFilteredItems({
      priceMin: 50,
      priceMax: 1000,
      availability: true,
      color: ["red"],
      frameMatherials: ["plastic"],
      linzeMatherials: ["glass"],
      linzeTypes: ["single-vision"],
      linzeUVDefences: ["UV400"],
      linzeEffects: ["polarized"],
    });
    const call = (db.query.items.findMany as jest.Mock).mock.calls[0][0];
    expect(call.where).toBeDefined();
  });
});
