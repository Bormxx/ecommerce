import MainSection from "@/components/MainSection/MainSection";
import { Items, Photos } from "../shared/types";
import { useUserStore } from "@/shared/store/auth";
import ECMainLayout from "@/components/layouts/main-layout";

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
      {/* <ProtectedRoute protection={useProtectedRoute}> */}
      <MainSection items={items} photos={photos} />
      {isAuthenticated && <h1>Hellow</h1>}
      {/* </ProtectedRoute> */}
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
