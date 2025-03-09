import Image from "next/image";
import Link from "next/link";
import image from "../../images/Product.jpg";
import { inter, roboto } from "@/styles/fonts";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";

type CardInBasketProps = {
  price: number;
  title: string;
  deleteCard: () => void;
  id: string;
  quantity: number;
  minusQuantity: (id: string) => void;
  plusQuantity: (id: string) => void;
  like: boolean;
  clickLike: (id: string) => void;
};

export default function CardInBasket({
  price,
  title,
  deleteCard,
  id,
  quantity,
  minusQuantity,
  plusQuantity,
  like,
  clickLike,
}: CardInBasketProps) {
  const formattedPrice = new Intl.NumberFormat("ru-RU").format(
    price * quantity,
  );
  function clickMinusQuantity() {
    minusQuantity(id);
  }
  function clickPlusQuantity() {
    plusQuantity(id);
  }
  return (
    <div
      id={id}
      className="flex flex-col border-b border-gray-200 py-3 md:rounded-xl md:p-4 md:shadow-md"
    >
      <div className="flex gap-2">
        <Link href={`/${id}`}>
          <Image src={image} alt={title} width={60} height={60} />
        </Link>
        <div className="flex flex-grow flex-col justify-between">
          <Link href={`/${id}`}>
            <h2 className={`${inter.className} text-sm text-blue-600`}>
              {title}
            </h2>
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              className="flex size-6 items-center justify-center rounded-[4px] bg-gray-200 text-xs"
              onClick={clickMinusQuantity}
            >
              -
            </button>
            <p className={`${roboto.className} text-base font-bold`}>
              {quantity}
            </p>
            <button
              type="button"
              onClick={clickPlusQuantity}
              className="flex size-6 items-center justify-center rounded-[4px] bg-gray-200 text-xs"
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <span className={`${inter.className} text-end text-sm font-bold`}>
            {formattedPrice} &#8381;
          </span>
          <div className="flex">
            <button
              type="button"
              onClick={deleteCard}
              className="flex justify-center p-2 text-blue-800"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex justify-center p-2 text-blue-800"
              onClick={() => clickLike(id)}
            >
              {like ? (
                <HeartIconSolid className="h-4 w-4" />
              ) : (
                <HeartIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <p className={`${inter.className} text-xs text-gray-400`}>Доставят</p>
        <span className={`${inter.className} text-sm text-gray-800`}>
          {/* {deliveryTime} */}
          30 февраля 2025 г.
        </span>
      </div>
    </div>
  );
}
