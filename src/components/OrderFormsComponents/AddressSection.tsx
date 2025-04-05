import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import { Field, Label } from "@headlessui/react";
import { ReactNode } from "react";
import AuthInput from "../AuthFormsComponents/InputAuth";
import { UseControllerProps } from "react-hook-form";
import { TOrderSchema } from "@/shared/types/schemas/order";

type AddressSectionProps = {
  isCourier: boolean;
  children: ReactNode;
  city: string;
  storageAddress: string;
} & UseControllerProps<TOrderSchema>

export default function AddressSection({isCourier, children, name, control, city, storageAddress}: AddressSectionProps) {
  
  return (
    <div className="flex flex-col gap-1 sm:gap-2">
      <h2 className={`${inter.className} text-sm sm:text-base font-normal`}>
        {isCourier ? "Доставить по адресу:" : "Адрес пункта выдачи:"}
      </h2>
      <div className="flex flex-col flex-position-row gap-1 sm:gap-2">
        <Field
          className={cn(
            isCourier ? "flex-col gap-1" : "items-center gap-3",
            "flex",
          )}
        >
          { children }
        </Field>
        {isCourier ? (
          <Field className="flex h-fit grow flex-col gap-1">
            <AuthInput
              defaultValue={""}
              control={control}
              name={name}
              type="text"
              placeholder="улица, дом, квартира"
              maxLength={50}
            />
            <Label className="sr-only">Улица, дом, квартира</Label>
          </Field>
        ) : city ? (
          <div className="flex flex-col">
            <p
              className={cn(
                inter.className,
                "grow text-sm sm:text-base font-normal text-gray-600",
              )}
            >
              { storageAddress }
            </p>
            <p
              className={cn(
                inter.className,
                "text-sm font-normal text-gray-400",
              )}
            >
              Время работы: 10:00-22:00
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
