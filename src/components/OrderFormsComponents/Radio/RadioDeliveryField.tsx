import { inter } from "@/styles/fonts";
import { Field, Label, Radio } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

export type RadioDeliveryFieldProps = {
  isCourier: boolean,
  openFn: Dispatch<SetStateAction<boolean>>
};

export default function RadioDeliveryField({ isCourier, openFn }: RadioDeliveryFieldProps) {
  return (
    <Field
      onClick={() => openFn(isCourier)}
      className="flex items-center box-border w-full">
      <Radio
        value={isCourier}
        className="w-full cursor-pointer rounded-md border border-gray-400 py-2 outline-1 hover:border-blue-600 hover:text-blue-600 outline-blue-600 data-[checked]:outline data-[checked]:border-blue-600 data-[checked]:text-blue-600 data-[checked]:bg-blue-100/60"
      >
        <p className={`${inter.className} text-base font-normal text-center`}>
          {isCourier ? "Курьером" : "В пункт выдачи"}
        </p>
      </Radio>
      <Label className="sr-only">{isCourier ? "Доставка курьером": "Самовывоз из пункта выдачи"}</Label>
    </Field>
  );
}
