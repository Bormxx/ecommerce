import CatalogList from "@/components/CatalogList/CatalogList";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Sidebar from "@/components/Sidebar/Sidebar";
import Title from "@/components/Title/Title";
import { getFavoritesInfo } from "@/shared/api/products";
import { useBasket } from "@/shared/hooks/queries/useBasket";
import { useProtectedRoute } from "@/shared/hooks/useProtectedRoute";
import { useUserStore } from "@/shared/store/auth";
import { BasketItem, Product, ProductInfo } from "@/shared/types";
import { inter } from "@/styles/fonts";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { data } = useQuery({
    queryKey: ["favoritesInfo"],
    queryFn: getFavoritesInfo,
  });
  const favorites = data?.likedItems ?? null;
  const [textActiveCardsLayout, setTextActiveCardsLayout] =
    useState("Карточки");
  const [textNoActiveCardsLayout, setTextNoActiveCardsLayout] =
    useState("Список");
  const [variableList, setVariableList] = useState("standart");
  const { isAuthenticated } = useUserStore();
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const { basket } = useBasket();
  const [favoritesItems, setFavoritesItems] = useState<Product[] | null>(null);

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
    const favoritesItemsFormatted: Product[] = favorites
      ? favorites.map((fav: ProductInfo) => ({
          ...fav.item,
          photos: fav.photos ?? null,
        }))
      : null;
    setFavoritesItems(favoritesItemsFormatted);
  }, [isAuthenticated, basket, favorites]);
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
        <section className="flex p-5 md:pt-10">
          <Sidebar />
          <section className="mx-5 w-full">
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
              {favoritesItems && favoritesItems.length > 0 ? (
                <CatalogList
                  variable={variableList}
                  items={favoritesItems}
                  productsInBasket={basketItems}
                  favorites={favoritesItems}
                  setFavorites={setFavoritesItems}
                />
              ) : (
                <p className={`${inter.className} text-base`}>
                  Избранных товаров пока нет
                </p>
              )}
            </div>
          </section>
        </section>
      </HomeContainer>
    </ProtectedRoute>
  );
}
