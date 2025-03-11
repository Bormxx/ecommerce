import { RadioGroup } from "@headlessui/react";
import CardAddButton from "./CardAddButton";
import RadioPaymentField from "./Radio/RadioPaymentField";
import { Controller, UseControllerProps } from "react-hook-form";
import { TOrderSchema } from "@/shared/types/schemas/order";
import { Dispatch, SetStateAction } from "react";

type PaymentTypeProps = {
  openFn: Dispatch<SetStateAction<boolean>>;
}

export default function PaymentType({ control, name, openFn }: UseControllerProps<TOrderSchema> & PaymentTypeProps) {  
  const plans = [{id: 1, cardNumber: "44 44"}, {id: 2, cardNumber: "44 44"}, {id: 3, cardNumber: "44 44"}];
  
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
