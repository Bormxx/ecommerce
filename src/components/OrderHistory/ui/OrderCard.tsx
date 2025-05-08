import { inter, roboto } from "@/styles/fonts";
import { useState } from "react";
import { Order } from "../../../shared/types";
import { formatedDate } from "../lib/formatedDate";
import { OrderProductCard } from "./OrderProductCard";
import { calculateStatusOrder } from '../lib/calculateStatusOrder';

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
    <div className="flex flex-col gap-4 rounded-xl p-4 shadow-lg md:min-w-[580px]">
      <div className="flex flex-col border-b border-gray-400 md:flex-row md:justify-between">
        {/*Секция с информацией*/}
        <div className="flex flex-col gap-2">
          {/*Время*/}
          <div className="flex items-end justify-between gap-2 md:justify-start">
            <p
              className={`${roboto.className} text-xl font-bold text-gray-800`}
            >
              {`от ${formatedDate(order.createOrderDate)}`}
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
              {calculateStatusOrder(order.createOrderDate)}
            </p>
            <p
              className={`${inter.className} text-small font-normal text-gray-500`}
            >
              {order.isCourier ? "доставка" : "в пункте выдачи"}
            </p>
          </div>
        </div>
        {/*Цена*/}
        <div className="mb-4 flex flex-row-reverse items-end justify-between gap-2 md:flex-col">
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
            <div key={index} className="my-4 border-b border-gray-400">
              <OrderProductCard product={item.item} quantity={item.quantity} />
            </div>
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
