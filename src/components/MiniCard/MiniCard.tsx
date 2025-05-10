/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { inter, roboto } from "@/styles/fonts";
import Link from "next/link";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/shared/store/auth";
import { addProductInBacket } from "@/shared/api/basket";
import { useEffect, useState } from "react";
import { BasketItem, Product } from "@/shared/types";
import ReplaceQuantity from "./ReplaceQuantity";
import { handleToggleFavorite } from "@/shared/utils/frontend/fetch";
import { HeartIcon as HeartIconBlack } from "@heroicons/react/24/solid";

interface MiniCardProps {
  title: any;
  price: any;
  img_url: any;
  variable: string;
  productDetail: string;
  key: string | number;
  itemId: number;
  productsInBasket: BasketItem[] | undefined;
  favorites: Product[] | [];
  setFavorites: (items: Product[]) => void;
}

const MiniCard = ({
  title,
  price,
  img_url,
  variable,
  productDetail,
  itemId,
  productsInBasket,
  favorites,
  setFavorites,
}: MiniCardProps) => {
  const { isAuthenticated } = useUserStore();
  const liked = favorites
    ? favorites.some((favoriteItem) => favoriteItem.id === itemId)
    : false;
  const [isLiked, setIsLiked] = useState(liked);
  const formattedPrice = new Intl.NumberFormat("ru-RU").format(price);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (isAuthenticated && favorites) {
      const liked = favorites.some(
        (favoriteItem) => favoriteItem.id === itemId,
      );
      setIsLiked(liked);
    }
  }, [isAuthenticated, favorites]);
  useEffect(() => {
    if (isAuthenticated && productsInBasket) {
      const item = productsInBasket.find(
        (item: BasketItem) => item.item.id === itemId,
      );
      if (item) {
        setQuantity(item.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [isAuthenticated, productsInBasket, itemId]);

  function handleLikeClick() {
    setIsLiked((prev) => !prev);

    handleToggleFavorite(itemId)
      .then(() => {
        const alreadyLiked = favorites.some((f) => f.id === itemId);

        if (alreadyLiked) {
          setFavorites(favorites.filter((f) => f.id !== itemId));
        } else {
          setFavorites([
            ...favorites,
            { id: itemId, title, price, description: "", availability: true },
          ]);
        }
      })
      .catch((err) => {
        setIsLiked((prev) => !prev);
        console.log(`Ошибка: ${err}`);
      });
  }

  function addToCart() {
    setQuantity(1);
    addProductInBacket({ itemId, quantity: 1 })
      .then((response) => {
        console.log("Товар добавлен в корзину:", response.message);
      })
      .catch((error) => {
        console.error("Ошибка при добавлении товара в корзину:", error.message);
      });
  }

  return (
    <div
      className={`flex ${variable === "horizontal" ? "flex-col items-end md:flex-row md:items-center" : "flex-col"} gap-2 rounded-lg bg-white ${variable === "mini" ? "" : "p-4"}`}
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
          className={`object-contain ${variable === "mini" ? "w-[172]" : variable === "standart" ? "w-[248]" : "w-[80]"}`}
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
        <div className="flex h-10 items-center justify-between gap-1">
          {productsInBasket && quantity > 0 ? (
            <div className="flex flex-grow justify-end gap-2">
              <ReplaceQuantity
                id={itemId}
                quantity={quantity}
                onQuantityChange={(newQty) => setQuantity(newQty)}
              />
            </div>
          ) : (
            <button
              className="flex h-10 w-[calc(100%-40px)] min-w-20 justify-center rounded-lg bg-blue-800 py-2 text-white"
              type="button"
              onClick={addToCart}
            >
              <ShoppingBagIcon width={24} height={24} />
            </button>
          )}

          <button type="button" className="h-6 w-6" onClick={handleLikeClick}>
            {isLiked ? (
              <HeartIconBlack width={24} height={24} />
            ) : (
              <HeartIcon width={24} height={24} />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default MiniCard;
