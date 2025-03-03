import { inter } from "@/byaka/fonts";
import Link from "next/link";
import { ReactNode } from "react";

interface IconLinkProps {
  link: string;
  icon: ReactNode;
  text: string;
  lg_hidden: string;
}

export default function IconLink({
  link,
  icon,
  text,
  lg_hidden,
}: IconLinkProps) {
  return (
    <Link href={link}>
      <div
        className={`flex h-full flex-col items-center justify-between ${lg_hidden}`}
      >
        <div className="h-4 w-4 md:h-6 md:w-6">{icon}</div>

        <span
          className={`${inter.className} text-[12px] font-normal leading-[16px] text-[#1F2937]`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
}
