import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import { Field, Label, Radio } from "@headlessui/react";
import { Dispatch, SetStateAction } from "react";

export type RadioDeliveryFieldProps = {
  isCourier: boolean;
  openFn: Dispatch<SetStateAction<boolean>>;
};

export default function RadioDeliveryField({
  isCourier,
  openFn,
}: RadioDeliveryFieldProps) {
  return (
    <Field
      onClick={() => openFn(isCourier)}
      className="box-border flex w-full items-center"
    >
      <Radio
        value={isCourier}
        className={cn(
          "w-full cursor-pointer rounded border-gray-400 py-1 sm:rounded-md sm:border",
          "outline-blue-600 hover:border-blue-600 hover:text-blue-600 sm:py-2 outline-1",
          "data-[checked]:border-blue-600 data-[checked]:text-blue-600 data-[checked]:outline",
          "data-[checked]:bg-blue-100/60 bg-blue-100/60 sm:bg-transparent",
        )}
      >
        <p
          className={`${inter.className} text-center text-sm font-normal sm:text-base`}
        >
          {isCourier ? "Курьером" : "В пункт выдачи"}
        </p>
      </Radio>
      <Label className="sr-only">
        {isCourier ? "Доставка курьером" : "Самовывоз из пункта выдачи"}
      </Label>
    </Field>
  );
}
