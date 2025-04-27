/* eslint-disable react-hooks/rules-of-hooks */
import CategoryPage from "@/components/CategoryPage/CategoryPage";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import { Photos, Product } from "@/shared/types";
import { useAuth } from "../../shared/hooks/useAuth";
export interface TypeRequest {
  items: Product[] | undefined;
  photos: Photos[] | null;
}
export default function category({ items, photos }: TypeRequest) {
  useAuth();
  return (
    <HomeContainer>
      <CategoryPage items={items} photos={photos} />
    </HomeContainer>
  );
}
// export async function getStaticPaths() {
//   const categories = [
//     { title: "Dior" },
//     { title: "Boss" },
//     { title: "Ray-Ban" },
//     { title: "Chanel" },
//   ];

//   const paths = categories.map((category) => ({
//     params: { id: category.title.toLowerCase() },
//   }));

//   return {
//     paths,
//     fallback: false, // Если путь не найден, показываем 404
//   };
// }

// TODO: Избавиться от getStaticProps

export async function getServerSideProps() {
  const itemsRes = await fetch("http://localhost:3000/api/old/items");
  const itemsReq = await itemsRes.json();
  const items = itemsReq.request;
  const photosRes = await fetch("http://localhost:3000/api/old/photos");
  const photosReq = await photosRes.json();
  const photos = photosReq.request;
  return {
    props: { items, photos },
  };
}
