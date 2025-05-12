import { BasketItem } from "@/shared/types";
import { Product } from "../../shared/types/";
import MiniCard from "../MiniCard/MiniCard";
import SkeletonCard from "../MiniCard/SkeletonCard";

type CatalogListProps = {
  variable: string;
  items: Product[] | undefined;
  productsInBasket: BasketItem[];
  favorites: Product[] | [];
  setFavorites: (items: Product[]) => void;
};

export default function CatalogList({
  variable,
  items,
  productsInBasket,
  favorites,
  setFavorites,
}: CatalogListProps) {
  return (
    <section
      className={`grid-list w-full gap-2 ${
        variable === "horizontal" ? "flex flex-col" : "grid"
      } md:gap-5`}
    >
      {items
        ? items.map((item, index) => {
            const photoLink = item.photos?.[0]?.photoLink || "";

            return (
              <MiniCard
                key={index}
                itemId={item.id}
                title={item.title}
                price={item.price}
                img_url={photoLink}
                variable={variable}
                productDetail={`/${index}`}
                productsInBasket={productsInBasket}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            );
          })
        : Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} variable={variable} />
          ))}
    </section>
  );
}
