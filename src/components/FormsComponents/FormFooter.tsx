import { inter } from "@/app/fonts";
import Link from "next/link";

type FormFooterProps = {
  text: string,
  link: string
}

export default function FormFooter( props: FormFooterProps ) {
  return (
    <div className="gap-[2px]">
      <p className={`${inter.className} font-normal text-sm text-gray-500`}>{props.text}</p>
      <Link
        href={props.link}
        className={`${inter.className} font-bold text-sm text-blue-600`}
      >
      Зарегистрироваться
        </Link>
    </div>
  );
}