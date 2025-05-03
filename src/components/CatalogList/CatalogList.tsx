import { BasketItem, Photos } from "@/shared/types";
import { Product } from "../../shared/types/";
import MiniCard from "../MiniCard/MiniCard";

type CatalogListProps = {
  variable: string;
  items: Product[] | undefined;
  photos: Photos[] | null;
  productsInBasket: BasketItem[];
};

export default function CatalogList({
  variable,
  items,
  photos,
  productsInBasket,
}: CatalogListProps) {
  return (
    <section
      className={`grid-list w-full gap-2 md:gap-5 ${variable === "horizontal" ? "flex flex-col" : "grid"}`}
    >
      {items ? (
        items.map((item, index) => {
          const photo = photos
            ? photos.find((photo) => photo.itemId === item.id)
            : null;
          const img_url = photo ? photo.photoLink : "";

          return (
            <MiniCard
              key={index}
              itemId={item.id}
              title={item.title}
              price={item.price}
              img_url={img_url}
              variable={variable}
              productDetail={`/${index}`}
              productsInBasket={productsInBasket}
            />
          );
        })
      ) : (
        <p>Товары не найдены</p>
      )}
    </section>
  );
}
