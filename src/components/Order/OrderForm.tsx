import { inter } from "@/app/fonts";
import DeliveryType from "../OrderFormsComponents/DeliveryType";
import OrderFieldSet from "../OrderFormsComponents/OrderFieldset";
import PaymentType from "../OrderFormsComponents/PaymentType";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import ComboboxCustom from "../OrderFormsComponents/ComboboxCustom";
import { cn } from "@/utils/frontend/cn";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, TOrderSchema } from "../../../types/schemas/order";
import { useState } from "react";

export default function OrderForm() {
  const [isCourier, setIsCourier] = useState(true);
  const [city, setCity] = useState("Москва");

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<TOrderSchema>({
    resolver: zodResolver(orderSchema),
    mode: 'all'
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
    <section className="mx-auto grow py-10">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          if (!data.isCourier && data.city) {
            data.address = storages[data.city];
          }
          console.log(data);
        })}
        className="flex gap-5"
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
            <div className="flex flex-col gap-2">
              <h2 className={`${inter.className} text-base font-normal`}>
                {isCourier ? "Доставить по адресу:" : "Адрес пункта выдачи:"}
              </h2>
              <div className="flex gap-2">
                <Field className={cn(
                    isCourier ? "flex-col" : " items-center",
                    "flex gap-1"
                  )}>
                  <ComboboxCustom
                    control={control}
                    name={"city"}
                    openFn={setCity}
                  />
                  { errors.city && (
                      <p
                        className={cn(
                          inter.className,
                          "text-sm font-normal text-red-500",
                        )}
                      >
                        {errors.city.message}
                      </p>
                    )}
                </Field>
                {isCourier ? (
                  <Field className="flex flex-col gap-1 grow h-fit">
                    <Input
                      {...register("address")}
                      type="text"
                      placeholder="улица, дом, квартира"
                      className={cn(
                        inter.className,                        
                        "grow rounded-md border border-gray-400 text-base font-normal hover:border-blue-500",
                        errors.address ? "border-red-500" : "",
                      )}
                    />
                    <Label className="sr-only">Улица, дом, квартира</Label>
                    {errors.address && (
                      <p
                        className={cn(
                          inter.className,
                          "text-sm font-normal text-red-500",
                        )}
                      >
                        {errors.address.message}
                      </p>
                    )}
                  </Field>
                ) : city ? (
                  <div className="flex flex-col">
                    <p
                      className={cn(
                        inter.className,
                        "grow text-base font-normal text-gray-600",
                      )}
                    >
                      {storages[city]}
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
            <div className="flex gap-2">
              <p
                className={cn(
                  inter.className,
                  "text-sm font-normal text-gray-400",
                )}
              >
                Доставят
              </p>
              <p className={cn(inter.className, "text-sm font-normal")}>
                {deliveryDate}
              </p>
            </div>
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
                    "rounded  px-3 py-2 text-base font-normal hover:border-blue-500",
                    errors.phone ? "border-red-500" : "border-gray-400"
                  )}
                />
                { errors.phone && (
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
        <div className="h-fit min-w-[380px] rounded-xl px-4 py-5 shadow-lg">
          <Button 
            onMouseOver={() => trigger()}
            className="h-5 w-5 bg-slate-500" type="submit"></Button>
        </div>
      </form>
    </section>
  );
}
