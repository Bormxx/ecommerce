import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { ECSearchForm } from "@/components/forms/search-form";
import ECButton from "@/components/ui/default-button";
import { ECHeaderMenu } from "@/components/header/ui/ECHeaderMenu";

export function ECHeader() {
  const router = useRouter();

  const hiddenInCart = router.pathname === "/cart" ? "hidden" : "";
  return (
    <>
      <header className="hidden justify-between gap-[30px] md:flex">
        <Link href="/">
          <Image src={"/images/logo.svg"} width={131} height={40} alt="Quant" />
        </Link>

        <div className="flex flex-grow justify-between gap-[15px]">
          <ECButton type="button" variant="primary">
            {" "}
            Каталог{" "}
          </ECButton>
          <ECSearchForm />
        </div>
        <div>
          <ECHeaderMenu />
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
          <Image
            src={"/images/Icons-search-16x16.svg"}
            width={16}
            height={16}
            alt="Search"
          />
        </div>
      </div>
      {/* Нижняя часть при маленьком экране */}
      <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-center bg-white p-4 md:hidden">
        <ECHeaderMenu />
      </div>
    </>
  );
}
