import { inter } from "@/app/fonts";
import { Label, Input, Field } from "@headlessui/react";
import { ReactNode } from "react";

type FormFieldProps = {
  name: string,
  type: "text" | "password",
  text: string,
  placeholder: string,
  children?: ReactNode
}

export default function FormField( props: FormFieldProps ) {
  return (
    <Field className="flex flex-col gap-[2px]">
      <Label className={`${inter.className} font-normal text-sm text-gray-500`}>{props.text}</Label>
      <Input 
        name={props.name}
        type={props.type}
        className="rounded py-2 px-3 text-gray-400  border-gray-400"
        placeholder={props.placeholder}
      />
      {props.children}
    </Field>
  );
}