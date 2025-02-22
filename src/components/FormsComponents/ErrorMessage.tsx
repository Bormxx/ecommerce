import { inter } from "@/app/fonts";

type ErrorMessageProp = {
  text: string
}

export default function ErrorMessage( prop: ErrorMessageProp) {
  return <p className={`${inter.className} font-normal text-sm text-red-500`}>{prop.text}</p>
}