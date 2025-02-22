import { TypeRequest } from "@/pages";
import Banner from "../Banner/Banner";
import Carousel from "../Carousel/Carousel";
import MiniBannerSection from "../MiniBannerSection/MiniBannerSection";
// import MiniCard from "../MiniCard/MiniCard";

export default function MainSection({ items, photos }: TypeRequest) {
  const limitedItems = items?.request.slice(0, 4) || [];
  return (
    <div className="mb-28">
      <Banner />
      <Carousel />
      <MiniBannerSection items={{ request: limitedItems }} photos={photos} />
      <div className="flex">{/* <MiniCard /> */}</div>
    </div>
  );
}
