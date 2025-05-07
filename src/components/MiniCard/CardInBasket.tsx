import Image from "next/image";
import Link from "next/link";
import { inter } from "@/styles/fonts";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import ReplaceQuantity from "./ReplaceQuantity";
import { useEffect, useState } from "react";
import { Favorites } from "@/shared/types";

type CardInBasketProps = {
  price: number;
  title: string;
  deleteCard: () => void;
  id: number;
  quantity: number;
  minusQuantity: (id: number) => void;
  plusQuantity: (id: number) => void;
  favorites: Favorites[] | [];
};

export default function CardInBasket({
  price,
  title,
  deleteCard,
  id,
  quantity,
  minusQuantity,
  plusQuantity,
  favorites,
}: CardInBasketProps) {
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    if (favorites) {
      const liked = favorites.some((item) => item.itemId === id);
      setIsLiked(liked);
    }
  }, [favorites, id]);

  function deleteCardUsedId() {
    //тут должен быть Запрос апи для удаления товара по id
    deleteCard();
  }

  function minusQuantityItem() {
    minusQuantity(id);
  }
  function plusQuantityItem() {
    plusQuantity(id);
  }
  function clickLike() {}
  return (
    <div
      id={id.toString()}
      className="mt-4 flex flex-col border-b border-gray-200 bg-none py-3 md:rounded-xl md:bg-white md:p-4 md:shadow-md"
    >
      <div className="flex gap-2">
        <Link href={`/${id}`}>
          <Image
            src={"/images/Product.jpg"}
            alt={title}
            width={60}
            height={60}
          />
        </Link>
        <div className="flex flex-grow flex-col justify-between">
          <Link href={`/${id}`}>
            <h2 className={`${inter.className} text-sm text-blue-600`}>
              {title}
            </h2>
          </Link>
          <ReplaceQuantity
            id={id}
            quantity={quantity}
            plusQuantity={plusQuantityItem}
            minusQuantity={minusQuantityItem}
          />
        </div>
        <div className="flex flex-col">
          <span className={`${inter.className} text-end text-sm font-bold`}>
            {new Intl.NumberFormat("ru-RU").format(price * quantity)} &#8381;
          </span>
          <div className="flex">
            <button
              type="button"
              onClick={deleteCardUsedId}
              className="flex justify-center p-2 text-blue-800"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex justify-center p-2 text-blue-800"
              onClick={clickLike}
            >
              {isLiked ? (
                <HeartIconSolid className="h-4 w-4" />
              ) : (
                <HeartIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <p className={`${inter.className} text-xs text-gray-400`}>Доставят</p>
        <span className={`${inter.className} text-sm text-gray-800`}>
          {/* {deliveryTime} */}
          30 февраля 2025 г.
        </span>
      </div>
    </div>
  );
}
