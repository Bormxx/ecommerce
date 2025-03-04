import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import CardAddButton from "./CardAddButton";
import RadioPaymentField from "./Radio/RadioPaymentField";


const plans = [{id: 1, cardNumber: "44 44"}, {id: 2, cardNumber: "44 44"}, {id: 3, cardNumber: "44 44"}];

export default function PaymentType() {
  const [selected, setSelected] = useState(plans[0].id);
  
  return (
    <RadioGroup
      value={selected}
      onChange={setSelected}
      aria-label="Способ оплаты"
      className="flex gap-2 flex-wrap"
    >
      {/* {plans.map((plan) => (
        <Field key={plan} className="flex items-center gap-2">
          <Radio
            value={plan}
            className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
          >
            <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
          </Radio>
          <Label className="sr-only">Оплата картой номер {}</Label>
        </Field>
      ))}
      <Field className="flex items-center gap-2">
        <Radio
          value=""
          className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
        >
          <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
        </Radio>
        <Label className="sr-only">Добавить карту</Label>
      </Field>
      <Field className="flex items-center gap-2">
        <Radio
          value=""
          className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
        >
          <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
        </Radio>
        <Label className="sr-only">Оплата наличными при получении</Label>
      </Field> */}
      <RadioPaymentField id={plans[0].id} cardNumber={plans[0].cardNumber} />
      <RadioPaymentField id={plans[1].id} cardNumber={plans[1].cardNumber} />
      <RadioPaymentField id={plans[2].id} cardNumber={plans[2].cardNumber} />
      <CardAddButton />
      <RadioPaymentField />
    </RadioGroup>
  );
}
