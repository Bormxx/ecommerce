import DeliveryType from "../OrderFormsComponents/DeliveryType";
import OrderFieldSet from "../OrderFormsComponents/OrderFieldset";
import PaymentType from "../OrderFormsComponents/PaymentType";
import ComboboxCustom from "../OrderFormsComponents/ComboboxCustom";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { TOrderSchema, orderSchema } from "@/shared/types/schemas/order";
import CartSubmitField from "../OrderFormsComponents/CartSubmitField";
import CartSubmitDetails from "../OrderFormsComponents/CartDetails/CartSubmitDetails";
import AddressSection from "../OrderFormsComponents/AddressSection";
import DeliveryDate from "../OrderFormsComponents/DeliveryDate";
import TextAreaField from "../OrderFormsComponents/TextAreaField";
import ClientInfoSection from "../OrderFormsComponents/ClientInfoSection";
import MyModal from "../Dialog/Dialog";
import FormHeader from "../AuthFormsComponents/FormHeader";
import CardDataModal from "../Dialog/Variants/CardDataModal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@headlessui/react";

export default function OrderForm() {
  const [isCourier, setIsCourier] = useState(true);
  const [city, setCity] = useState("Москва");
  const [isOpened, setIsOpened] = useState(false);

  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");

  const {
    handleSubmit,
    control,
    trigger,
    formState: { isValid },
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
    <>
      <section>
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
              <PaymentType
                control={control}
                name={"payment"}
                openFn={setIsOpened}
              />
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
              <ClientInfoSection control={control} name={"phone"} />
              <TextAreaField name="comment" control={control} />
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
      <MyModal isTrue={isOpened} closeFn={setIsOpened}>
        <div className="flex justify-between">
          <FormHeader>Введите данные карты:</FormHeader>
          <Button type="button" onClick={() => setIsOpened(!isOpened)}>
            <XMarkIcon className="size-8 rounded-sm border-gray-500 text-gray-500 hover:border hover:text-gray-800" />
          </Button>
        </div>
        <CardDataModal
          states={{
            number,
            month,
            year,
            cvv,
            setNumber,
            setMonth,
            setYear,
            setCvv,
          }}
        />
      </MyModal>
    </>
  );
}
