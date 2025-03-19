"use client";
import { inter, roboto } from "@/styles/fonts";
import CardInBasket from "@/components/CardInBasket/CardInBasket";
import { useEffect, useState } from "react";
import { ECSection } from "@/components/ui/section";

export default function CartSection() {
  const [total, setTotal] = useState(0);
  const [content, setContent] = useState<React.ReactNode>(null);
  const [itemList, setItemList] = useState([
    {
      id: "1000",
      price: 2000,
      title: "Очки",
      //   image: "../images/Product.jpg",
      quantity: 1,
      like: false,
    },
    {
      id: "1001",
      price: 5000,
      title: "Рюкзак",
      //   image: "../images/Product.jpg",
      quantity: 2,
      like: true,
    },
  ]);

  const deleteCard = (id: string) => {
    setItemList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const clickLike = (id: string) => {
    setItemList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, like: !item.like } : item,
      ),
    );
  };

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
      summ += item.price * item.quantity;
    });
    return summ;
  }
  const formattedTotal = new Intl.NumberFormat("ru-RU").format(total);

  function minusQuantity(id: string) {
    setItemList((prevList) =>
      prevList.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  }

  function plusQuantity(id: string) {
    setItemList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }
  useEffect(() => {
    if (itemList.length === 0) {
      setContent(<p className="text-lg">Ваша корзина пуста</p>);
    } else {
      setContent(
        <form className="flex w-full flex-col gap-3 md:flex-row">
          <div className="flex-grow">
            {itemList.map((item) => (
              <CardInBasket
                key={item.id}
                price={item.price}
                title={item.title}
                deleteCard={() => {
                  deleteCard(item.id);
                }}
                id={item.id}
                minusQuantity={minusQuantity}
                plusQuantity={plusQuantity}
                //   image={item.image}
                //   deliveryTime={item.deliveryTime}
                quantity={item.quantity}
                like={item.like}
                clickLike={clickLike}
              />
            ))}
          </div>
          <ECSection
            title={'Ваша корзина'}
            rightContentTitle={<span>2 товара</span>}
          >
            <div className="mb-2 flex items-end justify-between">
              <p className={`${inter.className} text-xs text-gray-500`}>
                Сумма заказа
              </p>
              <span
                className={`${roboto.className} text-3xl font-bold text-green-500`}
              >
                  {formattedTotal} &#8381;
                </span>
            </div>
            <button
              type="submit"
              className={`w-full rounded-lg bg-blue-800 p-2 font-bold ${
                total === 0 ? "text-slate-400" : "text-white"
              }`}
              disabled={total === 0}
            >
              Оформить заказ
            </button>
          </ECSection>
        </form>,
      );
    }
    setTotal(updateTotal);
    setQuantity(itemList.length);
    console.log(itemList);
  }, [itemList, total]);

  return (
    <div className="">
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
