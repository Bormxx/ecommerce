import { inter, roboto } from "@/styles/fonts";
import { useState } from "react";
import { Order } from "../../../shared/types";
import { OrderProductCard } from "./OrderProductCard";

type Props = {
  order: Order;
};

export function OrderCard(props: Props) {
  const { order } = props;
  const [showOrders, setShowOrders] = useState(false);

  const actionShowButton = () => {
    setShowOrders((prev) => !prev);
  };

  return (
    <div className="flex min-w-[580px] flex-col gap-4 rounded-xl p-4 shadow-lg">
      <div className="flex justify-between border-b border-gray-400">
        {/*Секция с информацией*/}
        <div className="flex flex-col gap-2">
          {/*Время*/}
          <div className="flex items-end gap-2">
            <p
              className={`${roboto.className} text-xl font-bold text-gray-800`}
            >
              {/* TODO: Отдавать с бека */}
              {`от 1 февраля 2025`}
            </p>
            <p
              className={`${inter.className} text-base font-normal text-gray-800`}
            >
              {`№${order.id}`}
            </p>
          </div>
          {/*Статус*/}
          <div className="flex gap-2">
            <p
              className={`${inter.className} text-base font-bold text-emerald-500`}
            >
              {/* TODO: Отдавать с бека */}
              Получен
            </p>
            <p
              className={`${inter.className} text-small font-normal text-gray-500`}
            >
              {order.isCourier ? "доставка" : "в пункте выдачи"}
            </p>
          </div>
        </div>
        {/*Цена*/}
        <div className="mb-4 flex flex-col items-end gap-2">
          <p className={`${roboto.className} text-2xl font-bold text-gray-800`}>
            {`${order.totalPrice} ₽`}
          </p>
          <p className={`${inter.className} text-xs font-normal text-gray-500`}>
            {order.payment ? "Оплачено картой" : "Наличными"}
          </p>
        </div>
      </div>
      {/*Список товаров*/}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showOrders ? "max-h-[400px] overflow-y-auto" : "max-h-0"
        }`}
      >
        <div className="flex flex-col">
          {order.items.map((item, index) => (
            <>
              <OrderProductCard key={index} product={item.item} quantity={item.quantity}/>
              <div className="my-4 border-b border-gray-400"></div>
            </>
          ))}
        </div>
      </div>
      <button
        className={`${inter.className} mx-auto text-base font-normal text-blue-600`}
        onClick={() => actionShowButton()}
      >
        {showOrders ? "Скрыть товары" : "Показать товары в корзине"}
      </button>
    </div>
  );
}
