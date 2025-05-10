import { roboto } from "@/styles/fonts";
import { useOrders } from "../../../shared/hooks/queries/useOrders";
import { OrderCard } from "./OrderCard";

export function OrderHistory() {
  const { orders } = useOrders();

  return (
    <div className="flex flex-col pb-20 md:pb-0">
      <h1
        className={`${roboto.className} hidden pb-5 text-2xl font-bold md:block`}
      >
        История заказов
      </h1>
      {/*Список*/}
      <div className="flex flex-col gap-4">
        {/*Карточки*/}
        {orders ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <div className="flex min-h-[200px] items-center justify-center rounded-xl bg-gray-100 p-4 shadow-lg">
            <p className="text-base font-normal text-gray-500">
              Заказов пока нет
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
