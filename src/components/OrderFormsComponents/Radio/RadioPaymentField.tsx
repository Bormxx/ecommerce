import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import { Field, Label, Radio } from "@headlessui/react";

export type RadioPaymentFieldProps = {
  id?: number;
  cardNumber?: string;
};

export default function RadioPaymentField({ id, cardNumber}: RadioPaymentFieldProps) {
  return (
    <Field className="flex items-center gap-2 box-border min-w-[118px] sm:min-w-[139px]">
      <Radio
        value={id ?? null}
        className={cn(
          "w-full center cursor-pointer rounded sm:rounded-md sm:border bg-blue-100/60 sm:bg-transparent",
          "border-gray-400 sm:px-4 sm:py-2 px-3 py-1 outline-1 hover:border-blue-600",
          "hover:text-blue-600 sm:outline-blue-600 data-[checked]:outline",
          "data-[checked]:border-blue-600 data-[checked]:text-blue-600 data-[checked]:bg-blue-100/60"
        )}>
        <p className={`${inter.className} text-sm sm:text-base text-center font-normal`}>
          {cardNumber ? `Карта *${cardNumber}` : "Наличными при получении"}
        </p>
      </Radio>
      <Label className="sr-only">{cardNumber ? `Оплата картой номер ${cardNumber}` : "Оплата наличными"}</Label>
    </Field>
  );
}
