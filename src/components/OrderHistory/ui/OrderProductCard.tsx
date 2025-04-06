import { inter } from "@/styles/fonts";
import Image from "next/image";
import { OrderProductCardMock } from "../mock-data";

const img = "/images/Product-with-shadow.png";

type Props = {
  product: OrderProductCardMock;
};

export function OrderProductCard(props: Props) {
  const { product } = props;

  return (
    <div className="flex items-start justify-between">
      <div className="flex gap-2">
        <Image
          src={img}
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
            {product.params}
          </p>
        </div>
      </div>
      <p className={`${inter.className} text-base font-normal text-gray-800`}>
        {`${product.price} ₽`}
      </p>
    </div>
  );
}
