import Image, { StaticImageData } from "next/image";
import { inter, roboto } from "@/byaka/fonts";
import Link from "next/link";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

interface MiniCardProps {
  title: string;
  price: number;
  img_url: StaticImageData;
}

const userName = "Kristina";

const MiniCard = ({ title, price, img_url }: MiniCardProps) => {
  const formattedPrice = new Intl.NumberFormat("ru-RU").format(price);

  return (
    <div className="flex flex-col gap-2">
      <Link href="/" className="flex flex-col gap-2">
        <Image
          src={img_url}
          alt="Product"
          width={172}
          height={172}
          className="w-40 md:w-[172px]"
        />
        <h3 className={`${inter.className} text-[14px]`}>{title}</h3>
        <span
          className={`${roboto.className} text-xl font-bold text-[#10B981]`}
        >
          {formattedPrice} &#8381;
        </span>
      </Link>

      {userName && (
        <div className="flex gap-1">
          <button
            className="flex flex-grow justify-center rounded-lg bg-blue-800 py-2 text-white"
            type="button"
          >
            <ShoppingBagIcon width={24} height={24} />
          </button>
          <button type="button" className="h-6 w-6 p-2">
            <HeartIcon width={24} height={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniCard;
