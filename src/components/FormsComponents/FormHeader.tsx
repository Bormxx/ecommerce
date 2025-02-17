import { roboto } from "@/app/fonts"

type FormHeaderProp = {
  text: string
}

export default function FormHeader( prop: FormHeaderProp ) {
  return <h2 className={`${roboto.className} text-2xl`}>{prop.text}</h2>
}
