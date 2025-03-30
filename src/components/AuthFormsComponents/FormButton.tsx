import { TOrderSchema } from "@/shared/types/schemas/order";
import { cn } from "@/shared/utils/frontend/cn";
import { inter } from "@/styles/fonts";
import { Button } from "@headlessui/react";
import { UseFormTrigger } from "react-hook-form";

type FormButtonProp = {
  text: string;
  isValid: boolean;
  isThin?: boolean;
  trigger?: UseFormTrigger<TOrderSchema>;
};

export default function FormButton(props: FormButtonProp) {
  return (
    <Button
      onMouseOver={() => props.trigger ? props.trigger() : {} }
      type="submit"
      className={cn(
        inter.className,
        "rounded-md bg-blue-800 px-4 text-center text-sm sm:text-base font-bold text-white hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-no-drop",
        props.isThin ? "py-2" : "py-3"
      )}
      disabled={props.isValid ? false : true}
    >
      {props.text}
    </Button>
  );
}
