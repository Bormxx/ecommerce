import DeliveryType from "../OrderFormsComponents/DeliveryType";
import OrderFieldSet from "../OrderFormsComponents/OrderFieldset";
import PaymentType from "../OrderFormsComponents/PaymentType";
import { Field, Input, Label, Textarea } from "@headlessui/react";
import ComboboxCustom from "../OrderFormsComponents/ComboboxCustom";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { TOrderSchema, orderSchema } from "@/shared/types/schemas/order";
import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import CartSubmitField from "../OrderFormsComponents/CartSubmitField";
import CartSubmitDetails from "../OrderFormsComponents/CartDetails/CartSubmitDetails";
import AddressSection from "../OrderFormsComponents/AddressSection";
import DeliveryDate from "../OrderFormsComponents/DeliveryDate";

export default function OrderForm() {
  const [isCourier, setIsCourier] = useState(true);
  const [city, setCity] = useState("Москва");

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm<TOrderSchema>({
    resolver: zodResolver(orderSchema),
    mode: "all",
  });

  const deliveryDate = DateTime.now()
    .reconfigure({ locale: "ru" })
    .plus({ day: 2 })
    .toLocaleString(DateTime.DATE_FULL);

  const storages: { [key: string]: string } = {
    Москва: "ул. Колотушкина, д. 23, 1-ый этаж",
    "Санкт-Петербург": "ул. Галины, д. 1",
    Орел: "ул. Павлова, д. 10-б",
  };

  return (
    <section className="pt-10">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          if (!data.isCourier && data.city) {
            data.address = storages[data.city];
          }
          console.log(data);
        })}
        className="flex justify-center gap-5"
      >
        <div className="flex max-w-[580px] flex-col gap-6">
          <OrderFieldSet header={"Способ оплаты"}>
            <PaymentType control={control} name={"payment"} />
          </OrderFieldSet>
          
          <OrderFieldSet header={"Способ доставки"} wider={true}>
            <DeliveryType
              control={control}
              name={"isCourier"}
              openFn={setIsCourier}
            />
            <AddressSection
              isCourier={isCourier}
              city={city}
              storageAddress={storages[city]}
              name={"address"}
              control={control}
            >
              <ComboboxCustom
                control={control}
                name={"city"}
                openFn={setCity}
              />
            </AddressSection>
            <DeliveryDate deliveryDate={deliveryDate} />
          </OrderFieldSet>

          <OrderFieldSet header={"Получатель"}>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className={cn(inter.className, "text-base font-normal")}>
                  Ярополк Филибусов
                </p>
                <p
                  className={cn(
                    inter.className,
                    "text-sm font-normal text-gray-500",
                  )}
                >
                  email@email.ru
                </p>
              </div>
              <Field>
                <Label
                  className={cn(
                    inter.className,
                    "mb-[2px] block text-xs font-normal",
                  )}
                >
                  Номер телефона
                </Label>
                <Input
                  {...register("phone")}
                  type="tel"
                  placeholder="+7"
                  className={cn(
                    inter.className,
                    "rounded px-3 py-2 text-base font-normal hover:border-blue-500",
                    errors.phone ? "border-red-500" : "border-gray-400",
                  )}
                />
                {errors.phone && (
                  <p
                    className={cn(
                      inter.className,
                      "text-sm font-normal text-red-500",
                    )}
                  >
                    {errors.phone.message}
                  </p>
                )}
              </Field>
            </div>
            <Field>
              <Label
                className={cn(inter.className, "mb-[2px] text-sm font-normal")}
              >
                Комментарий к заказу
              </Label>
              <Textarea
                {...register("comment")}
                className={cn(
                  inter.className,
                  "block w-full resize-none rounded border-gray-400 px-3 py-2 text-base font-normal hover:border-blue-500",
                )}
                rows={3}
              />
            </Field>
          </OrderFieldSet>
        </div>
        <CartSubmitField
          title={"Ваш заказ"}
          items={5}
          isDisabled={isValid}
          trigger={trigger}
        >
          <CartSubmitDetails cost={`20 000`} />
        </CartSubmitField>
      </form>
    </section>
  );
}
