import { inter } from "@/styles/fonts";
import Image from "next/image";

const img = "/images/Product-with-shadow.png";

type Props = {
  product: {title: string, photos?: { photoLink: string }[], price: number, characteristics?: { frameMatherials?: string }[] };
  quantity: number;
};

export function OrderProductCard(props: Props) {
  const { product, quantity } = props;

  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-2">
        <Image
          src={product.photos?.[0]?.photoLink || img}
          alt="Product"
          width={80}
          height={80}
          className="rounded-lg"
        />
        <div className="flex flex-col">
          <p
            className={`${inter.className} text-base font-normal text-blue-600`}
          >
            {product.title}
          </p>
          <p className={`${inter.className} text-xs font-normal text-gray-500`}>
            {product.characteristics?.[0]?.frameMatherials || "Не указано"}
          </p>
        </div>
      </div>
      <p className={`${inter.className} text-base font-normal text-gray-800`}>
        {`${quantity}x ${product.price} ₽`}
      </p>
    </div>
  );
}
