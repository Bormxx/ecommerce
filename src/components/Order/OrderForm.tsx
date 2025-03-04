import { inter } from "@/app/fonts";
import DeliveryType from "../OrderFormsComponents/DeliveryType";
import OrderFieldSet from "../OrderFormsComponents/OrderFieldset";
import PaymentType from "../OrderFormsComponents/PaymentType";
import { Field, Input, Label, Textarea } from "@headlessui/react";
import ComboboxCustom from "../OrderFormsComponents/ComboboxCustom";
import { cn } from "@/utils/frontend/cn";
import { DateTime } from "luxon";


export default function OrderForm() {
  const deliveryDate = DateTime.now().reconfigure({ locale: "ru" }).plus({day: 2}).toLocaleString(DateTime.DATE_FULL);

  return (
    <section className="grow py-10 mx-auto">
      <form className="flex gap-5">
        <div className="flex flex-col gap-6 max-w-[580px]">
          <OrderFieldSet header={"Способ оплаты"}>
            <PaymentType/ >
          </OrderFieldSet>
          <OrderFieldSet header={"Способ доставки"} wider={true}>
            <DeliveryType />
            <div className="flex flex-col gap-2">
              <h2 className={`${ inter.className } text-base font-normal`}>
                Доставить по адресу:
              </h2>
              <div className="flex gap-2">
                <Field>
                  <ComboboxCustom />
                </Field>
                <Field className="grow flex">
                  <Input
                    type="text"
                    placeholder="улица, дом, квартира"
                    className={cn(
                      inter.className,
                      "font-normal text-base border border-gray-400 rounded-md grow hover:border-blue-500"
                    )}
                  />
                  <Label className="sr-only">Улица, дом, квартира</Label>
                </Field>
              </div>
            </div>
            <div className="flex gap-2">
              <p className={cn(
                inter.className,
                "font-normal text-sm text-gray-400"
              )}>
                Доставят
              </p>
              <p className={cn(
                inter.className,
                "font-normal text-sm"
              )}>
                {deliveryDate}
              </p>
            </div>
          </OrderFieldSet>
          <OrderFieldSet header={"Получатель"}>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <p className={cn(
                inter.className,
                "font-normal text-base"
                )}>
                  Ярополк Филибусов
                </p>
                <p className={cn(
                inter.className,
                "font-normal text-sm text-gray-500"
                )}>
                  email@email.ru
                </p>
              </div>
              <Field>
                <Label className={cn(
                  inter.className,
                  "text-xs font-normal mb-[2px] block"
                )}>
                  Номер телефона
                </Label>
                <Input 
                  type="tel"
                  placeholder="+7"
                  className={cn(
                    inter.className,
                    "text-base font-normal px-3 py-2 rounded border-gray-400 hover:border-blue-500"
                  )}
                />
              </Field>
            </div>
            <Field>
              <Label className={cn(
                  inter.className,
                  "text-sm font-normal mb-[2px]"
              )}>
                Комментарий к заказу
              </Label>
              <Textarea 
                className={cn(
                  inter.className,
                  'text-base font-normal block w-full resize-none rounded border-gray-400 px-3 py-2 hover:border-blue-500'
                )}
                rows={3}
              />
            </Field>
          </OrderFieldSet>
        </div>
        <div className="min-w-[380px] rounded-xl shadow-lg px-4 py-5 h-fit">

        </div>
      </form>
    </section>
  );
}