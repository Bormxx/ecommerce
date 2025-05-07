/* eslint-disable react-hooks/rules-of-hooks */
import CategoryPage from "@/components/CategoryPage/CategoryPage";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import { Photos, Product } from "@/shared/types";
import { useAuth } from "../../shared/hooks/useAuth";

export interface TypeRequest {
  items: Product[] | undefined;
  photos: Photos[] | null;
}
export default function catalog({ items, photos }: TypeRequest) {
  useAuth();
  return (
    <HomeContainer>
      <CategoryPage items={items} photos={photos} />
    </HomeContainer>
  );
}

// TODO: Избавиться от getStaticProps

export async function getServerSideProps() {
  const itemsRes = await fetch(`${process.env.SITE_URL}/api/old/items`);
  const itemsReq = await itemsRes.json();
  const items = itemsReq.request;
  const photosRes = await fetch(`${process.env.SITE_URL}/api/old/photos`);
  const photosReq = await photosRes.json();
  const photos = photosReq.request;
  return {
    props: { items, photos },
  };
}
