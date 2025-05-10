import { BasketItem } from "@/shared/types";
import { Product } from "../../shared/types/";
import MiniCard from "../MiniCard/MiniCard";

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
  if (items) {
    return (
      <section
        className={`grid-list w-full gap-2 ${variable === "horizontal" ? "flex flex-col" : "grid"} md:gap-5`}
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
                setFavorites={setFavorites}
              />
            );
          })
        ) : (
          <p>Товары не найдены</p>
        )}
      </section>
    );
  } else {
    return <p>Товары пока не добавлены в базу</p>;
  }
}
