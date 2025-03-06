import { TypeRequest } from "@/pages";
import Banner from "../Banner/Banner";
import Carousel from "../Carousel/Carousel";
import MiniBannerSection from "../MiniBannerSection/MiniBannerSection";
// import MiniCard from "../MiniCard/MiniCard";

const itemsPhotos = {
  request: [
    {
      id: 1740025921228,
      itemId: 1740025481501,
      photoLink:
        "http://192.168.1.158:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FProduct-172x172.0744d44c.jpg&w=384&q=75",
    },
    {
      id: 1740026285643,
      itemId: 1740025543530,
      photoLink:
        "http://192.168.1.158:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FProduct-172x172.0744d44c.jpg&w=384&q=75",
    },
    {
      id: 1740026990892,
      itemId: 1740025594130,
      photoLink:
        "http://192.168.1.158:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FProduct-172x172.0744d44c.jpg&w=384&q=75",
    },
    {
      id: 1740064731048,
      itemId: 1740025533413,
      photoLink:
        "http://192.168.1.158:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FProduct-172x172.0744d44c.jpg&w=384&q=75",
    },
    {
      id: 1740064789336,
      itemId: 1740025552007,
      photoLink:
        "http://192.168.1.158:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FProduct-172x172.0744d44c.jpg&w=384&q=75",
    },
  ],
};
export default function MainSection({ items }: TypeRequest) {
  const limitedItems = items?.request.slice(0, 4) || [];
  return (
    <div className="">
      <Banner />
      <Carousel />
      <MiniBannerSection
        items={{ request: limitedItems }}
        photos={itemsPhotos}
      />
      <div className="flex">{/* <MiniCard /> */}</div>
    </div>
  );
}
