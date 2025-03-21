import DeliveryType from "../OrderFormsComponents/DeliveryType";
import OrderFieldSet from "../OrderFormsComponents/OrderFieldset";
import PaymentType from "../OrderFormsComponents/PaymentType";
import ComboboxCustom from "../OrderFormsComponents/ComboboxCustom";
import { DateTime } from "luxon";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  TOrderFormSchema,
  TOrderSchema,
  orderSchema,
} from "@/shared/types/schemas/order";
import CartSubmitField from "../OrderFormsComponents/CartSubmitField";
import CartSubmitDetails from "../OrderFormsComponents/CartDetails/CartSubmitDetails";
import AddressSection from "../OrderFormsComponents/AddressSection";
import DeliveryDate from "../OrderFormsComponents/DeliveryDate";
import TextAreaField from "../OrderFormsComponents/TextAreaField";
import ClientInfoSection from "../OrderFormsComponents/ClientInfoSection";
import MyModal from "../Dialog/Dialog";
import CardDataModal from "../Dialog/Variants/CardDataModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCards } from "@/shared/services/card";
import { storages } from "@/shared/consts/consts";
import { addOrder } from "@/shared/services/order";
import { modifyOrderData } from "@/shared/utils/frontend/dataModifiers";
import { useRouter } from "next/router";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import AuthModal from "../Dialog/Variants/AuthModal";
import { getBasketItems } from "@/shared/services/basket";
import { cn } from "@/shared/utils/frontend/cn";

export default function OrderForm() {
  const [isCourier, setIsCourier] = useState(true);
  const [city, setCity] = useState("Москва");
  const [isOpened, setIsOpened] = useState(false);

  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const [blockModal, setBlockModal] = useState(false);
  const [blockButton, setBlockButton] = useState(true);

  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["cards"],
    queryFn: getCards,
  });

  const orderedItems = useQuery({
    queryKey: ["orderedItems"],
    queryFn: getBasketItems,
  });

  const mutation = useMutation({
    mutationFn: (form: TOrderFormSchema) => addOrder(form),
    onSuccess: () => {
      router.replace("/");
    },
    onError: (err) => {
      setBlockModal(false);
      setErrorMessage(err.message);
      setBlockButton(true);
    },
    onMutate: () => {
      setBlockModal(true);
      setIsOpened(true);
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<TOrderSchema>({
    resolver: zodResolver(orderSchema),
    mode: "all",
  });

  const deliveryDate = DateTime.now()
    .reconfigure({ locale: "ru" })
    .plus({ day: 2 })
    .toLocaleString(DateTime.DATE_FULL);

    if (orderedItems.isError || (orderedItems.isSuccess && orderedItems.data?.totalQuantity < 1)) {
      router.replace('/');
      return null;
    }

    if (orderedItems.isLoading) {
      return (
        <div className="grow place-content-center place-items-center bg-slate-50">
          <LoadingIcon />
        </div>
      );
    }


  return (
    <>
      <section>
        <form
          onSubmit={handleSubmit((data) => {
            setBlockButton(false);
            mutation.mutate(modifyOrderData(data));
          })}
          className="flex justify-center sm:gap-5 flex-col lg:flex-row items-center lg:items-baseline sm:pt-5 md:pt-0"
        >
          <div className="flex w-full max-w-[598px] flex-col gap-6 p-5 sm:p-0">
            <OrderFieldSet header={"Способ оплаты"}>
              <PaymentType
                control={control}
                name={"payment"}
                openFn={setIsOpened}
                cards={data}
              />
            </OrderFieldSet>

            <OrderFieldSet header={"Способ доставки"} >
              <div className={cn(
                "flex flex-col gap-4 sm:gap-6 rounded-xl bg-white p-4 shadow-custom sm:rounded-none sm:bg-transparent sm:p-0 sm:shadow-none"
              )}>
                <DeliveryType
                  control={control}
                  name={"isCourier"}
                  openFn={setIsCourier}
                />
                <div className="flex flex-col-reverse sm:flex-col gap-4 sm:gap-6">
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
                </div>
              </div>
            </OrderFieldSet>

            <OrderFieldSet header={"Получатель"}>
              <div className="sm:gap-4 flex flex-col rounded-xl bg-white gap-4 p-4 shadow-custom sm:rounded-none sm:bg-transparent sm:p-0 sm:shadow-none">
                <ClientInfoSection control={control} name={"phone"} />
                <TextAreaField name="comment" control={control} />
              </div>
            </OrderFieldSet>
          </div>
          <CartSubmitField
            title={"Ваш заказ"}
            items={orderedItems.data?.totalQuantity ?? "0"}
            isDisabled={isValid && blockButton}
          >
            <CartSubmitDetails cost={orderedItems.data?.finalPrice ?? "0"} />
          </CartSubmitField>
        </form>
      </section>
      <MyModal isTrue={isOpened} closeFn={setIsOpened} isBlocked={blockModal}>
        {mutation.isPending || mutation.isSuccess ? (
          <LoadingIcon />
        ) : mutation.isError ? (
          <AuthModal
            isTrue={isOpened}
            errorMessage={errorMessage}
            closeFn={setIsOpened}
          />
        ) : (
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
        )}
      </MyModal>
    </>
  );
}
