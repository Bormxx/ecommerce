import { roboto } from "@/styles/fonts";
type ReplaceQuantityProps = {
  id: number;
  minusQuantity: (id: number) => void;
  plusQuantity: (id: number) => void;
  quantity: number;
};

export default function ReplaceQuantity({
  id,
  minusQuantity,
  plusQuantity,
  quantity,
}: ReplaceQuantityProps) {
  function clickMinusQuantity() {
    minusQuantity(id);
  }
  function clickPlusQuantity() {
    plusQuantity(id);
  }
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="flex size-6 items-center justify-center rounded-[4px] bg-gray-200 text-xs"
        onClick={clickMinusQuantity}
      >
        -
      </button>
      <p className={`${roboto.className} text-base font-bold`}>{quantity}</p>
      <button
        type="button"
        onClick={clickPlusQuantity}
        className="flex size-6 items-center justify-center rounded-[4px] bg-gray-200 text-xs"
      >
        +
      </button>
    </div>
  );
}
