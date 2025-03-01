import { inter } from "@/app/fonts";
import { Button } from "@headlessui/react";

type FormButtonProp = {
  text: string;
  isValid: boolean;
};

export default function FormButton(prop: FormButtonProp) {
  return (
    <Button
      type="submit"
      className={`${inter.className} rounded-md bg-blue-800 px-4 py-3 text-center text-base font-bold text-white hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-no-drop`}
      disabled={prop.isValid ? false : true}
    >
      {prop.text}
    </Button>
  );
}
