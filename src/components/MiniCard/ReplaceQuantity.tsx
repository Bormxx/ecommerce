import { updateQuantityProduct } from "@/shared/api/basket";
import { roboto } from "@/styles/fonts";

type ReplaceQuantityProps = {
  id: number;
  minusQuantity?: (id: number) => void;
  plusQuantity?: (id: number) => void;
  quantity: number;
  onQuantityChange?: (quantity: number) => void;
};

export default function ReplaceQuantity({
  id,
  minusQuantity,
  plusQuantity,
  quantity,
  onQuantityChange,
}: ReplaceQuantityProps) {
  async function clickMinusQuantity() {
    if (quantity <= 0) return;
    try {
      const result = await updateQuantityProduct(id, {
        quantity: quantity - 1,
      });
      console.log("Обновление прошло успешно:", result.message);
      if (onQuantityChange) onQuantityChange(quantity - 1);
      if (minusQuantity) minusQuantity(id);
    } catch (error) {
      console.error("Ошибка при обновлении количества товара:", error);
    }
  }

  async function clickPlusQuantity() {
    try {
      const result = await updateQuantityProduct(id, {
        quantity: quantity + 1,
      });
      console.log("Обновление прошло успешно:", result.message);
      if (onQuantityChange) onQuantityChange(quantity + 1);
      if (plusQuantity) plusQuantity(id);
    } catch (error) {
      console.error("Ошибка при обновлении количества товара:", error);
    }
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
