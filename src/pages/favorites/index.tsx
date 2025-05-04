/* eslint-disable react-hooks/rules-of-hooks */
import CatalogList from "@/components/CatalogList/CatalogList";
import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Sidebar from "@/components/Sidebar/Sidebar";
import Title from "@/components/Title/Title";
import { useProtectedRoute } from "@/shared/hooks/useProtectedRoute";
import { Photos, Product } from "@/shared/types";
import { inter } from "@/styles/fonts";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
export interface TypeRequest {
  items: Product[] | undefined;
  photos: Photos[] | null;
}
export default function favoritesPage({ items, photos }: TypeRequest) {
  const [textActiveCardsLayout, setTextActiveCardsLayout] =
    useState("Карточки");
  const [textNoActiveCardsLayout, setTextNoActiveCardsLayout] =
    useState("Список");
  const [variableList, setVariableList] = useState("standart");

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
                items={items}
                photos={photos}
                productsInBasket={[]}
              />
            </div>
          </section>
        </section>
      </HomeContainer>
    </ProtectedRoute>
  );
}

// TODO: Избавиться от getStaticProps

export async function getServerSideProps() {
  const itemsRes = await fetch("api/old/items");
  const itemsReq = await itemsRes.json();
  const items = itemsReq.request;
  const photosRes = await fetch("api/old/photos");
  const photosReq = await photosRes.json();
  const photos = photosReq.request;
  return {
    props: { items, photos },
  };
}
