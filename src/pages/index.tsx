import MainSection from "@/components/MainSection/MainSection";
import { Photos } from "@/shared/types";
import HomeContainer from "../components/HomeContainer/HomeContainer";
import { useAuth } from "../shared/hooks/useAuth";
import { useProducts } from '../shared/hooks/queries/useProducts';

export interface TypeRequest {
  photos: Photos[] | null;
}

export default function Home({ photos }: TypeRequest) {
  const { products } = useProducts()
  useAuth();

  return (
    <HomeContainer>
      <MainSection items={products} photos={photos} />
    </HomeContainer>
  );
}

// TODO: Избавиться от getStaticProps

export async function getStaticProps() {
  const photosRes = await fetch("http://localhost:3000/api/old/photos");
  const photosReq = await photosRes.json();
  const photos = photosReq.request;
  return {
    props: { photos },
  };
}
