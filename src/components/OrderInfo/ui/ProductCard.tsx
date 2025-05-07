import Image from "next/image";
import { Product } from "../../../shared/types";
import { inter, roboto } from "../../../styles/fonts";

type Props = {
  item: {
    item: Product;
    quantity: number;
  };
};

export const ProductCard = (props: Props) => {
  const { item } = props;

  return (
    <div key={item.item.id} className="flex gap-2">
      <Image
        className="rounded-lg object-contain"
        src={item.item.photos?.[0].photoLink || "/images/Product.jpg"}
        alt={item.item.title}
        width={80}
        height={80}
      />
      <div className="flex flex-col justify-between">
        <p className={`${inter.className} text-base font-normal text-blue-600`}>
          {item.item.title}
        </p>
        <div className="flex items-end gap-1">
          <p
            className={`${roboto.className} text-xl font-bold uppercase text-gray-800`}
          >
            {item.item.price} ₽
          </p>
          <p
            className={`${inter.className} text-base font-normal text-gray-500`}
          >
            {item.quantity} ₽
          </p>
        </div>
      </div>
    </div>
  );
};
