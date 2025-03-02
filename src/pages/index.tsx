import MainSection from "@/components/MainSection/MainSection";
import { Items, Photos } from "../../types";
import { useUserStore } from "@/store/auth";
import HomeContainer from "../components/HomeContainer/HomeContainer";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { useProtectedRoute } from "../hooks/useProtectedRoute";

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
      <ProtectedRoute protection={useProtectedRoute}>
        <MainSection items={items} photos={photos} />
        {isAuthenticated && <h1>Hellow</h1>}
      </ProtectedRoute>
    </HomeContainer>
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
