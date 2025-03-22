import MainSection from "@/components/MainSection/MainSection";
import HomeContainer from "../components/HomeContainer/HomeContainer";
import { Photos } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { getItems } from "@/shared/services/main";
import { useAuth } from "../shared/hooks/useAuth";

export interface TypeRequest {
  photos: Photos[] | null;
}

export default function Home({ photos }: TypeRequest) {
  const itemsRes = useQuery({
    queryKey: ["getItems"],
    queryFn: getItems,
  });
  useAuth();
  const items = itemsRes.data ? itemsRes.data.request : [];
  return (
    <HomeContainer>
      <MainSection items={items} photos={photos} />
    </HomeContainer>
  );
}

export async function getStaticProps() {
  // const itemsRes = await fetch("http://localhost:3000/api/items");
  // const itemsReq = await itemsRes.json();
  // const items = itemsReq.request;
  const photosRes = await fetch("http://localhost:3000/api/photos");
  const photosReq = await photosRes.json();
  const photos = photosReq.request;
  return {
    props: { photos },
  };
}