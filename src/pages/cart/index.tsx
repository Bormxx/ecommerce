import HomeContainer from "@/components/HomeContainer/HomeContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import CartSection from "@/components/CartSection/CartSection";
import { useBasket } from "@/shared/hooks/queries/useBasket";
import { useQuery } from "@tanstack/react-query";
import { getFavoritesInfo } from "@/shared/api/products";
import { useEffect, useState } from "react";
import { Product, ProductInfo } from "@/shared/types";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import { useProtectedRoute } from "../../shared/hooks/useProtectedRoute";

export default function Cart() {
  const { basket } = useBasket();
  const { data } = useQuery({
    queryKey: ["favoritesInfo"],
    queryFn: getFavoritesInfo,
  });
  const favorites = data?.likedItems ?? null;
  const [favoritesItems, setFavoritesItems] = useState<Product[] | []>([]);

  useEffect(() => {
    const favoritesItemsFormatted: Product[] = favorites
      ? favorites.map((fav: ProductInfo) => ({
          ...fav.item,
          photos: fav.photos,
        }))
      : null;
    setFavoritesItems(favoritesItemsFormatted);
  }, [favorites]);

  return (
    <HomeContainer>
      <ProtectedRoute protection={useProtectedRoute}>
        <div className="flex h-[90vh] p-5 md:pt-10">
          <Sidebar />
          {basket ? (
            <CartSection
              itemsInBasketFromApi={basket.items}
              favorites={favoritesItems}
              setFavorites={setFavoritesItems}
            />
          ) : (
            <p>Идет загрузка ...</p>
          )}
        </div>
      </ProtectedRoute>
    </HomeContainer>
  );
}
