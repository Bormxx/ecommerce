import AuthInput from "@/components/AuthFormsComponents/InputAuth";
import { cardSchema, TCardSchema } from "@/shared/types/schemas/card";
import { Field, Fieldset, Label } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CardDataModal() {
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

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Fieldset className="grid grid-cols-3 gap-2">
        <Field className={"col-span-3 flex flex-col"}>
          <Label>Номер карты</Label>
          <AuthInput
            name={"cardNumber"}
            control={control}
            defaultValue={""}
            placeholder="0000 0000 0000 0000"
            type="text"
            maxLength={14}
          />
        </Field>
        <Field className={"flex flex-col"}>
          <Label>Месяц</Label>
          <AuthInput
            name={"month"}
            control={control}
            defaultValue={""}
            placeholder="00"
            type="text"
            maxLength={2}
          />
        </Field>
        <Field className={"flex flex-col"}>
          <Label>Год</Label>
          <AuthInput
            name={"year"}
            control={control}
            defaultValue={""}
            placeholder="00"
            type="text"
            maxLength={2}
          />
        </Field>
        <Field className={"flex flex-col"}>
          <Label>Код</Label>
          <AuthInput
            name={"cvv"}
            control={control}
            defaultValue={""}
            placeholder="***"
            type="password"
            maxLength={3}
          />
        </Field>
      </Fieldset>
    </form>
  );
}
