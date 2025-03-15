import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import { Field, Label } from "@headlessui/react";
import { UseControllerProps } from "react-hook-form";
import { TOrderSchema } from "@/shared/types/schemas/order";
import AuthInput from "../AuthFormsComponents/InputAuth";
import ClientInfoPersonal from "./ClientInfoPersonal";
import { useState } from "react";
import { modifyStringToNumbers, setPhoneNumber } from "@/shared/utils/frontend/dataModifiers";

export default function ClientInfoSection({
  control,
  name,
}: UseControllerProps<TOrderSchema>) {
  const [number, setNumber] = useState("");

  return (
    <div className="flex justify-between">
      <ClientInfoPersonal />
      <Field>
        <Label
          className={cn(inter.className, "mb-[2px] block text-xs font-normal")}
        >
          Номер телефона
        </Label>
        <AuthInput
          name={name}
          control={control}
          placeholder="+7"
          defaultValue={number}
          value={number}
          type="tel"
          maxLength={18}
          onChange={(input) => {
            const d = input.target.selectionStart || 0;
            setNumber(setPhoneNumber(modifyStringToNumbers(input)
          ));
            setTimeout(() => {input.target.setSelectionRange(d, d)}, 0)
          }}
        />
      </Field>
    </div>
  );
}
