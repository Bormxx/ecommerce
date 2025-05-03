/* eslint-disable react-hooks/rules-of-hooks */
import CategoryPage from "@/components/CategoryPage/CategoryPage";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import { BasketItem, Photos } from "@/shared/types";
import { useAuth } from "../../shared/hooks/useAuth";
import { useBasket } from "@/shared/hooks/queries/useBasket";
import { useProducts } from "@/shared/hooks/queries/useProducts";
import { useEffect, useState } from "react";
import { useUserStore } from "@/shared/store/auth";
export interface TypeRequest {
  photos: Photos[] | null;
}
export default function category({ photos }: TypeRequest) {
  const { products } = useProducts();
  const { isAuthenticated } = useUserStore();
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const { basket } = useBasket();
  useEffect(() => {
    if (isAuthenticated) {
      if (basket) {
        setBasketItems(basket.items);
      } else {
        setBasketItems([]);
      }
    } else {
      setBasketItems([]);
    }
  }, [isAuthenticated, basket]);

 
  useAuth();

  return (
    <HomeContainer>
      <CategoryPage
        items={products}
        photos={photos}
        itemsInBasketFromApi={basketItems}
      />
    </HomeContainer>
  );
}
export async function getStaticPaths() {
  const categories = [
    { title: "Dior" },
    { title: "Boss" },
    { title: "Ray-Ban" },
    { title: "Chanel" },
  ];

  const paths = categories.map((category) => ({
    params: { id: category.title.toLowerCase() },
  }));

  return {
    paths,
    fallback: false, // Если путь не найден, показываем 404
  };
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
