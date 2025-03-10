import { inter } from "@/styles/fonts";
import { Button } from "@headlessui/react";
import { FieldValues, UseFormTrigger } from "react-hook-form";

type FormButtonProp<T extends FieldValues> = {
  text: string;
  isValid: boolean;
  trigger: UseFormTrigger<T>;
};

export default function FormButton<T extends FieldValues>(props: FormButtonProp<T>) {
  return (
    <Button
      onMouseOver={() => props.trigger()}
      type="submit"
      className={`${inter.className} rounded-md bg-blue-800 px-4 py-3 text-center text-base font-bold text-white hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-no-drop`}
      disabled={props.isValid ? false : true}
    >
      {props.text}
    </Button>
  );
}
