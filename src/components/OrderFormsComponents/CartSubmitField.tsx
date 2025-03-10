import { inter, roboto } from "@/styles/fonts";
import { ReactNode } from "react";

type CartSubmitFieldProps = {
  title: string,
  items: number,
  isDisabled: boolean,
  children: ReactNode,
}

export default function CartSubmitField(props: CartSubmitFieldProps) {
  return (
    <div className="min-w-[300px] max-w-[380px] grow rounded-xl px-4 py-5 shadow-lg md:static md:h-[165px] md:w-72 md:rounded-xl">
      <div className="flex justify-between md:hidden">
        <span className="text-xl font-bold text-green-500">
          555555
        </span>
        <span
          className={`${inter.className} flex items-center text-sm text-slate-400`}
        >
          888888
        </span>
      </div>
      <div className="hidden flex-col gap-4 md:flex">
        <div className="flex justify-between">
          <p className={`${roboto.className} text-xl font-bold`}>
            Ваша корзина
          </p>
          <span className={`${inter.className} text-xs text-slate-400`}>
            777777
          </span>
        </div>
        <div className="mb-2 flex items-end justify-between">
          <p className={`${inter.className} text-xs text-gray-500`}>
            Сумма заказа
          </p>
          <span
            className={`${roboto.className} text-3xl font-bold text-green-500`}
          >
            999999
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-800 p-2 font-bold"
      >
        Оформить заказ
      </button>
    </div>
  );
}
