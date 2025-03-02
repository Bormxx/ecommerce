import { inter } from "@/utils/fonts";
import { Button } from "@headlessui/react";

type FormButtonProp = {
  text: string;
  isValid: boolean;
};

export default function FormButton(prop: FormButtonProp) {
  return (
    <Button
      type="submit"
<<<<<<< HEAD
      className={`${inter.className} rounded-md bg-blue-800 px-4 py-3 text-center text-base font-bold text-white hover:bg-blue-600 disabled:bg-slate-400`}
=======
      className={`${inter.className} rounded-md bg-blue-800 px-4 py-3 text-center text-base font-bold text-white hover:bg-blue-600 disabled:bg-slate-400 disabled:cursor-no-drop`}
>>>>>>> fe131b9e578ae6bab5941a7d4478d456845c4054
      disabled={prop.isValid ? false : true}
    >
      {prop.text}
    </Button>
  );
}
