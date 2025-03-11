import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import { Field, Label } from "@headlessui/react";
import { UseControllerProps } from "react-hook-form";
import { TOrderSchema } from "@/shared/types/schemas/order";
import AuthInput from "../AuthFormsComponents/InputAuth";
import ClientInfoPersonal from "./ClientInfoPersonal";

export default function ClientInfoSection({
  control,
  name
}: UseControllerProps<TOrderSchema>) {
  return (
      <div className="flex justify-between">
        <ClientInfoPersonal />
        <Field>
          <Label
            className={cn(
              inter.className,
              "mb-[2px] block text-xs font-normal",
            )}
          >
            Номер телефона
          </Label>
          <AuthInput name={name} control={control} placeholder="+7" defaultValue="" type="tel" />
        </Field>
      </div>
  );
}
