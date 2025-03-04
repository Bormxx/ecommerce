import { inter } from "@/appxxx/fonts";
import Link from "next/link";

type FormFooterProps = {
  headerText: string;
  footerText: string;
  link: string;
};

export default function FormFooter(props: FormFooterProps) {
  return (
    <div className="gap-[2px]">
      <p className={`${inter.className} text-sm font-normal text-gray-500`}>
        {props.headerText}
      </p>
      <Link
        href={props.link}
        className={`${inter.className} text-sm font-bold text-blue-600 visited:text-purple-600 hover:text-blue-800 visited:hover:text-purple-800`}
      >
        {props.footerText}
      </Link>
    </div>
  );
}
