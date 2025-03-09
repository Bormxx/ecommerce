import Image from "next/image";
import logo from "../../images/logo.svg";
import iconsearch from "../../images/icons-search.svg";
import iconSearch16 from "../../images/Icons-search-16x16.svg";

import LoginMenu from "../LoginMenu/LoginMenu";
import { inter } from "@/styles/fonts";
import { useRouter } from "next/router";
import Link from "next/link";

export default function HeaderComponent() {
  const router = useRouter();

  const hiddenInCart = router.pathname === "/cart" ? "hidden" : "";
  return (
    <>
      <header className="hidden justify-between gap-[30px] md:flex">
        <Link href="/">
          <Image src={logo} width={131} height={40} alt="Quant" />
        </Link>

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

      {/* Верхняя часть при маленьком экране */}
      <div
        className={`relative ${hiddenInCart} flex h-[36px] w-full md:hidden`}
      >
        <input
          type="text"
          placeholder="Искать"
          className="flex-grow rounded-[8px] border-2 border-[#1E40AF] bg-white p-2.5 pl-[36px]"
        />
        <div className="absolute left-0 top-0 p-2.5">
          <Image src={iconSearch16} width={16} height={16} alt="Search" />
        </div>
      </div>
      {/* Нижняя часть при маленьком экране */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center bg-white p-4 md:hidden">
        <LoginMenu />
      </div>
    </>
  );
}
