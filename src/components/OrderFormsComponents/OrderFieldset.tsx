import { roboto } from "@/app/fonts";
import { Fieldset } from "@headlessui/react";
import { ReactNode } from "react";

type OrderFieldSetProps = {
  header: string;
  children: ReactNode;
  wider?: boolean;
};

export default function OrderFieldSet({ children, header, wider }: OrderFieldSetProps) {
  return (
    <Fieldset className={`${ wider ? "gap-6" : "gap-4"} flex flex-col rounded-xl px-4 py-5 shadow-lg`}>
      <h1 className={`${roboto.className} text-xl font-bold`}>{header}</h1>
      {children}
    </Fieldset>
  );
}
