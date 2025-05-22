import { inter } from "@/styles/fonts";
type FilterPriceProps = {
  minPrice: number;
  setMinPrice: (value: number) => void;
  maxPrice: number;
  setMaxPrice: (value: number) => void;
};

export default function FilterPrice({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: FilterPriceProps) {
  const formatInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: (value: number) => void,
  ) => {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, "");
    const numericValue = Number(inputValue);
    setValue(numericValue);
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-[2px]">
        <span className={`${inter.className} text-xs text-gray-500`}>От</span>
        <input
          type="text"
          value={minPrice.toLocaleString("ru-RU")}
          min="10"
          onChange={(e) => formatInput(e, setMinPrice)}
          className={`${inter.className} w-full rounded-[4px] border-gray-400 bg-gray-100 px-3 py-2 text-sm text-gray-800`}
          placeholder="От"
        />
      </div>
      <div className="flex flex-col gap-[2px]">
        <span className={`${inter.className} text-xs text-gray-500`}>До</span>
        <input
          value={maxPrice.toLocaleString("ru-RU")}
          max="400000"
          type="text"
          onChange={(e) => formatInput(e, setMaxPrice)}
          className={`${inter.className} w-full rounded-[4px] border-gray-400 bg-gray-100 px-3 py-2 text-sm text-gray-800`}
          placeholder="До"
        />
      </div>
    </div>
  );
}
