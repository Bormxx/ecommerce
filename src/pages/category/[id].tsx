/* eslint-disable react-hooks/rules-of-hooks */
import CategoryPage from "@/components/CategoryPage/CategoryPage";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import { BasketItem } from "@/shared/types";
import { useAuth } from "../../shared/hooks/useAuth";
import { useBasket } from "@/shared/hooks/queries/useBasket";
import { useProducts } from "@/shared/hooks/queries/useProducts";
import { useEffect, useState } from "react";
import { useUserStore } from "@/shared/store/auth";

export default function category() {
  const { products } = useProducts();
  const { isAuthenticated } = useUserStore();
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const { basket } = useBasket();
  useAuth();
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

  return (
    <HomeContainer>
      <CategoryPage
        items={products}
        photos={[]}
        itemsInBasketFromApi={basketItems}
      />
    </HomeContainer>
  );
}
// export async function getStaticPath() {
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
