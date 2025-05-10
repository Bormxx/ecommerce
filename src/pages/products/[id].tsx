import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProductPage from "@/components/ProductPage/ProductPage";
import {  GetServerSideProps } from "next";
import { useProductById } from "../../shared/hooks/queries/useProductById";
import LoadingIcon from "../../components/LoadingIcon/LoadingIcon";

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
  return (
    <HomeContainer>
      {product ? <ProductPage
        product={product.item}
        characteristics={product.characteristics}
        roundRating={product.averageRating}
        quantityRatings={product.postsCount}
        photos={product.photos}
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

