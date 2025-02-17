import { inter } from "@/app/fonts";
import { Button } from "@headlessui/react";

type FormButtonProp = {
  text: string
}

export default function FormButton( prop: FormButtonProp) {
  return (
    <Button
      type="submit"
      className={`${inter.className} font-bold py-3 px-4 rounded-md bg-blue-800 hover:bg-blue-600 text-base text-center text-white`}
    >
      {prop.text}
    </Button>
  );
}