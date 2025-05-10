import HomeContainer from "@/components/HomeContainer/HomeContainer";
import MainSection from "@/components/MainSection/MainSection";
import { getFavoritesInfo } from "@/shared/api/products";
import { useBasket } from "@/shared/hooks/queries/useBasket";
import { useProducts } from "@/shared/hooks/queries/useProducts";
import { useUserStore } from "@/shared/store/auth";
import { BasketItem, Product, ProductInfo } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home() {
  const { products } = useProducts();
  const { isAuthenticated } = useUserStore();
  const basketQuery = useBasket();
  const { data } = useQuery({
    queryKey: ["favoritesInfo"],
    queryFn: getFavoritesInfo,
  });
  const favorites = data?.likedItems ?? [];

  const [favoritesItems, setFavoritesItems] = useState<Product[]>([]);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  useEffect(() => {
    if (isAuthenticated && basketQuery?.basket) {
      setBasketItems(basketQuery.basket.items);
    } else {
      setBasketItems([]);
    }

    const favoritesItemsFormatted: Product[] = favorites.map(
      (fav: ProductInfo) => fav.item,
    );
    setFavoritesItems(favoritesItemsFormatted);
  }, [isAuthenticated, basketQuery?.basket, favorites]);

  return (
    <HomeContainer>
      <MainSection
        items={products}
        productsInBasket={basketItems}
        favorites={favoritesItems}
        setFavorites={setFavoritesItems} 
      />
    </HomeContainer>
  );
}
