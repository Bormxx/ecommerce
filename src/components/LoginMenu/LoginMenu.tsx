import Image from "next/image";
import iconLogin from "../../images/Icon-login.svg";
import { inter } from "@/app/fonts";

export default function LoginMenu() {
  return (
    <div className="flex gap-[15px] w-full">
      <div className="flex flex-col items-center">
        <Image src={iconLogin} width={24} height={24} alt="login" />
        <span className={`${inter.className} text-[12px] font-normal leading-[16px] text-[#1F2937]`}>
          Войти
        </span>
      </div>
      <button className={`${inter.className} flex-grow rounded-[8px] bg-[#1E40AF] px-4 py-2 text-base font-bold text-white`}>
        Зарегистрироваться
      </button>
    </div>
  );
}
