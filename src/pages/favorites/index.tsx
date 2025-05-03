/* eslint-disable react-hooks/rules-of-hooks */
import CatalogList from "@/components/CatalogList/CatalogList";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Sidebar from "@/components/Sidebar/Sidebar";
import Title from "@/components/Title/Title";
import { getFavoritesInfo } from "@/shared/api/products";
import { useBasket } from "@/shared/hooks/queries/useBasket";
import { useProtectedRoute } from "@/shared/hooks/useProtectedRoute";
import { useUserStore } from "@/shared/store/auth";
import { BasketItem } from "@/shared/types";
import { inter } from "@/styles/fonts";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { data: favorites } = useQuery({
    queryKey: ["favoritesInfo"],
    queryFn: getFavoritesInfo,
  });

  const [textActiveCardsLayout, setTextActiveCardsLayout] =
    useState("Карточки");
  const [textNoActiveCardsLayout, setTextNoActiveCardsLayout] =
    useState("Список");
  const [variableList, setVariableList] = useState("standart");
  const { isAuthenticated } = useUserStore();
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const { basket } = useBasket();

  useEffect(() => {
    console.log(favorites);
    if (isAuthenticated) {
      console.log("Ттут");

      if (basket) {
        setBasketItems(basket.items);
      } else {
        setBasketItems([]);
      }
    } else {
      setBasketItems([]);
    }
  }, [isAuthenticated, basket]);

  function handleClickCardsLayout() {
    if (textNoActiveCardsLayout === "Список") {
      setTextActiveCardsLayout("Список");
      setTextNoActiveCardsLayout("Карточки");
      setVariableList("horizontal");
    } else {
      setTextActiveCardsLayout("Карточки");
      setTextNoActiveCardsLayout("Список");
      setVariableList("standart");
    }
  }
  return (
    <ProtectedRoute protection={useProtectedRoute}>
      <HomeContainer>
        <section className="flex">
          <Sidebar />
          <section className="ml-5 w-full">
            <div className="flex justify-between">
              <Title text="Избранное" />
              <Menu>
                <MenuButton
                  className={`${inter.className} flex w-32 items-center justify-between rounded-[4px] border border-gray-400 bg-white px-3 py-1 text-sm`}
                >
                  {textActiveCardsLayout}
                  <ChevronDownIcon
                    width={24}
                    height={24}
                    className="text-gray-500"
                  />
                </MenuButton>
                <MenuItems
                  anchor="bottom"
                  className="flex flex-col rounded-lg bg-white shadow-custom"
                >
                  <MenuItem>
                    <button
                      onClick={handleClickCardsLayout}
                      className="flex w-32 px-3 py-1 data-[focus]:bg-gray-100"
                    >
                      {textNoActiveCardsLayout}
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>

            <div className="mt-4 w-full rounded-lg bg-white">
              <CatalogList
                variable={variableList}
                items={[]}
                photos={[]}
                productsInBasket={basketItems}
              />
            </div>
          </section>
        </section>
      </HomeContainer>
    </ProtectedRoute>
  );
}

// export async function getStaticProps() {
//   const favoritesApi = await fetch(
//     "http://localhost:3000/api/products/favorites",
//   );
//   const favoritesReq = await favoritesApi.json();
//   // const favorites = favoritesReq.request;
//   return {
//     // favoritesReq,
//     props: { favoritesReq },
//   };
// }
