import Image from "next/image";
import LoginMenu from "../LoginMenu/LoginMenu";
import { inter } from "@/styles/fonts";
import { useRouter } from "next/router";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function HeaderComponent() {
  const { pathname } = useRouter();
  const hiddenRoutes = ["/cart", "/profile"];

  const hiddenInCart = hiddenRoutes.includes(pathname) ? "hidden" : "";
  return (
    <div className={pathname === "/auth" || pathname === "/registration" ? "hidden md:block" : ""}>
      <header className="shadow-custom hidden w-full bg-white p-3 md:flex">
        <div className="m-auto flex max-w-[1180px] flex-grow justify-between gap-2 lg:gap-7">
          <Link href="/">
            <Image
              src={"/images/logo.svg"}
              width={131}
              height={40}
              alt="Quant"
            />
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
                <MagnifyingGlassIcon
                  width={24}
                  height={24}
                  className="text-white"
                />
              </button>
            </form>
          </div>
          <div>
            <LoginMenu />
          </div>
        </div>
      </header>

      {/* Верхняя часть при маленьком экране */}
      <div className={`relative ${hiddenInCart} m-5 flex h-[36px] md:hidden`}>
        <input
          type="text"
          placeholder="Искать"
          className="flex-grow rounded-[8px] border-2 border-[#1E40AF] bg-white p-2.5 pl-[36px]"
        />
        <div className="absolute left-0 top-0 p-2.5">
          <MagnifyingGlassIcon width={16} height={16} />
        </div>
      </div>
      {/* Нижняя часть при маленьком экране */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center bg-white p-4 md:hidden">
        <LoginMenu />
      </div>
    </div>
  );
}
