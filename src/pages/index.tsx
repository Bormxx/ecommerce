import Home from "@/components/Home/Home";
import MainSection from "@/components/MainSection/MainSection";
import { Items, Photos } from "../../types";

interface ItemsList {
  request: Items[];
}

interface PhotosList {
  request: Photos[];
}

export interface TypeRequest {
  items: ItemsList | null;
  photos: PhotosList | null;
}
export default function HomeContainer({ items, photos }: TypeRequest) {

  console.log(items);
  console.log(photos);

  return (
    <Home>
        <MainSection items={items} photos={photos} />
    </Home>
  );
}
// export async function getStaticProps() {
//   const itemsRes = await fetch("http://192.168.1.158:3000/api/items");
//   const items = await itemsRes.json();
//   const photosRes = await fetch("http://192.168.1.158:3000/api/photos");
//   const photos = await photosRes.json();
//   console.log("Fetched items:", items);
//   console.log("Fetched items:", photos);
//   return {
//     props: { items, photos },
//   };
// }
