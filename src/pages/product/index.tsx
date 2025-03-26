import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProductPage from "@/components/ProductPage/ProductPage";
import { Photos, TItems } from "@/shared/types";

export interface TypeRequest {
  items: TItems[] | null;
  photos: Photos[] | null;
}
export default function Product({ items, photos }: TypeRequest) {
  return (
    <HomeContainer>
      <ProductPage items={items} photos={photos} />
    </HomeContainer>
  );
}
