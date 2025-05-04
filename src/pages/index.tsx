import MainSection from "@/components/MainSection/MainSection";
import { BasketItem, Photos } from "@/shared/types";
import HomeContainer from "../components/HomeContainer/HomeContainer";
import { useAuth } from "../shared/hooks/useAuth";
import { useProducts } from "../shared/hooks/queries/useProducts";
import { useBasket } from "@/shared/hooks/queries/useBasket";
import { useUserStore } from "@/shared/store/auth";
import { useEffect, useState } from "react";

export interface TypeRequest {
  photos: Photos[] | null;
}

export default function Home({ photos }: TypeRequest) {
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
    }
  }, [isAuthenticated, basket]);

  useAuth();

  return (
    <HomeContainer>
      <MainSection
        items={products}
        photos={photos}
        productsInBasket={basketItems}
      />
    </HomeContainer>
  );
}

// TODO: Избавиться от getStaticProps

export async function getServerSideProps() {
  const photosRes = await fetch(`${process.env.SITE_URL}/api/old/photos`);
  const photosReq = await photosRes.json();
  const photos = photosReq.request;
  return {
    props: { photos },
  };
}
