import { BasketItem, Product } from "@/shared/types";
import { inter, roboto } from "@/styles/fonts";
import {
  AdjustmentsHorizontalIcon,
  ArrowLongLeftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import CatalogList from "../CatalogList/CatalogList";
import FilterCheckbox from "../FilterComponent/FilterCheckbox";
import FilterComponent from "../FilterComponent/FilterComponent";
import FilterPrice from "../FilterComponent/FilterPrice";
import FilterRadio from "../FilterComponent/FilterRadio";
import FilterSwitch from "../FilterComponent/FilterSwitch";
import Title from "../Title/Title";
import ButtonLong from "../ui-kit/ButtonLong";
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
  const { id } = router.query;
  const categoryName = id
    ? typeof id === "string"
      ? "Очки " + id.charAt(0).toUpperCase() + id.slice(1)
      : ""
    : "Каталог";
  const [isOpenFilterClass, setIsOpenFilterClass] = useState("hidden");

  function clickOpenFilter() {
    setIsOpenFilterClass("flex");
  }

  function clickCloseFilter() {
    setIsOpenFilterClass("hidden");
  }
  function handleFilter() {}

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
          <form className="flex flex-col gap-4 md:w-72">
            <div className="flex flex-col gap-4">
              <FilterComponent title="Цена" content={<FilterPrice />} />
              <FilterComponent title="Цвет" content={<FilterCheckbox />} />
              <FilterComponent title="Наличие" content={<FilterRadio />} />
              <FilterComponent
                title="Еще какой-нибудь фильтр"
                content={<FilterSwitch />}
              />
            </div>
            <div className="flex w-full">
              <ButtonLong
                text="Применить фильтр"
                onClick={handleFilter}
                type="submit"
              />
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
              <div
                className={`${inter.className} flex items-center rounded-[20px] border border-blue-800 px-3 py-[2px] text-xs text-blue-800`}
              >
                Фильтр 1
                <XMarkIcon width={24} height={24} className="ml-3" />
              </div>
              <div
                className={`${inter.className} flex items-center rounded-[20px] border border-blue-800 px-3 py-[2px] text-xs text-blue-800`}
              >
                Фильтр 2
                <XMarkIcon width={24} height={24} className="ml-3" />
              </div>
            </div>

            <CatalogList
              variable="standart"
              items={items}
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
