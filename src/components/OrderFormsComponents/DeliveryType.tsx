import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import RadioDeliveryField from "./Radio/RadioDeliveryField";

export default function DeliveryType() {
  const [selected, setSelected] = useState(true);
  
  return (
    <RadioGroup
      value={selected}
      onChange={setSelected}
      aria-label="Способ доставки"
      className="flex gap-2"
    >
      <RadioDeliveryField isCourier={true} />
      <RadioDeliveryField isCourier={false} />
    </RadioGroup>
  );
}
