import Image from "next/image";
import productImg from "../../images/Product.jpg";
import { inter, roboto } from "@/appxxx/fonts";
import { TypeRequest } from "@/pages";
import Link from "next/link";

export default function MiniBannerSection({ items, photos }: TypeRequest) {
  if (!items || !items.request || !photos || !photos.request) {
    return <div>Данные не загружены</div>;
  }

  return (
    <div className="mt-5 flex flex-col gap-4 lg:flex-row">
      <div className="min-w-44 flex-grow rounded-lg bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] px-6 py-4 text-white">
        <h2 className={`${roboto.className} text-l font-bold md:text-2xl`}>
          Заголовок баннера
        </h2>
        <h3 className={`${inter.className} text-sm md:text-base`}>
          Подзаголовок
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:flex">
        <Link
          href="/fendi"
          className="flex flex-col gap-2 rounded-2xl bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] p-4 text-white"
        >
          <p className={`${roboto.className} text-xl font-bold md:text-2xl`}>
            Fendi
          </p>
          <Image
            src={productImg}
            className="h-[80%] w-full rounded-md bg-white object-cover"
            alt="продукт"
            width={128}
            height={128}
          />
        </Link>
        <Link
          href="/fendi"
          className="flex flex-col gap-2 rounded-2xl bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] p-4 text-white"
        >
          <p className={`${roboto.className} text-xl font-bold md:text-2xl`}>
            MaxMara
          </p>
          <Image
            src={productImg}
            className="h-[80%] w-full rounded-md bg-white object-cover"
            alt="продукт"
            width={128}
            height={128}
          />
        </Link>
        <Link
          href="/fendi"
          className="flex flex-col gap-2 rounded-2xl bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] p-4 text-white"
        >
          <p className={`${roboto.className} text-xl font-bold md:text-2xl`}>
            Dior
          </p>
          <Image
            src={productImg}
            className="h-[80%] w-full rounded-md bg-white object-cover"
            alt="продукт"
            width={128}
            height={128}
          />
        </Link>
        <Link
          href="/fendi"
          className="flex flex-col gap-2 rounded-2xl bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] p-4 text-white"
        >
          <p className={`${roboto.className} text-xl font-bold md:text-2xl`}>
            Boss
          </p>
          <Image
            src={productImg}
            className="h-[80%] w-full rounded-md bg-white object-cover"
            alt="продукт"
            width={128}
            height={128}
          />
        </Link>
      </div>
    </div>
  );
}
