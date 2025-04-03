import { getProductWord } from "@/shared/utils/frontend/cartHelpers";
import { inter, roboto } from "@/styles/fonts";
import { ReactNode } from "react";
import FormButton from "../AuthFormsComponents/FormButton";
import { TOrderSchema } from "@/shared/types/schemas/order";
import { UseFormTrigger } from "react-hook-form";

type CartSubmitFieldProps = {
  title: string;
  items: number;
  isDisabled: boolean;
  children: ReactNode;
  trigger: UseFormTrigger<TOrderSchema>;
};

export default function CartSubmitField(props: CartSubmitFieldProps) {
  return (
    <div className="submit-order-form-width mb-16 h-fit w-full rounded-t-xl border-t bg-white px-5 py-5 shadow-lg sm:mb-20 sm:max-w-[598px] sm:rounded-xl sm:border-none sm:px-4 md:mb-10 lg:min-w-[320px] lg:max-w-[380px]">
      <div className="flex flex-col gap-2 sm:gap-4">
        <div className="flex items-end justify-between">
          <p className={`${roboto.className} text-base font-bold sm:text-xl`}>
            {props.title}
          </p>
          <span
            className={`${inter.className} text-sm sm:text-xs sm:text-slate-400`}
          >
            {getProductWord(props.items)}
          </span>
        </div>
        {props.children}
        <FormButton
          trigger={props.trigger}
          text="Оплатить заказ"
          isValid={props.isDisabled}
          isThin={true}
        />
      </div>
    </div>
  );
}
