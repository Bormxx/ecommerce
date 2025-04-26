import { BasketItem, Photos } from "@/shared/types";
import { EmblaOptionsType } from "embla-carousel";
import Banner from "../Banners/Banner";
import CatalogList from "../CatalogList/CatalogList";
import MiniBannerSection from "../MiniBannerSection/MiniBannerSection";

import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import EmblaCarousel from "../../pages/carousel";
import { getItemsCarousel } from "../../shared/api/carousel";
import { Product } from "../../shared/types/";
import MiniCard from "../MiniCard/MiniCard";

type MainSectionProps = {
  items: Product[] | undefined;
  photos: Photos[] | null;
  productsInBasket: BasketItem[];
};
export const county: number = 7 + 1;
export default function MainSection({
  items,
  photos,
  productsInBasket,
}: MainSectionProps) {
  const prod = useQuery({
    queryKey: ["getItemsCarousel"],
    queryFn: getItemsCarousel,
  });
  const OPTIONS: EmblaOptionsType = { align: "start", loop: true };
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
            img_url="/images/glasses2.jpeg"
            variable="standart"
            productDetail={`/${prod.requestItem.id}`}
            productsInBasket={productsInBasket}
          />,
        );
      }
    },
  );
  return (
    <div className="mx-5 mb-28 flex flex-col gap-3 md:mx-0 md:mb-0 md:w-full md:gap-6">
      <Banner />
      {/* <Carousel /> */}
      <EmblaCarousel slides={SLIDE} options={OPTIONS} />
      <MiniBannerSection />
      <CatalogList
        variable="standart"
        items={items}
        photos={photos}
        productsInBasket={productsInBasket}
      />
    </div>
  );
}
