import { RadioGroup } from "@headlessui/react";
import CardAddButton from "./CardAddButton";
import RadioPaymentField from "./Radio/RadioPaymentField";
import { Controller, UseControllerProps } from "react-hook-form";
import { TOrderSchema } from "../../../types/schemas/order";



export default function PaymentType({ control, name }: UseControllerProps<TOrderSchema>) {  
  const plans = [{id: 1, cardNumber: "44 44"}, {id: 2, cardNumber: "44 44"}, {id: 3, cardNumber: "44 44"}];
  
  return (
    <Controller
      control={control}
      defaultValue={ plans.length ? plans[0].id.toString() : 'cash'}
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
              <RadioPaymentField key={plan.id} id={plan.id.toString()} cardNumber={plan.cardNumber} />
            ))}
            <CardAddButton />
            <RadioPaymentField />
          </RadioGroup>
        )
      }}
    />
  );
}
