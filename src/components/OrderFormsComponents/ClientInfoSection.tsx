import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import { Field, Label } from "@headlessui/react";
import { UseControllerProps } from "react-hook-form";
import { TOrderSchema } from "@/shared/types/schemas/order";
import AuthInput from "../AuthFormsComponents/InputAuth";
import ClientInfoPersonal from "./ClientInfoPersonal";
import { useMask } from "@react-input/mask";
export default function ClientInfoSection({
  control,
  name,
}: UseControllerProps<TOrderSchema>) {

  const phoneNumberMask = useMask({
    mask: "+_ (___) ___-__-__",
    replacement: {
      _: /\d/,
    },
    track: ({ inputType, value, data, selectionStart, selectionEnd }) => {
      if (inputType === 'insert' && !/^7/.test(data) && selectionStart <= 1) {
        return `7${data === "8" ? "" : data}`;
      }
  
      if (inputType !== 'insert' && selectionStart <= 1 && selectionEnd < value.length) {
        if (selectionEnd > 2) {
          return '1';
        }
        if (selectionEnd === 2) {
          return false;
        }
      }
  
      return data;
    },
  });
  
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-2">
      <ClientInfoPersonal />
      <Field className="">
        <Label
          className={cn(inter.className, "mb-[2px] block text-xs font-normal text-gray-500 sm:text-black")}
        >
          Номер телефона
        </Label>
        <AuthInput
          name={name}
          control={control}
          placeholder="+7"
          defaultValue={''}
          type="tel"
          maxLength={18}
          mask={phoneNumberMask}
        />
      </Field>
    </div>
  );
}
