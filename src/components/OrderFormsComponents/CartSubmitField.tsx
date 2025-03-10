import { getProductWord } from "@/shared/utils/frontend/cartHelpers";
import { inter, roboto } from "@/styles/fonts";
import { ReactNode } from "react";
import FormButton from "../AuthFormsComponents/FormButton";
import { FieldValues, UseFormTrigger } from "react-hook-form";

type CartSubmitFieldProps<T extends FieldValues> = {
  title: string,
  items: number,
  isDisabled: boolean,
  children: ReactNode,
  trigger: UseFormTrigger<T>;
}

export default function CartSubmitField<T extends FieldValues>(props: CartSubmitFieldProps<T>) {
  return (
    <div className="min-w-[300px] max-w-[380px] grow rounded-xl px-4 py-5 shadow-lg h-fit">
      <div className="hidden flex-col gap-4 md:flex">
        <div className="flex justify-between">
          <p className={`${roboto.className} text-xl font-bold`}>
            { props.title }
          </p>
          <span className={`${inter.className} text-xs text-slate-400`}>
            {getProductWord(props.items)}
          </span>
        </div>
        {props.children}
        <FormButton text="Оплатить заказ" isValid={props.isDisabled} trigger={props.trigger} />
      </div>
    </div>
  );
}
