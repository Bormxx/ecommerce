import {
  AdjustmentsHorizontalIcon,
  ArrowLongLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import Title from "../Title/Title";
import MiniCard from "../MiniCard/MiniCard";
import productImg from "../../images/Product-172x172.jpg";
import { useState } from "react";
import { inter, roboto } from "@/app/fonts";
import FilterComponent from "../FilterComponent/FilterComponent";
import AvailabilityFilter from "../AvailabilityFilter/AvailabilityFilterю";
import Checkbox from "../Checkbox/Checkbox";

export default function CategoryPage() {
  const product = {
    title: "Очки",
    price: 4990,
    img_url: productImg,
  };

  const [isOpenFilterClass, setIsOpenFilterClass] = useState("hidden");
  const [valueMinPrice, setValueMinPrice] = useState("10");
  const [valueMaxPrice, setValueMaxPrice] = useState("400000");

  function clickOpenFilter() {
    setIsOpenFilterClass("flex");
  }

  function clickCloseFilter() {
    setIsOpenFilterClass("hidden");
  }

  const formatInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    const formattedValue = Number(inputValue).toLocaleString("ru-RU");
    setValue(formattedValue);
  };

  return (
    <div>
      <Breadcrumbs />
      <div className="flex justify-between">
        <Title text="Очки Fendy" />
        <button type="button" onClick={clickOpenFilter}>
          <AdjustmentsHorizontalIcon width={24} height={24} />
        </button>
      </div>
      <div
        className={`${isOpenFilterClass} absolute left-0 top-0 z-[60] h-full w-full flex-col gap-4 bg-gray-50 px-5 py-6`}
      >
        <div className="flex gap-1">
          <button type="button" onClick={clickCloseFilter}>
            <ArrowLongLeftIcon width={24} height={24} />
          </button>
          <h2
            className={`${roboto.className} text-2xl font-bold text-gray-800 md:text-3xl`}
          >
            Фильтр
          </h2>
        </div>
        <form className="flex flex-col gap-4">
          <FilterComponent
            title="Цена"
            content={
              <div className="flex gap-4">
                <div className="flex flex-col gap-[2px]">
                  <span className={`${inter.className} text-xs text-gray-500`}>
                    От
                  </span>
                  <input
                    type="text"
                    value={valueMinPrice}
                    min="10"
                    onChange={(e) => formatInput(e, setValueMinPrice)}
                    className={`${inter.className} w-full rounded-[4px] border-gray-400 bg-gray-100 px-3 py-2 text-sm text-gray-800`}
                    placeholder="От"
                  />
                </div>
                <div className="flex flex-col gap-[2px]">
                  <span className={`${inter.className} text-xs text-gray-500`}>
                    До
                  </span>
                  <input
                    value={valueMaxPrice}
                    max="400000"
                    type="text"
                    onChange={(e) => formatInput(e, setValueMaxPrice)}
                    className={`${inter.className} w-full rounded-[4px] border-gray-400 bg-gray-100 px-3 py-2 text-sm text-gray-800`}
                    placeholder="До"
                  />
                </div>
              </div>
            }
          />
          <FilterComponent
            title="Цвет"
            content={
              <div className="flex flex-wrap gap-4">
                <button
                  className="absolute right-4 top-5 flex items-center gap-[2px] text-xs text-gray-500"
                  type="button"
                >
                  Все <ChevronRightIcon width={24} height={24} />
                </button>
                <Checkbox text="Синий" value="blue" name_group="color" />{" "}
                <Checkbox
                  text="Прозрачный"
                  value="no-color"
                  name_group="color"
                />
                <Checkbox text="Золотой" value="gold" name_group="color" />
                <Checkbox text="Красный" value="red" name_group="color" />
                <Checkbox text="Черный" value="black" name_group="color" />
                <Checkbox text="Зеленый" value="green" name_group="color" />
              </div>
            }
          />
          <FilterComponent title="Наличие" content={<AvailabilityFilter />} />
        </form>
      </div>
      <div className="my-4 flex flex-wrap justify-evenly gap-4">
        <MiniCard
          title={product.title}
          price={product.price}
          img_url={product.img_url}
        />
        <MiniCard
          title={product.title}
          price={product.price}
          img_url={product.img_url}
        />
        <MiniCard
          title={product.title}
          price={product.price}
          img_url={product.img_url}
        />
        <MiniCard
          title={product.title}
          price={product.price}
          img_url={product.img_url}
        />
        <MiniCard
          title={product.title}
          price={product.price}
          img_url={product.img_url}
        />
        <MiniCard
          title={product.title}
          price={product.price}
          img_url={product.img_url}
        />
        <MiniCard
          title={product.title}
          price={product.price}
          img_url={product.img_url}
        />
        <MiniCard
          title={product.title}
          price={product.price}
          img_url={product.img_url}
        />
      </div>
    </div>
  );
}
