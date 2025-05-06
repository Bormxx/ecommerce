import HomeContainer from "@/components/HomeContainer/HomeContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import CartSection from "@/components/CartSection/CartSection";
import { useBasket } from "@/shared/hooks/queries/useBasket";
import { useQuery } from "@tanstack/react-query";
import { getFavoritesInfo } from "@/shared/api/products";

export default function Cart() {
  const { basket } = useBasket();
  const { data } = useQuery({
    queryKey: ["favoritesInfo"],
    queryFn: getFavoritesInfo,
  });
  const favorites = data?.favorites ?? [];

  return (
    <HomeContainer>
      <div className="flex h-[90vh] pt-10">
        <Sidebar />
        {basket ? (
          <CartSection
            itemsInBasketFromApi={basket.items}
            favorites={favorites}
          />
        ) : (
          <p>Идет загрузка ...</p>
        )}
      </div>
    </HomeContainer>
  );
}
