import { BasketItem, Favorites } from "@/shared/types";
import { Product } from "../../shared/types/";
import MiniCard from "../MiniCard/MiniCard";

type CatalogListProps = {
  variable: string;
  items: Product[] | undefined;
  productsInBasket: BasketItem[];
  favorites: Favorites[] | [];
};

export default function CatalogList({
  variable,
  items,
  productsInBasket,
  favorites,
}: CatalogListProps) {
  return (
    <section
      className={`grid-list w-full gap-2 md:gap-5 ${variable === "horizontal" ? "flex flex-col" : "grid"}`}
    >
      {items ? (
        items.map((item, index) => {
          const photoLink = item.photos
            ? item.photos.map((photo) => photo.photoLink)[0]
            : "";

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
            />
          );
        })
      ) : (
        <p>Товары не найдены</p>
      )}
    </section>
  );
}
