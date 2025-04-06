import { roboto } from "@/styles/fonts";
import { initialStateMock } from "../mock-data";
import { OrderCard } from "./OrderCard";

export function OrderHistory() {
  return (
    <div className="flex flex-col p-5">
      <h1 className={`${roboto.className} text-2xl font-bold`}>
        История заказов
      </h1>
      {/*Список*/}
      <div className="flex flex-col gap-4">
        {/*Карточки*/}
        {initialStateMock.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
