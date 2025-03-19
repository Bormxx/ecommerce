import Image from "next/image";
import Link from "next/link";
import { inter, roboto } from "@/styles/fonts";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/shared/store/auth";
import { formattedPrice } from "@/shared/utils/frontend/formattedPrice";

type ProductMock = {
  name: string;
  photo: string;
  price: number;
};

type Props = {
  product: ProductMock;
};

export const ECProductCard = (props: Props) => {
  const { product } = props;
  const { isAuthenticated } = useUserStore();

  return (
    <div className="flex">
      <div className="flex flex-col gap-2 rounded-lg">
        <Link href="/" className="flex flex-col gap-2">
          <Image
            src={product.photo}
            alt="Product"
            width={172}
            height={172}
            className="w-40 md:w-[172px]"
          />
          <h3 className={`${inter.className} text-[14px]`}>
            {product.name || ""}
          </h3>
          <span
            className={`${roboto.className} text-xl font-bold text-[#10B981]`}
          >
            {formattedPrice(product.price)}
          </span>
        </Link>

        {isAuthenticated && (
          <div className="flex gap-1">
            <button
              className="flex w-[calc(100%-40px)] justify-center rounded-lg bg-blue-800 py-2 text-white"
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
    </div>
  );
};
