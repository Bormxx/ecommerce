import FormButton from "@/components/AuthFormsComponents/FormButton";
import AuthInput from "@/components/AuthFormsComponents/InputAuth";
import { cardSchema, TCardSchema } from "@/shared/types/schemas/card";
import {
  modifyStringToNumbers,
} from "@/shared/utils/frontend/dataModifiers";
import { inter } from "@/styles/fonts";
import { Field, Fieldset, Label } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMask } from "@react-input/mask";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

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
};

export default function CardDataModal({ states }: CardDataModalProps) {
  const cardNumberMask = useMask({
      mask: "____ ____ ____ ____",
      replacement: {
        _: /\d/,
      },
    });

  const {
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { isValid },
  } = useForm<TCardSchema>({
    resolver: zodResolver(cardSchema),
    mode: "all",
  });
  const { number, month, year, cvv, setNumber, setMonth, setYear, setCvv } =
    states;

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
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
  );
}
