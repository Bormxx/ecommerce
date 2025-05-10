import { updateQuantityProduct } from "@/shared/api/basket";
import { roboto } from "@/styles/fonts";
import { useEffect, useState } from "react";

type ReplaceQuantityProps = {
  id: number;
  minusQuantity?: (id: number) => void;
  plusQuantity?: (id: number) => void;
  quantity: number;
  onQuantityChange?: (quantity: number) => void; // 🆕 добавляем
};

export default function ReplaceQuantity({
  id,
  minusQuantity,
  plusQuantity,
  quantity,
  onQuantityChange, // 🆕 получаем
}: ReplaceQuantityProps) {
  const [quantityNumber, setQuantityNumber] = useState(quantity);

  useEffect(() => {
    setQuantityNumber(quantity);
  }, [quantity]);

  useEffect(() => {
    if (onQuantityChange) {
      onQuantityChange(quantityNumber); // уведомляем родителя
    }
  }, [quantityNumber, onQuantityChange]);

  async function clickMinusQuantity() {
    if (quantityNumber <= 0) return;
    try {
      const result = await updateQuantityProduct(id, {
        quantity: quantityNumber - 1,
      });
      console.log("Обновление прошло успешно:", result.message);
      setQuantityNumber(quantityNumber - 1);
      if (minusQuantity) minusQuantity(id);
    } catch (error) {
      console.error("Ошибка при обновлении количества товара:", error);
    }
  }

  async function clickPlusQuantity() {
    try {
      const result = await updateQuantityProduct(id, {
        quantity: quantityNumber + 1,
      });
      console.log("Обновление прошло успешно:", result.message);
      setQuantityNumber(quantityNumber + 1);
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
      <p className={`${roboto.className} text-base font-bold`}>
        {quantityNumber}
      </p>
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
