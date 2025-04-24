/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { inter, roboto } from "@/styles/fonts";
import Link from "next/link";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/shared/store/auth";
// import { useState } from "react";

interface MiniCardProps {
  title: any;
  price: any;
  img_url: any;
  variable: string;
  productDetail: string;
  key: string | number;
}

const MiniCard = ({
  title,
  price,
  img_url,
  variable,
  productDetail,
}: MiniCardProps) => {
  const { isAuthenticated } = useUserStore();
  // const [isLiked, setIsLiked] = useState(false);
  const formattedPrice = new Intl.NumberFormat("ru-RU").format(price);
  function handleLikeClick() {}
  function addToCart() {}

  return (
    <div
      className={`flex ${variable === "horizontal" ? "flex-row" : "flex-col"} gap-2 rounded-lg bg-white ${variable === "mini" ? "" : "p-4"}`}
    >
      <Link
        href={productDetail != undefined ? `/products${productDetail}` : "/"}
        className={`${variable === "mini" ? "w-[172px] flex-col gap-2" : variable === "horizontal" ? "w-full flex-row items-center justify-between gap-4" : "flex-col gap-2"} flex`}
      >
        <Image
          src={img_url}
          alt="Product"
          width={variable === "mini" ? 172 : variable === "standart" ? 248 : 80}
          height={
            variable === "mini" ? 172 : variable === "standart" ? 248 : 80
          }
          className="w-full object-contain"
        />
        <h3
          className={`${inter.className} ${variable === "horizontal" ? "w-full grow text-base text-blue-600" : ""} text-sm`}
        >
          {title}
        </h3>
        <span
          className={`${roboto.className} min-w-[30%] text-xl font-bold text-[#10B981]`}
        >
          {formattedPrice} &#8381;
        </span>
      </Link>
      {isAuthenticated && (
        <div className="flex items-center gap-1">
          <button
            className="flex h-10 w-[calc(100%-40px)] min-w-20 justify-center rounded-lg bg-blue-800 py-2 text-white"
            type="button"
            onClick={addToCart}
          >
            <ShoppingBagIcon width={24} height={24} />
          </button>
          <button type="button" className="h-6 w-6" onClick={handleLikeClick}>
            <HeartIcon width={24} height={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniCard;
