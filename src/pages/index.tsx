import MainSection from "@/components/MainSection/MainSection";
import { Items, Photos } from "../../types";
import { useUserStore } from "@/store/auth";

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

  return (

    <HomeContainer>
      <MainSection items={items} photos={photos} />
      {isAuthenticated && <h1>Hellow</h1>}
    </HomeContainer>
  );
}

export async function getStaticProps() {
  const itemsRes = await fetch("/api/items");
  const items = await itemsRes.json();
  const photosRes = await fetch("/api/photos");
  const photos = await photosRes.json();
  return {
    props: { items, photos },
  };
}
