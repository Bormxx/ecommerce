import MainSection from "@/components/MainSection/MainSection";
import { BasketItem } from "@/shared/types";
import HomeContainer from "../components/HomeContainer/HomeContainer";
import { useAuth } from "../shared/hooks/useAuth";
import { useProducts } from "../shared/hooks/queries/useProducts";
import { useBasket } from "@/shared/hooks/queries/useBasket";
import { useUserStore } from "@/shared/store/auth";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFavoritesInfo } from "@/shared/api/products";

export default function Home() {
  const { products } = useProducts();
  console.log(products);
  const { isAuthenticated } = useUserStore();
  const basketQuery = useBasket();
  const { data } = useQuery({
    queryKey: ["favoritesInfo"],
    queryFn: getFavoritesInfo,
  });
  const favorites = data?.favorites ?? [];
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  useEffect(() => {
    if (isAuthenticated && basketQuery?.basket) {
      setBasketItems(basketQuery.basket.items);
    } else {
      setBasketItems([]);
    }
  }, [isAuthenticated, basketQuery?.basket]);

  useAuth();

  return (
    <HomeContainer>
      <MainSection
        items={products}
        productsInBasket={basketItems}
        favorites={favorites}
      />
    </HomeContainer>
  );
}
