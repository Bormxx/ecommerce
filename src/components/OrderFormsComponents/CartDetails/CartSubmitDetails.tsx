import { cn } from "@/shared/utils/frontend/cn";
import DetailsParagraph from "./DetailsParagraph";
import { inter, roboto } from "@/styles/fonts";
import { modifyPrice } from "@/shared/utils/frontend/dataModifiers";

type CartSubmitDetailsProps = {
  cost: string
}

export default function CartSubmitDetails({cost}: CartSubmitDetailsProps) {
  return (
    <div className="flex-col sm:gap-4 gap-2 flex">
      <div className="flex justify-between">
        <DetailsParagraph>Сумма заказа</DetailsParagraph>
        <p className={cn(
          roboto.className,
          "font-bold text-base sm:text-xl"
        )}>{`${modifyPrice((cost).toString())} ₽`}</p>
      </div>
      <div className="flex justify-between">
        <DetailsParagraph>Стоимость доставки</DetailsParagraph>
        <p className={cn(
          roboto.className,
          "font-bold text-base sm:text-xl text-emerald-500"
        )}>бесплатно</p>
      </div>
      <div className="border-b-[1px]" />
      <div className="flex justify-between">
        <span className={cn(
          inter.className,
          "font-normal text-base mt-[6px]"
        )}>Итого</span>
        <p className={cn(
          roboto.className,
          "font-bold text-xl sm:text-2xl text-emerald-500"
        )}>{`${modifyPrice((cost).toString())} ₽`}</p>
      </div>
    </div>
  );
}