import { RadioGroup } from "@headlessui/react";
import CardAddButton from "./CardAddButton";
import RadioPaymentField from "./Radio/RadioPaymentField";
import { Controller, UseControllerProps } from "react-hook-form";
import { TOrderSchema } from "@/shared/types/schemas/order";
import { Dispatch, SetStateAction } from "react";
import { TUserCardSchema } from "@/shared/types/schemas/card";

type PaymentTypeProps = {
  openFn: Dispatch<SetStateAction<boolean>>;
  cards: TUserCardSchema[] | undefined;
}

export default function PaymentType({ control, name, openFn, cards }: UseControllerProps<TOrderSchema> & PaymentTypeProps) {
  const plans = cards ?? [];
  
  return (
    <Controller
      control={control}
      defaultValue={ plans?.length ? plans[0].id : null}
      name={name}
      render={({ field: {value, onChange, ...props} }) => {
        return (
          <RadioGroup
            {...props}
            value={value}
            onChange={onChange}
            aria-label="Способ оплаты"
            className="flex gap-2 flex-wrap"
          >
            {plans.map((plan) => (
              <RadioPaymentField key={plan.id} id={plan.id} cardNumber={plan.cardNumber} />
            ))}
            <CardAddButton openFn={openFn} />
            <RadioPaymentField />
          </RadioGroup>
        )
      }}
    />
  );
}
