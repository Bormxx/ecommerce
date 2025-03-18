import FormButton from "@/components/AuthFormsComponents/FormButton";
import FormHeader from "@/components/AuthFormsComponents/FormHeader";
import AuthInput from "@/components/AuthFormsComponents/InputAuth";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { addCard } from "@/shared/services/card";
import { cardSchema, TCardSchema } from "@/shared/types/schemas/card";
import { modifyStringToNumbers } from "@/shared/utils/frontend/dataModifiers";
import { inter } from "@/styles/fonts";
import { Button, Field, Fieldset, Label } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMask } from "@react-input/mask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import AuthModal from "./AuthModal";

type CardDataModalProps = {
  states: {
    number: string;
    month: string;
    year: string;
    cvv: string;
    setNumber: Dispatch<SetStateAction<string>>;
    setMonth: Dispatch<SetStateAction<string>>;
    setYear: Dispatch<SetStateAction<string>>;
    setCvv: Dispatch<SetStateAction<string>>;
  };
  closeFn: Dispatch<SetStateAction<boolean>>;
  isOpened: boolean;
  blockModalFunc: Dispatch<SetStateAction<boolean>>;
};

export default function CardDataModal({ states, closeFn, isOpened, blockModalFunc }: CardDataModalProps) {
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState("");

  const addCardData = useMutation({
    mutationFn: (cardData: TCardSchema) => addCard(cardData),
    onSuccess: () => {
      blockModalFunc(false);
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      setNumber("");
      setMonth("");
      setYear("");
      setCvv("");
      closeFn(!isOpened);
    },
    onError: (error) => {
      blockModalFunc(false);
      setErrorMessage(error.message);
    },
    onMutate: () => blockModalFunc(true),
  });

  const cardNumberMask = useMask({
    mask: "____ ____ ____ ____",
    replacement: {
      _: /\d/,
    },
  });
  

  const {
    handleSubmit,
    control,
    trigger,
    formState: { isValid },
  } = useForm<TCardSchema>({
    resolver: zodResolver(cardSchema),
    mode: "all",
  });
  const { number, month, year, cvv, setNumber, setMonth, setYear, setCvv } =
    states;

  if (addCardData.isPending) {
    return <LoadingIcon />;
  }

  if (addCardData.isSuccess) {
    return;
  }

  if (addCardData.isError) {
    return <AuthModal isTrue={isOpened} errorMessage={errorMessage} closeFn={closeFn} />
  }

  return (
    <div className="max-w-md p-6 flex-col flex gap-4 rounded-xl bg-white drop-shadow-xl">
      <div className="flex justify-between">
        <FormHeader>Введите данные карты:</FormHeader>
        <Button type="button" onClick={() => closeFn(!isOpened)}>
          <XMarkIcon className="size-8 rounded-sm border-gray-500 text-gray-500 hover:border hover:text-gray-800" />
        </Button>
      </div>
      <form
        onSubmit={handleSubmit((data) => addCardData.mutate(data))}
        className="flex max-w-sm flex-col gap-4"
      >
        <Fieldset className="grid grid-cols-3 gap-2">
          <Field className={"col-span-3 flex flex-col"}>
            <Label className={`${inter.className} text-base font-normal`}>
              Номер карты
            </Label>
            <AuthInput
              name={"cardNumber"}
              control={control}
              defaultValue={number}
              value={number}
              mask={cardNumberMask}
              placeholder="0000 0000 0000 0000"
              type="tel"
              maxLength={19}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </Field>
          <Field className={"flex flex-col"}>
            <Label className={`${inter.className} text-base font-normal`}>
              Месяц
            </Label>
            <AuthInput
              name={"month"}
              control={control}
              placeholder="ММ"
              type="tel"
              maxLength={2}
              defaultValue={month}
              value={month}
              onChange={(input) => {
                setMonth(modifyStringToNumbers(input));
                trigger("year");
              }}
              errorFont="xs"
            />
          </Field>
          <Field className={"flex flex-col"}>
            <Label className={`${inter.className} text-base font-normal`}>
              Год
            </Label>
            <AuthInput
              name={"year"}
              control={control}
              placeholder="ГГ"
              type="tel"
              maxLength={2}
              defaultValue={year}
              value={year}
              onChange={(input) => {
                setYear(modifyStringToNumbers(input));
                trigger("month");
              }}
              errorFont="xs"
            />
          </Field>
          <Field className={"flex flex-col"}>
            <Label className={`${inter.className} text-base font-normal`}>
              Код
            </Label>
            <AuthInput
              name={"cvv"}
              control={control}
              placeholder="***"
              type="password"
              maxLength={3}
              defaultValue={cvv}
              value={cvv}
              onChange={(input) => setCvv(modifyStringToNumbers(input))}
              errorFont="xs"
            />
          </Field>
        </Fieldset>
        <FormButton text="Добавить карту" isValid={isValid} />
      </form>
    </div>
  );
}
