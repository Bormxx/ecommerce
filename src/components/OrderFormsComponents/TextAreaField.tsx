import { TOrderSchema } from "@/shared/types/schemas/order";
import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import { Field, Label, Textarea } from "@headlessui/react";
import { Controller, UseControllerProps } from "react-hook-form";

export default function TextAreaField({
  control,
  name,
}: UseControllerProps<TOrderSchema>) {
  return (
    <Controller
      control={control}
      defaultValue={""}
      name={name}
      render={({ field: { value, onChange, ...props } }) => {
        return (
          <Field>
            <Label
              className={cn(inter.className, "mb-[2px] text-sm font-normal text-gray-500 sm:text-black")}
            >
              Комментарий к заказу
            </Label>
            <Textarea
              {...props}
              className={cn(
                inter.className,
                "block w-full resize-none rounded border-gray-400 px-3 py-2 text-base font-normal hover:border-blue-500",
              )}
              onChange={onChange}
              value={typeof(value) === "string" ? value : ""}
              rows={3}
              maxLength={150}
            />
          </Field>
        );
      }}
    />
  );
}
