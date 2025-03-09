import React, { useState } from "react";
import Radio from "./Radio";

export default function FilterRadio() {
  const [selectedValue, setSelectedValue] = useState("");
  const handleRadioChange = (value: string) => {
    setSelectedValue(value); 
  };
  return (
    <div className="flex flex-wrap gap-4">
      <Radio
        text="В наличии"
        value="avalible"
        name_group="avalible"
        selectedValue={selectedValue}
        onChange={handleRadioChange}
      />
      <Radio
        text="На заказ"
        value="for-order"
        name_group="avalible"
        selectedValue={selectedValue}
        onChange={handleRadioChange}
      />{" "}
    </div>
  );
}
