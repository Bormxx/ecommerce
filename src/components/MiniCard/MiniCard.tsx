// MiniCard.tsx
import Image, { StaticImageData } from "next/image";
import { inter, roboto } from "@/app/fonts";
import Link from "next/link";

interface MiniCardProps {
  title: string;
  price: number;
  img_url: StaticImageData;
}

const MiniCard = ({ title, price, img_url }: MiniCardProps) => {
  const formattedPrice = new Intl.NumberFormat("ru-RU").format(price);

  return (
    <Link href="/" className="flex flex-col">
      <Image src={img_url} alt="Product" width={172} height={172} />
      <h3 className={`${inter.className} text-[14px]`}>{title}</h3>
      <span
        className={`${roboto.className} text-[20px] font-bold text-[#10B981]`}
      >
        {formattedPrice} &#8381;
      </span>
    </Link>
  );
};

export default MiniCard; // Это важно! Экспорт по умолчанию
