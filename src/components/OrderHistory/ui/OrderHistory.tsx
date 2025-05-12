import { roboto } from "@/styles/fonts";
import { useOrders } from "../../../shared/hooks/queries/useOrders";
import LoadingIcon from "../../LoadingIcon/LoadingIcon";
import { OrderCard } from "./OrderCard";

export function OrderHistory() {
  const { orders, isPendingOrders } = useOrders();

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
        {isPendingOrders ? (
          <LoadingIcon />
        ) : orders && orders.length !== 0 ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <div className="flex items-center justify-center ">
            <p className="text-base font-normal text-gray-500">
              Заказов пока нет
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
