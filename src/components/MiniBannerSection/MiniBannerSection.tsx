import Image from "next/image";
import { roboto } from "@/styles/fonts";
import { TypeRequest } from "@/pages";
import Link from "next/link";
import MiniBanner from "../Banners/MiniBanner";

export default function MiniBannerSection({ items, photos }: TypeRequest) {
  if (!items || !items.request || !photos || !photos.request) {
    return <div>Данные не загружены</div>;
  }
  const categories: string[] = ["Dior", "Boss", "Chanel", "Ray-Ban"];
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <MiniBanner />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:flex">
        {categories.map((category) => {
          return (
            <Link
              href={`/category/${category}`}
              key={category}
              className="flex flex-col gap-2 rounded-2xl bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] p-4 text-white"
            >
              <p
                className={`${roboto.className} text-xl font-bold md:text-2xl`}
              >
                {category}
              </p>
              <Image
                src={"/images/Product.jpg"}
                className="h-[80%] w-full rounded-md bg-white object-cover"
                alt="продукт"
                width={128}
                height={128}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
