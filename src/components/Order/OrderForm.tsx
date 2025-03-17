import DeliveryType from "../OrderFormsComponents/DeliveryType";
import OrderFieldSet from "../OrderFormsComponents/OrderFieldset";
import PaymentType from "../OrderFormsComponents/PaymentType";
import ComboboxCustom from "../OrderFormsComponents/ComboboxCustom";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { TOrderSchema, orderFormSchema, orderSchema } from "@/shared/types/schemas/order";
import CartSubmitField from "../OrderFormsComponents/CartSubmitField";
import CartSubmitDetails from "../OrderFormsComponents/CartDetails/CartSubmitDetails";
import AddressSection from "../OrderFormsComponents/AddressSection";
import DeliveryDate from "../OrderFormsComponents/DeliveryDate";
import TextAreaField from "../OrderFormsComponents/TextAreaField";
import ClientInfoSection from "../OrderFormsComponents/ClientInfoSection";
import MyModal from "../Dialog/Dialog";
import CardDataModal from "../Dialog/Variants/CardDataModal";
import { useQuery } from "@tanstack/react-query";
import { getCards } from "@/shared/services/card";
import { storages } from "@/shared/consts/conts";
import { addOrder } from "@/shared/services/order";

export default function OrderForm() {
  const [isCourier, setIsCourier] = useState(true);
  const [city, setCity] = useState("Москва");
  const [isOpened, setIsOpened] = useState(false);

  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");

  const [blockModal, setBlockModal] = useState(false);

  const { data } = useQuery({
    queryKey: ["cards"],
    queryFn: getCards,
  });

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

  return (
    <>
      <section>
        <form
          onSubmit={handleSubmit((data) => {
            if (!data.isCourier && data.city) {
              data.address = storages[data.city];
            }
            data.address = "г. " + data.city + ", " + data.address;
            addOrder(orderFormSchema.parse(data));
          })}
          className="flex justify-center gap-5"
        >
          <div className="flex w-full max-w-[598px] flex-col gap-6">
            <OrderFieldSet header={"Способ оплаты"}>
              <PaymentType
                control={control}
                name={"payment"}
                openFn={setIsOpened}
                cards={data}
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
      <MyModal isTrue={isOpened} closeFn={setIsOpened} isBlocked={blockModal}>
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
          closeFn={setIsOpened}
          isOpened={isOpened}
          blockModalFunc={setBlockModal}
        />
      </MyModal>
    </>
  );
}
