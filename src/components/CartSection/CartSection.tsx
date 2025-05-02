/* eslint-disable react-hooks/exhaustive-deps */
import { inter, roboto } from "@/styles/fonts";

import { useEffect, useState } from "react";
import CartForm from "./CartForm";
import { BasketItem } from "@/shared/types";
type CartSectionProps = {
  itemsInBasketFromApi: BasketItem[];
};
export default function CartSection({
  itemsInBasketFromApi,
}: CartSectionProps) {
  const [total, setTotal] = useState(0);

  const [content, setContent] = useState<React.ReactNode>(null);
  const [itemList, setItemList] = useState(itemsInBasketFromApi);

  const [quantity, setQuantity] = useState(0);

  function getProductWord(quantity: number) {
    const lastDigit = quantity % 10;
    const lastTwoDigits = quantity % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
      return `${quantity} товар`;
    } else if (
      (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) &&
      (lastTwoDigits < 12 || lastTwoDigits > 14)
    ) {
      return `${quantity} товара`;
    } else {
      return `${quantity} товаров`;
    }
  }

  function updateTotal() {
    let summ = 0;
    itemList.map((item) => {
      summ += item.item.price * item.quantity;
    });
    return summ;
  }

  useEffect(() => {
    if (itemList.length === 0) {
      setContent(<p className="text-lg">Ваша корзина пуста</p>);
    } else {
      setContent(
        <CartForm
          itemList={itemList}
          setItemList={setItemList}
          total={total}
          quantity={quantity}
        />,
      );
    }
    setTotal(updateTotal);
    setQuantity(itemList.length);
  }, [itemList, total]);

  return (
    <div className="w-full md:pl-5">
      <div className="flex gap-4">
        <h1 className={`${roboto.className} text-2xl font-bold`}>Корзина</h1>
        <span
          className={`${inter.className} flex items-center text-sm text-slate-400 md:hidden`}
        >
          {getProductWord(quantity)}
        </span>
      </div>
      {content}
    </div>
  );
}
