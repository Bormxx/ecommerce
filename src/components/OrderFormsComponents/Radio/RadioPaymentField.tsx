import { inter } from "@/app/fonts";
import { Field, Label, Radio } from "@headlessui/react";

export type RadioPaymentFieldProps = {
  id?: number;
  cardNumber?: string;
};

export default function RadioPaymentField({ id, cardNumber}: RadioPaymentFieldProps) {
  return (
    <Field className="flex items-center gap-2 box-border">
      <Radio
        value={id ?? null}
        className="cursor-pointer rounded-md border border-gray-400 px-4 py-2 outline-1 hover:border-blue-600 hover:text-blue-600 outline-blue-600 data-[checked]:outline data-[checked]:border-blue-600 data-[checked]:text-blue-600 data-[checked]:bg-blue-100/60"
      >
        <p className={`${inter.className} text-base font-normal`}>
          {cardNumber ? `Карта *${cardNumber}` : "Наличными при получении"}
        </p>
      </Radio>
      <Label className="sr-only">{cardNumber ? `Оплата картой номер ${cardNumber}` : "Оплата наличными"}</Label>
    </Field>
  );
}
