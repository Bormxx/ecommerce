import { inter } from "@/styles/fonts";
import { useState } from "react";

export default function FilterPrice() {
  const [valueMinPrice, setValueMinPrice] = useState("10");
  const [valueMaxPrice, setValueMaxPrice] = useState("400000");
  const formatInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    const formattedValue = Number(inputValue).toLocaleString("ru-RU");
    setValue(formattedValue);
  };
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-[2px]">
        <span className={`${inter.className} text-xs text-gray-500`}>От</span>
        <input
          type="text"
          value={valueMinPrice}
          min="10"
          onChange={(e) => formatInput(e, setValueMinPrice)}
          className={`${inter.className} w-full rounded-[4px] border-gray-400 bg-gray-100 px-3 py-2 text-sm text-gray-800`}
          placeholder="От"
        />
      </div>
      <div className="flex flex-col gap-[2px]">
        <span className={`${inter.className} text-xs text-gray-500`}>До</span>
        <input
          value={valueMaxPrice}
          max="400000"
          type="text"
          onChange={(e) => formatInput(e, setValueMaxPrice)}
          className={`${inter.className} w-full rounded-[4px] border-gray-400 bg-gray-100 px-3 py-2 text-sm text-gray-800`}
          placeholder="До"
        />
      </div>
    </div>
  );
}
