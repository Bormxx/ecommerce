import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";

type DeliveryDateProps = {
  deliveryDate: string
}

export default function DeliveryDate({deliveryDate}: DeliveryDateProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-2">
      <p className={cn(inter.className, "text-xs sm:text-sm font-normal text-gray-400")}>
        Доставят
      </p>
      <p className={cn(inter.className, "text-sm font-normal")}>
        {deliveryDate}
      </p>
    </div>
  );
}
