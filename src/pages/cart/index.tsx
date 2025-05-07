import HomeContainer from "@/components/HomeContainer/HomeContainer";
import Sidebar from "@/components/Sidebar/Sidebar";
import CartSection from "@/components/CartSection/CartSection";
import { useBasket } from "@/shared/hooks/queries/useBasket";

export default function Cart() {
  const { basket } = useBasket();
  console.log(basket);
  return (
    <HomeContainer>
      <div className="flex h-[90vh] pt-10">
        <Sidebar />
        {basket ? (
          <CartSection itemsInBasketFromApi={basket.items} />
        ) : (
          <p>Идет загрузка ...</p>
        )}
      </div>
    </HomeContainer>
  );
}
