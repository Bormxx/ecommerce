import MainSection from "@/components/MainSection/MainSection";
import { Items, Photos } from "../../types";
import { useUserStore } from "@/store/auth";
import HomeContainer from "@/components/HomeContainer/HomeContainer";

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
export default function Home({ items, photos }: TypeRequest) {
  const { isAuthenticated } = useUserStore();
  console.log(items);
  console.log(photos);
  return (
    <HomeContainer>
      <MainSection items={items} photos={photos} />
      {isAuthenticated && <h1>Hellow</h1>}
    </HomeContainer>
  );
}

export async function getStaticProps() {
  const itemsRes = await fetch("http://localhost:3004/api/items");
  const items = await itemsRes.json();
  const photosRes = await fetch("http://localhost:3004/api/photos");
  const photos = await photosRes.json();
  console.log("Fetched items:", items);
  console.log("Fetched items:", photos);
  return {
    props: { items, photos },
  };
}
