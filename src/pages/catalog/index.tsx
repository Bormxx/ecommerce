import CategoryPage from "@/components/CategoryPage/CategoryPage";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import { BasketItem } from "@/shared/types";
import { useAuth } from "../../shared/hooks/useAuth";
import { useProducts } from "@/shared/hooks/queries/useProducts";
import { useUserStore } from "@/shared/store/auth";
import { useEffect, useState } from "react";
import { useBasket } from "@/shared/hooks/queries/useBasket";
import { useQuery } from "@tanstack/react-query";
import { getFavoritesInfo } from "@/shared/api/products";

export default function Catalog() {
  const { products } = useProducts();
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
      <CategoryPage
        items={products}
        itemsInBasketFromApi={basketItems}
        favorites={favorites}
      />
    </HomeContainer>
  );
}
