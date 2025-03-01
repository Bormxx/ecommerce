import Home from "@/components/Home/Home";
import MainSection from "@/components/MainSection/MainSection";
import { Items, Photos } from "../../types";
import { useUserStore } from "@/store/auth";
import { useAuth } from "@/hooks/useAuth";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

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
  const { isAuthenticated, name, surname, email } = useUserStore();
  

  useAuth();

  console.log(items);
  console.log(photos);
  return (
    <Home>
      <MainSection items={items} photos={photos} />
      {isAuthenticated ? <h1>{name}, {surname}</h1> : <h1>{email}</h1>}
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
