/* eslint-disable react-hooks/exhaustive-deps */
import { inter, roboto } from "@/styles/fonts";

import { useEffect, useState } from "react";
import CartForm from "./CartForm";
import { BasketItem, Product } from "@/shared/types";
import { getProductWord } from "@/shared/utils/frontend/cartHelpers";
type CartSectionProps = {
  itemsInBasketFromApi: BasketItem[];
  favorites: Product[] | [];
  setFavorites: (items: Product[]) => void;
};
export default function CartSection({
  itemsInBasketFromApi,
  favorites,
  setFavorites,
}: CartSectionProps) {
  const [content, setContent] = useState<React.ReactNode>(null);
  const [itemList, setItemList] = useState(itemsInBasketFromApi);

  useEffect(() => {
    setItemList(itemsInBasketFromApi);
  }, [itemsInBasketFromApi]);

  useEffect(() => {
    if (itemList.length === 0) {
      setContent(<p className="text-lg">Ваша корзина пуста</p>);
    } else {
      setContent(
        <CartForm
          itemList={itemList}
          setItemList={setItemList}
          favorites={favorites}
          setFavorites={setFavorites}
        />,
      );
    }
  }, [itemList, favorites]);

  return (
    <div className="w-full md:pl-5">
      <div className="flex gap-4">
        <h1 className={`${roboto.className} text-2xl font-bold`}>Корзина</h1>
        <span
          className={`${inter.className} flex items-center text-sm text-slate-400 md:hidden`}
        >
          {getProductWord(itemList.length)}
        </span>
      </div>
      {content}
    </div>
  );
}
