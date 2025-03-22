import { getProductWord } from "@/shared/utils/frontend/cartHelpers";
import { inter, roboto } from "@/styles/fonts";
import { ReactNode } from "react";
import FormButton from "../AuthFormsComponents/FormButton";

type CartSubmitFieldProps = {
  title: string,
  items: number,
  isDisabled: boolean,
  children: ReactNode,
}

export default function CartSubmitField(props: CartSubmitFieldProps) {
  return (
    <div className="lg:min-w-[320px] lg:max-w-[380px] w-full sm:max-w-[598px] rounded-xl px-4 py-5 shadow-lg h-fit bg-white">
      <div className="flex-col sm:gap-4 gap-2 flex">
        <div className="flex justify-between items-end">
          <p className={`${roboto.className} text-base sm:text-xl font-bold`}>
            { props.title }
          </p>
          <span className={`${inter.className} sm:text-xs text-sm sm:text-slate-400`}>
            {getProductWord(props.items)}
          </span>
        </div>
        {props.children}
        <FormButton text="Оплатить заказ" isValid={props.isDisabled} isThin={true} />
      </div>
    </div>
  );
}
