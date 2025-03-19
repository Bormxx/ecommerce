import { inter } from "@/styles/fonts";
import { Label, Field } from "@headlessui/react";
import { ReactNode } from "react";

type FormFieldProps = {
  text: string;
  children?: ReactNode;
};

export default function FormField(props: FormFieldProps) {
  return (
    <Field className="flex flex-col gap-[2px]">
      <Label className={`${inter.className} text-sm font-normal text-gray-500`}>
        {props.text}
      </Label>
      {props.children}
    </Field>
  );
}
