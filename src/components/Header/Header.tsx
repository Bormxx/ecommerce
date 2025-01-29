import Image from "next/image";
import logo from "../../images/logo.svg";
import iconsearch from "../../images/icons-search.svg";
import iconSearch16 from "../../images/Icons-search-16x16.svg";

import LoginMenu from "../LoginMenu/LoginMenu";
import { inter } from "@/app/fonts";

export default function Header() {
  return (
    <>
      <header className="hidden justify-between gap-[30px] lg:flex">
        <Image src={logo} width={131} height={40} alt="Quant" />
        <div className="flex flex-grow justify-between gap-[15px]">
          <button
            className={`${inter.className} rounded-[8px] bg-[#1E40AF] px-4 py-2 text-base font-bold text-white`}
          >
            Каталог
          </button>
          <form action="" className="flex flex-grow">
            <input
              type="text"
              className="flex-grow rounded-bl-[8px] rounded-tl-[8px] border-2 border-[#1E40AF] bg-white p-2"
            />
            <button
              type="submit"
              className="flex h-full w-[65px] items-center justify-center rounded-br-[8px] rounded-tr-[8px] border-2 border-[#1E40AF] bg-[#1E40AF]"
            >
              <Image src={iconsearch} width={24} height={24} alt="Search" />
            </button>
          </form>
        </div>
        <div>
          <LoginMenu />
        </div>
      </header>

      <div className="relative flex h-[36px] w-full lg:hidden">
        <input
          type="text"
          placeholder="Искать"
          className="flex-grow rounded-[8px] border-2 border-[#1E40AF] bg-white p-2.5 pl-[36px]"
        />
        <div className="absolute left-0 top-0 p-2.5">
          <Image src={iconSearch16} width={16} height={16} alt="Search" />
        </div>
      </div>

      <div className="absolute bottom-0 flex w-full items-center justify-center lg:hidden">
        <LoginMenu />
      </div>
    </>
  );
}
