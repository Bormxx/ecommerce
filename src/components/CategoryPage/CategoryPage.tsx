import { BasketItem, Product } from "@/shared/types";
import { inter, roboto } from "@/styles/fonts";
import {
  AdjustmentsHorizontalIcon,
  ArrowLongLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CatalogList from "../CatalogList/CatalogList";
import FilterCheckbox from "../FilterComponent/FilterCheckbox";
import FilterComponent from "../FilterComponent/FilterComponent";
import FilterPrice from "../FilterComponent/FilterPrice";
import FilterRadio from "../FilterComponent/FilterRadio";
import FilterSwitch from "../FilterComponent/FilterSwitch";
import Title from "../Title/Title";
export interface TypeRequest {
  items: Product[] | undefined;
  itemsInBasketFromApi: BasketItem[];
  favorites: Product[] | [];
  setFavorites: (items: Product[]) => void;
}

export default function CategoryPage({
  items,
  itemsInBasketFromApi,
  favorites,
  setFavorites,
}: TypeRequest) {
  const router = useRouter();
  const [products, setProducts] = useState(items);
  const { id } = router.query;
  const categoryName = id
    ? typeof id === "string"
      ? "Очки " + id.charAt(0).toUpperCase() + id.slice(1)
      : ""
    : "Каталог";
  const [isOpenFilterClass, setIsOpenFilterClass] = useState("hidden");
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(400000);
  const [color, setColor] = useState<string[]>([]);
  const [available, setAvailable] = useState<boolean | undefined>(undefined);
  const [linzeUVDefences, setLinzeUVDefences] = useState(false);
  const [filterTextList, setFilterTextList] = useState<string[]>([]);
  useEffect(() => {
    setProducts(items);
  }, [items]);

  function clickOpenFilter() {
    setIsOpenFilterClass("flex");
  }

  function clickCloseFilter() {
    setIsOpenFilterClass("hidden");
  }
  const postFilter = async (body: {
    priceMin?: number;
    priceMax?: number;
    availability?: boolean;
    color?: string[];
    frameMatherials?: string[];
    linzeMatherials?: string[];
    linzeTypes?: string[];
    linzeUVDefences?: string[];
    linzeEffects?: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }): Promise<{ items: Product[] }> => {
    const response = await fetch("/api/filteredProducts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ошибка сервера: ${errorText}`);
    }
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Ответ не является JSON");
    }

    const data = await response.json();
    return data;
  };
  function handleFilter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    postFilter({
      priceMin: minPrice,
      priceMax: maxPrice,
      color: color,
      availability: available,
      linzeUVDefences: linzeUVDefences ? ["yes"] : [],
    })
      .then((response) => {
        console.log("Товары отфильтрованы:", response.items);
        setProducts(response.items);
        const newFilterList: string[] = [];
        if (minPrice > 10) {
          const formattedMinPrice = new Intl.NumberFormat("ru-RU").format(
            minPrice,
          );
          newFilterList.push(`от ${formattedMinPrice} руб.`);
        }
        if (maxPrice < 400000) {
          const formattedMaxnPrice = new Intl.NumberFormat("ru-RU").format(
            maxPrice,
          );
          newFilterList.push(`до ${formattedMaxnPrice} руб.`);
        }
        if (color.length > 0) {
          color.map((col) => {
            if (col === "blue") {
              newFilterList.push("Синий");
            }
            if (col === "no-color") {
              newFilterList.push("Прозрачный");
            }
            if (col === "gold") {
              newFilterList.push("Золотой");
            }
            if (col === "red") {
              newFilterList.push("Красный");
            }
            if (col === "black") {
              newFilterList.push("Черный");
            }
            if (col === "green") {
              newFilterList.push("Зеленый");
            }
          });
        }
        if (available != undefined) {
          if (available) {
            newFilterList.push("В наличии");
          } else {
            newFilterList.push("На заказ");
          }
        }
        if (linzeUVDefences) {
          newFilterList.push("С УФ-фильтром");
        }
        setFilterTextList(newFilterList);
      })
      .catch((error) => {
        console.error("Ошибка при фильтрации товара:", error.message);
      });
  }

  function handleCloseFilterText(filterToRemove: string) {
    const updatedFilterList = filterTextList.filter(
      (filter) => filter !== filterToRemove,
    );
    setFilterTextList(updatedFilterList);
    let newMinPrice = 10;
    let newMaxPrice = 400000;
    // eslint-disable-next-line prefer-const
    let newColors: string[] = [];
    let newAvailable: boolean | undefined = undefined;

    updatedFilterList.forEach((filter) => {
      if (filter.startsWith("от ")) {
        const num = parseInt(filter.replace(/[^\d]/g, ""), 10);
        newMinPrice = isNaN(num) ? 10 : num;
      }

      if (filter.startsWith("до ")) {
        const num = parseInt(filter.replace(/[^\d]/g, ""), 10);
        newMaxPrice = isNaN(num) ? 400000 : num;
      }
      const colorMap: Record<string, string> = {
        Синий: "blue",
        Прозрачный: "no-color",
        Золотой: "gold",
        Красный: "red",
        Черный: "black",
        Зеленый: "green",
      };
      if (colorMap[filter]) {
        newColors.push(colorMap[filter]);
      }

      if (filter === "В наличии") {
        newAvailable = true;
      } else if (filter === "На заказ") {
        newAvailable = false;
      }
    });

    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
    setColor(newColors);
    setAvailable(newAvailable);

    postFilter({
      priceMin: newMinPrice,
      priceMax: newMaxPrice,
      color: newColors,
      availability: newAvailable,
    })
      .then((response) => {
        setProducts(response.items);
      })
      .catch((error) => {
        console.error("Ошибка при повторной фильтрации:", error.message);
      });
  }

  return (
    <>
      <Breadcrumbs />
      <div className="mx-5 gap-5 md:flex">
        <div
          className={`${isOpenFilterClass} fixed left-0 top-0 z-[51] h-full w-full flex-col gap-4 overflow-y-auto bg-gray-50 px-5 py-6 md:static md:flex md:w-auto md:overflow-y-visible md:p-0`}
        >
          <div className="flex gap-1 md:hidden">
            <button type="button" onClick={clickCloseFilter}>
              <ArrowLongLeftIcon width={24} height={24} />
            </button>
            <h2
              className={`${roboto.className} text-2xl font-bold text-gray-800 md:text-3xl`}
            >
              Фильтр
            </h2>
          </div>
          <form className="flex flex-col gap-4 md:w-72" onSubmit={handleFilter}>
            <div className="flex flex-col gap-4">
              <FilterComponent
                title="Цена"
                content={
                  <FilterPrice
                    minPrice={minPrice}
                    setMinPrice={setMinPrice}
                    maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                  />
                }
              />
              <FilterComponent
                title="Цвет"
                content={<FilterCheckbox color={color} setColor={setColor} />}
              />
              <FilterComponent
                title="Наличие"
                content={
                  <FilterRadio
                    available={available}
                    setAvailable={setAvailable}
                  />
                }
              />
              <FilterComponent
                title=""
                content={
                  <FilterSwitch
                    linzeUVDefences={linzeUVDefences}
                    setLinzeUVDefences={setLinzeUVDefences}
                  />
                }
              />
            </div>
            <div className="flex w-full">
              <button
                type="submit"
                className={`${inter.className} flex-grow rounded-[8px] bg-[#1E40AF] px-4 py-2 text-base font-bold text-white`}
              >
                Применить фильтр
              </button>
            </div>
          </form>
        </div>
        <main className="w-full">
          <div className="flex justify-between">
            <Title text={categoryName} />
            <button
              type="button"
              onClick={clickOpenFilter}
              className="md:hidden"
            >
              <AdjustmentsHorizontalIcon width={24} height={24} />
            </button>
          </div>

          <div className="relative my-4 flex flex-wrap justify-evenly gap-4 md:mt-11 md:rounded-xl md:bg-white md:p-6 md:shadow-custom">
            <div className="absolute left-0 top-[-40px] hidden gap-2 md:flex">
              {filterTextList.map((filter, index) => {
                return (
                  <div
                    key={index}
                    className={`${inter.className} flex items-center rounded-[20px] border border-blue-800 px-3 py-[2px] text-xs text-blue-800`}
                  >
                    {filter}
                    <button
                      onClick={() => {
                        handleCloseFilterText(filter);
                      }}
                    >
                      <XMarkIcon width={24} height={24} className="ml-3" />
                    </button>
                  </div>
                );
              })}
            </div>

            <CatalogList
              variable="standart"
              items={products}
              productsInBasket={itemsInBasketFromApi}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </div>
        </main>
      </div>
    </>
  );
}
