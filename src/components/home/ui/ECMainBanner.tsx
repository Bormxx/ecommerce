import Image from "next/image";
import { inter, roboto } from "@/styles/fonts";

export function ECMainBanner() {
  return (
    <div className="mt-[12px] flex min-h-[120px] rounded-[8px] bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] px-5 py-2 sm:mt-[30px] sm:justify-evenly sm:p-[16px]">
      <div className="text-[white]">
        <h1 className={`${roboto.className} text-xl font-bold md:text-3xl`}>
          Заголовок баннера
        </h1>
        <h2 className={`${inter.className} font-notmal text-sm md:text-base`}>
          Подзаголовок
        </h2>
      </div>
      <Image
        src={"/images/Product.jpg"}
        width={280}
        height={168}
        alt="product"
        className="hidden rounded-[8px] md:block"
      />
    </div>
  );
}
