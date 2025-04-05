import Banner from "../Banners/Banner";
import MiniBannerSection from "../MiniBannerSection/MiniBannerSection";
import CatalogList from "../CatalogList/CatalogList";
import { Photos, TItems } from "@/shared/types";
import { EmblaOptionsType } from "embla-carousel";

import { useQuery } from "@tanstack/react-query";
import MiniCard from "../MiniCard/MiniCard";
import { ReactNode } from "react";
import { getItemsCarousel } from "../../shared/services/carousel";
import EmblaCarousel from "../../pages/carousel";
type MainSectionProps = {
  items: TItems[] | null;
  photos: Photos[] | null;
};
export const county: number = 7 + 1;
export default function MainSection({ items, photos }: MainSectionProps) {
  const prod = useQuery({
    queryKey: ["getItemsCarousel"],
    queryFn: getItemsCarousel,
  });
  const OPTIONS: EmblaOptionsType = { align: "start", loop: true };
  const SLIDE_COUNT = county;
  const SLIDE: ReactNode[] = [];
  prod.data?.data.map((prod: any, i: number) => {
    if (i + 1 < SLIDE_COUNT) {
      SLIDE.push(
        <MiniCard
          key={prod.requestItem.id}
          title={prod.requestItem.title}
          price={prod.requestItem.price}
          img_url={prod.requestPhoto[i - i].photoLink}
          variable="standart"
          productDetail={`/${prod.requestItem.id}`}
        />,
      );
    }
  });
  return (
    <div className="mx-5 mb-28 flex flex-col gap-3 md:mx-0 md:mb-0 md:w-full md:gap-6">
      <Banner />
      {/* <Carousel /> */}
      <EmblaCarousel slides={SLIDE} options={OPTIONS} />
      <MiniBannerSection />
      <CatalogList variable="standart" items={items} photos={photos} />
    </div>
  );
}
