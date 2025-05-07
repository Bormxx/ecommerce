/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { roboto } from "@/styles/fonts";
import Link from "next/link";
import MiniBanner from "../Banners/MiniBanner";
import { Product } from "@/shared/types";
import { useEffect, useState } from "react";
type MiniBannerSectionProps = {
  items: Product[] | undefined;
};
export default function MiniBannerSection({ items }: MiniBannerSectionProps) {
  const [categories, setCategories] = useState<
    { title: string; img: string }[]
  >([]);
  useEffect(() => {
    if (
      items &&
      items.length >= 4 &&
      items[0]?.photos?.[0] &&
      items[1]?.photos?.[0] &&
      items[2]?.photos?.[0] &&
      items[3]?.photos?.[0]
    ) {
      setCategories([
        { title: "dior", img: items[0].photos[0].photoLink },
        { title: "boss", img: items[1].photos[0].photoLink },
        { title: "chanel", img: items[2].photos[0].photoLink },
        { title: "ray-ban", img: items[3].photos[0].photoLink },
      ]);
    } else {
      setCategories([]);
    }
  }, [items]);

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <MiniBanner />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:flex">
        {categories.map((category: any) => {
          const capitalizedCategory =
            category.title.charAt(0).toUpperCase() + category.title.slice(1);
          return (
            <Link
              href={`/category/${category.title}`}
              key={category.title}
              className="flex flex-col gap-2 rounded-2xl bg-[linear-gradient(105.02deg,_#2563EB_38.18%,_#FFFFFF_118.65%)] p-4 text-white"
            >
              <p
                className={`${roboto.className} text-xl font-bold md:text-2xl`}
              >
                {capitalizedCategory}
              </p>
              <Image
                src={category.img}
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
