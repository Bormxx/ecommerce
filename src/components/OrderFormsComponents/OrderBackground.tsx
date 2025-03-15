import { cn } from "@/shared/utils/frontend/cn";
import { ReactNode } from "react";

type OrderBackgroundProps = {
  children: ReactNode;
};

export default function OrderBackground(props: OrderBackgroundProps) {
  return (
    <div className={cn(
      "lg:bg-[url('/images/payment_background.svg')] lg:bg-custom-right-bottom bg-no-repeat grow",
    )}>
      {props.children}
    </div>
  );
}
