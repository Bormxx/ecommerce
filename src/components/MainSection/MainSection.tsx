import Banner from "../Banners/Banner";
import Carousel from "../Carousel/Carousel";
import MiniBannerSection from "../MiniBannerSection/MiniBannerSection";
import CatalogList from "../CatalogList/CatalogList";
import { Photos, TItems } from "@/shared/types";
type MainSectionProps = {
  items: TItems[] | null;
  photos: Photos[] | null;
};

export default function MainSection({ items, photos }: MainSectionProps) {
  return (
    <div className="mx-5 mb-28 flex flex-col gap-3 md:mx-0 md:mb-0 md:w-full md:gap-6">
      <Banner />
      <Carousel />
      <MiniBannerSection />
      <CatalogList variable="standart" items={items} photos={photos} />
    </div>
  );
}
