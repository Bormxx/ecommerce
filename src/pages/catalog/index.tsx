import CategoryPage from "@/components/CategoryPage/CategoryPage";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import { ProductInfo } from "@/shared/types";
import { useAuth } from "../../shared/hooks/useAuth";
import { useProducts } from "@/shared/hooks/queries/useProducts";
import { useUserStore } from "@/shared/store/auth";
import { useBasket } from "@/shared/hooks/queries/useBasket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavoritesInfo } from "@/shared/api/products";

export default function Catalog() {
  const { products } = useProducts();
  const { isAuthenticated } = useUserStore();
  const basketQuery = useBasket();
  const { data } = useQuery({
    queryKey: ["favoritesInfo"],
    queryFn: getFavoritesInfo,
    enabled: isAuthenticated, // Запускается только если пользователь авторизован
  });
  const favoritesItems = (data?.likedItems ?? []).map(
    (fav: ProductInfo) => fav.item,
  );
  const basketItems =
    isAuthenticated && basketQuery?.basket ? basketQuery.basket.items : [];
  useAuth();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: getFavoritesInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favoritesInfo"] });
    },
  });
  return (
    <HomeContainer>
      <CategoryPage
        items={products}
        itemsInBasketFromApi={basketItems}
        favorites={favoritesItems}
        setFavorites={(items) => {
          const lastChanged =
            items.find(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (item) => !favoritesItems.some((f: any) => f.id === item.id),
            ) ||
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            favoritesItems.find(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (item: any) => !items.some((f) => f.id === item.id),
            );

          if (lastChanged) {
            mutation.mutate(lastChanged.id);
          }
        }}
      />
    </HomeContainer>
  );
}
