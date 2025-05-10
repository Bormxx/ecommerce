import { BasketItem } from "@/shared/types";
// import { EmblaOptionsType } from "embla-carousel";
import Banner from "../Banners/Banner";
import CatalogList from "../CatalogList/CatalogList";
import MiniBannerSection from "../MiniBannerSection/MiniBannerSection";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { getItemsCarousel } from "../../shared/api/carousel";
import { Product } from "../../shared/types/";
import MiniCard from "../MiniCard/MiniCard";
import EmblaCarousel from "../Carousel/Carousel";

type MainSectionProps = {
  items: Product[] | undefined;
  productsInBasket: BasketItem[];
  favorites: Product[] | [];
  setFavorites: (items: Product[]) => void;
};
export const county: number = 7 + 1;
export default function MainSection({
  items,
  productsInBasket,
  favorites,
  setFavorites,
}: MainSectionProps) {
  const prod = useQuery({
    queryKey: ["getItemsCarousel"],
    queryFn: getItemsCarousel,
  });
  // const OPTIONS: EmblaOptionsType = { align: "start", loop: true };
  const SLIDE_COUNT = county;
  const SLIDE: ReactNode[] = [];
  prod.data?.data.map(
    (
      prod: {
        requestItem: { id: number; title: string; price: number };
        requestPhoto: { photoLink: string }[];
      },
      i: number,
    ) => {
      if (i + 1 < SLIDE_COUNT) {
        SLIDE.push(
          <MiniCard
            key={prod.requestItem.id}
            itemId={prod.requestItem.id}
            title={prod.requestItem.title}
            price={prod.requestItem.price}
            img_url={prod.requestPhoto[i - i].photoLink}
            variable="standart"
            productDetail={`/${prod.requestItem.id}`}
            productsInBasket={productsInBasket}
            favorites={favorites}
            setFavorites={setFavorites}
          />,
        );
      }
    },
  );
  return (
    <div className="mx-5 mb-28 flex flex-col gap-3 md:mx-0 md:mb-0 md:w-full md:gap-6">
      <Banner items={items} />
      <EmblaCarousel slides={SLIDE} />
      <MiniBannerSection items={items} />
      <CatalogList
        variable="standart"
        items={items}
        productsInBasket={productsInBasket}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </div>
  );
}
