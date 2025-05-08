import Link from "next/link";
import { useOrderById } from "../../../shared/hooks/queries/useOrderById";
import { useProtectedRoute } from "../../../shared/hooks/useProtectedRoute";
import { useUserStore } from "../../../shared/store/auth";
import { inter, roboto } from "../../../styles/fonts";
import { formatedDate } from "../lib/formatedDate";
import { ProductCard } from "./ProductCard";

type Props = {
  ordeId: number;
};

export const OrderInfo = (props: Props) => {
  const { ordeId } = props;
  const user = useUserStore();
  const { order } = useOrderById(ordeId);
  useProtectedRoute();

  return (
    <div className="mx-auto p-5 md:mx-0 md:p-0">
      <h1
        className={`${roboto.className} pb-5 text-3xl font-bold text-gray-800 md:pb-6`}
      >
        Спасибо за заказ!
      </h1>
      <div className="flex flex-col gap-5 rounded-xl p-6 shadow-custom">
        {/* Инфа про получателя */}
        <div className="flex flex-col gap-2 border-b border-gray-400 pb-5">
          <p className={`${inter.className} text-base font-bold text-gray-800`}>
            Получатель
          </p>
          <div className="flex flex-col md:flex-row md:gap-6">
            <p
              className={`${inter.className} text-base font-normal text-gray-800`}
            >
              {user?.name} {user?.surname}
            </p>
            <p
              className={`${inter.className} text-sm font-normal text-gray-400`}
            >
              {user?.email}
            </p>
            <p
              className={`${inter.className} text-sm font-normal text-gray-400`}
            >
              {/* TODO: Необходимо хранить тлф в БД/сторе */}
              Номер телефона
            </p>
          </div>
          <p className={`${inter.className} text-sm font-normal text-gray-800`}>
            {`Комментарий: ${order?.comment}`}
          </p>
        </div>

        {/* Пункт выдачи и дата */}
        <div className="flex flex-col gap-2 border-b border-gray-400 pb-5 md:flex-row md:gap-0">
          <div className="flex min-w-[350px] flex-col">
            <p
              className={`${inter.className} text-sm font-normal text-gray-400`}
            >
              {`${order?.isCourier ? "Адрес доставки" : "Пункт выдачи"}`}
            </p>
            <p
              className={`${inter.className} text-base font-normal text-gray-800`}
            >
              {order?.address}
            </p>
          </div>
          {!order?.isCourier && (
            <div className="flex flex-col">
              <p
                className={`${inter.className} text-sm font-normal text-gray-400`}
              >
                Забирать после
              </p>
              <p
                className={`${inter.className} text-base font-normal text-gray-800`}
              >
                {order
                  ? formatedDate(order.createOrderDate)
                  : "Уточнить у менеджера"}
              </p>
            </div>
          )}
        </div>

        {/* Карточки твоаров */}
        {/* TODO: Проверить кейс со скроллом и если что попробовать скрыть его, вроде такой параметр hidden-scrollbar */}
        {/* TODO: Подумать как лучше отобразить несколько карточек (Плитка или просто гор. скролл) */}
        <div className="max-h-80 overflow-y-auto border-b border-gray-400 pb-5">
          <div className="flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-5">
            {order &&
              order.items.map((item) => (
                <ProductCard item={item} key={item.item.id} />
              ))}
          </div>
        </div>

        {/* Итоговая сумма */}
        <div className="flex justify-between md:justify-start md:gap-5">
          <div className="flex flex-col">
            <p
              className={`${inter.className} text-sm font-normal text-gray-400`}
            >
              Общая сумма
            </p>
            <p
              className={`${roboto.className} text-3xl font-bold text-gray-800`}
            >
              {order?.totalPrice} ₽
            </p>
          </div>
          <div className="flex flex-col items-end md:items-start">
            <p
              className={`${inter.className} text-sm font-normal text-gray-400`}
            >
              {`Оплачено ${order?.payment ? "картой" : ""}`}
            </p>
            <p
              className={`${inter.className} text-2xl font-bold text-gray-500`}
            >
              {`${order?.payment ? order.payment : "наличными"}`}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end pb-20 pt-6 md:pb-0">
        <Link
          href="/order-history"
          replace={true}
          className="mx-auto text-blue-600 md:mx-0 md:underline"
        >
          Все заказы
        </Link>
      </div>
    </div>
  );
};
