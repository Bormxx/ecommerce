import { cn } from "@/shared/utils/frontend/cn";
import { roboto } from "@/styles/fonts";
import { Fieldset } from "@headlessui/react";
import { ReactNode } from "react";

type OrderFieldSetProps = {
  header: string;
  children: ReactNode;
};

export default function OrderFieldSet({ children, header }: OrderFieldSetProps) {
  return (
    <Fieldset className={cn("sm:gap-4 flex flex-col rounded-xl sm:px-4 sm:py-5 sm:shadow-lg sm:bg-white gap-1"
      )}>
      <h1 className={`${roboto.className} text-base sm:text-xl font-bold`}>{header}</h1>
      {children}
    </Fieldset>
  );
}
