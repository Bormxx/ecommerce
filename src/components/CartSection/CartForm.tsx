import Image from "next/image";
import { useRouter } from "next/navigation";
import CardInBasket from "@/components/MiniCard/CardInBasket";
import { inter, roboto } from "@/styles/fonts";
import { BasketItem, Favorites } from "@/shared/types";
import { getProductWord } from "@/shared/utils/frontend/cartHelpers";
import { useEffect, useState } from "react";
import { updateQuantityProduct } from "@/shared/api/basket";

type CartFormProps = {
  itemList: BasketItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItemList: any;
  favorites: Favorites[] | [];
};
export default function CartForm({
  itemList,
  setItemList,
  favorites,
}: CartFormProps) {
  const [total, setTotal] = useState(
    itemList.reduce((acc, item) => acc + item.item.price * item.quantity, 0),
  );

  const router = useRouter();
  const deleteCard = async (id: number) => {
    try {
      const result = await updateQuantityProduct(id, {
        quantity: 0,
      });
      console.log("Товар удален успешно:", result.message);
    } catch (error) {
      console.error("Ошибка при удалении товара:", error);
    }

    setItemList((prevList: BasketItem[]) =>
      prevList.filter((item) => item.item.id !== id),
    );
  };
  useEffect(() => {
    const totalSum = itemList.reduce(
      (acc, item) => acc + item.item.price * item.quantity,
      0,
    );
    setTotal(totalSum);
  }, [itemList]);
  function plusQuantity(id: number) {
    setItemList((prevList: BasketItem[]) =>
      prevList.map((item) =>
        item.item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  const formattedTotal = new Intl.NumberFormat("ru-RU").format(total);

  //добавить api на удаление товара если item.quantity = 1
  function minusQuantity(id: number) {
    setItemList((prevList: BasketItem[]) =>
      prevList
        .map((item) =>
          item.item.id === id
            ? item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : null
            : item,
        )
        .filter((item): item is BasketItem => item !== null),
    );
  }

  return (
    <div className="flex w-full flex-col gap-3 md:flex-row">
      <div className="mr-2 flex-grow">
        {itemList.map((item) => (
          <CardInBasket
            key={item.id}
            price={item.item.price}
            title={item.item.title}
            deleteCard={() => {
              deleteCard(item.itemId);
            }}
            id={item.itemId}
            minusQuantity={minusQuantity}
            plusQuantity={plusQuantity}
            //   image={item.image}
            quantity={item.quantity}
            favorites={favorites}
          />
        ))}
      </div>
      <div>
        <div className="fixed bottom-[65px] left-0 flex w-full min-w-[280px] flex-col gap-2 bg-white p-4 shadow-lg md:static md:h-[165px] md:w-60 md:rounded-xl">
          <div className="flex justify-between md:hidden">
            <span className="text-xl font-bold text-green-500">
              {formattedTotal} &#8381;
            </span>
            <span
              className={`${inter.className} flex items-center text-sm text-slate-400`}
            >
              {getProductWord(itemList.length)}
            </span>
          </div>
          <div className="hidden flex-col gap-4 md:flex">
            <div className="flex justify-between">
              <p className={`${roboto.className} text-xl font-bold`}>
                Ваша корзина
              </p>
              <span className={`${inter.className} text-xs text-slate-400`}>
                {getProductWord(itemList.length)}
              </span>
            </div>
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
          </div>

          <button
            type="button"
            className={`w-full rounded-lg bg-blue-800 p-2 font-bold ${
              total === 0 ? "text-slate-400" : "text-white"
            }`}
            disabled={total === 0}
            onClick={() => router.push("/order")}
          >
            Оформить заказ
          </button>
        </div>
        <div className="mt-[47px]">
          <Image
            src="/images/chick-with-books.svg"
            alt="Женщина с книгой"
            width={288}
            height={396}
            priority
            className="opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
