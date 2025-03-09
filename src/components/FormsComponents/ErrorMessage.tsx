import { inter } from "@/utils/fonts";

type ErrorMessageProp = {
  text: string;
};

export default function ErrorMessage(prop: ErrorMessageProp) {
  return (
    <p className={`${inter.className} text-sm font-normal text-red-500`}>
      {prop.text}
    </p>
  );
}
