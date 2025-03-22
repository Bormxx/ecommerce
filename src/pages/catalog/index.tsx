import CategoryPage from "@/components/CategoryPage/CategoryPage";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import { Photos, TItems } from "@/shared/types";

export interface TypeRequest {
  items: TItems[] | null;
  photos: Photos[] | null;
}
export default function catalog({ items, photos }: TypeRequest) {

  return (
    <HomeContainer>
      <CategoryPage items={items} photos={photos} />
    </HomeContainer>
  );
}
export async function getStaticProps() {
  const itemsRes = await fetch("http://localhost:3000/api/items");
  const itemsReq = await itemsRes.json();
  const items = itemsReq.request;
  const photosRes = await fetch("http://localhost:3000/api/photos");
  const photosReq = await photosRes.json();
  const photos = photosReq.request;
  return {
    props: { items, photos },
  };
}
