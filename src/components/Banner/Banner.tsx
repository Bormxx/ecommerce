import Image from "next/image";
import product from "../../images/Product.jpg";
import { inter, roboto } from "@/app/fonts";

export default function Banner() {
  return (
    <div className="min-h-[120px] px-5 mt-[12px] flex rounded-[8px] bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] py-2 sm:mt-[30px] sm:justify-evenly sm:p-[16px]">
      <div className="text-[white]">
        <h1
          className={`${roboto.className} text-[20px] font-bold sm:text-[30px]`}
        >
          Заголовок баннера
        </h1>
        <h2
          className={`${inter.className} font-notmal text-[14px] sm:text-[16px]`}
        >
          Подзаголовок
        </h2>
      </div>
      <Image
        src={product}
        width={280}
        height={168}
        alt="product"
        className="hidden rounded-[8px] md:block"
      />
    </div>
  );
}
