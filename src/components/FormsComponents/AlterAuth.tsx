import { inter } from "@/styles/fonts";
import Image from "next/image";

type AlterAuthProp = {
  text: string;
};

export default function AlterAuth(prop: AlterAuthProp) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className={`${inter.className} text-base text-gray-500`}>
        {prop.text}
      </p>
      <Image src={"/icons/vkLogo.svg"} alt={"VK"} width={32} height={32} />
    </div>
  );
}
