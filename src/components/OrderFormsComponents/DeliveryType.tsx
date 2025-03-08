import { RadioGroup } from "@headlessui/react";
import RadioDeliveryField from "./Radio/RadioDeliveryField";
import { Controller, UseControllerProps } from "react-hook-form";
import { TOrderSchema } from "../../../types/schemas/order";
import { Dispatch, SetStateAction } from "react";

export default function DeliveryType({ control, name, openFn }: UseControllerProps<TOrderSchema> & { openFn: Dispatch<SetStateAction<boolean>> }) {
  
  return (
    <Controller
      control={control}
      defaultValue={true}
      name={name}
      render={({ field: {value, onChange, ...props} }) => {
      return (
        <RadioGroup
          {...props}
          value={value}
          onChange={onChange}
          aria-label="Способ доставки"
          className="flex gap-2"
        >
          <RadioDeliveryField isCourier={true} openFn={openFn} />
          <RadioDeliveryField isCourier={false} openFn={openFn} />
        </RadioGroup>
      )}
      }
    />
  );
}
