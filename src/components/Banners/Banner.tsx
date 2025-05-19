import Image from "next/image";
import { inter, roboto } from "@/styles/fonts";
import { Product } from "@/shared/types";
import { Spinner } from "../Spinner/Spinner";

type BannerTypeProps = {
  items: Product[] | undefined;
};

export default function Banner({ items }: BannerTypeProps) {
  const imageSrc =
    items && items[0]?.photos?.[0]?.photoLink
      ? items[0].photos[0].photoLink
      : null;

  return (
    <div className="flex min-h-[120px] rounded-[8px] bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] px-5 py-2 sm:justify-evenly sm:p-[16px]">
      <div className="text-white">
        <h1 className={`${roboto.className} text-xl font-bold md:text-3xl`}>
          Скидка 40%
        </h1>
        <h2 className={`${inter.className} text-sm font-normal md:text-base`}>
          на очки Dior и Boss до конца июня
        </h2>
      </div>
      <div className="hidden h-[168px] w-[280px] items-center justify-center md:flex">
        {!items ? (
          <Spinner />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            width={280}
            height={168}
            alt="product"
            className="h-[168px] w-[280px] rounded-[8px] object-cover"
          />
        ) : (
          <div className="text-white">Нет изображения</div>
        )}
      </div>
    </div>
  );
}
