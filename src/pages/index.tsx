import { Items, Photos } from "../shared/types";
import { useUserStore } from "@/shared/store/auth";
import ECMainLayout from "@/components/layouts/main-layout";
import { ECHome } from "@/components/home";

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
    <ECMainLayout>
      <ECHome items={items} photos={photos} />
    </ECMainLayout>
  );
}

export async function getStaticProps() {
  const itemsRes = await fetch("http://127.0.0.1:3000/api/items");
  const items = await itemsRes.json();
  const photosRes = await fetch("http://127.0.0.1:3000/api/photos");
  const photos = await photosRes.json();
  return {
    props: { items, photos },
  };
}
