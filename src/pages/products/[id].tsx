import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProductPage from "@/components/ProductPage/ProductPage";
import {  GetServerSideProps } from "next";
import { useProductById } from "../../shared/hooks/queries/useProductById";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";
import { getFavoritesInfo } from "@/shared/api/products";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ProductInfo } from "@/shared/types";
import { useUserStore } from "@/shared/store/auth";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  availability: boolean;
};

type Props = {
  productId: number;
};

export default function Product(props: Props) {
  const { productId } = props;
  const {product} = useProductById(productId);
  const { isAuthenticated } = useUserStore();
  const [favoritesItems, setFavoritesItems] = useState<Product[]>([]);

  const { data } = useQuery({
    queryKey: ["favoritesInfo"],
    queryFn: getFavoritesInfo,
  });
  const favorites = data?.likedItems ?? [];

  useEffect(() => {
      const favoritesItemsFormatted: Product[] = favorites.map(
        (fav: ProductInfo) => fav.item,
      );
      setFavoritesItems(favoritesItemsFormatted);
    }, [isAuthenticated]);


  return (
    <HomeContainer>
      {product ? <ProductPage
        product={product.item}
        characteristics={product.characteristics}
        roundRating={product.averageRating}
        quantityRatings={product.postsCount}
        photos={product.photos}
        favorites={favoritesItems}
      /> : <LoadingIcon />}
    </HomeContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const productId = parseInt(id as string, 10);
  if (isNaN(productId)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      productId,
    },
  };
};

