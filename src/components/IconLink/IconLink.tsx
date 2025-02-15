import { inter } from "@/app/fonts";
import Link from "next/link";
import Image from "next/image";

interface IconLinkProps {
  link: string;
  icon: string;
  icon_alt: string;
  text: string;
  lg_hidden: string;
}

export default function IconLink({ link, icon, icon_alt, text, lg_hidden }: IconLinkProps) {
  return (
    <Link href={link}>
      <div
        className={`flex h-full flex-col items-center justify-between ${lg_hidden}`}
      >
        <Image src={icon} width={24} height={24} alt={icon_alt} />
        <span
          className={`${inter.className} text-[12px] font-normal leading-[16px] text-[#1F2937]`}
        >
          {text}
        </span>
      </div>
    </Link>
  );
}

