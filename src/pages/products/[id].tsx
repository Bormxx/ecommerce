import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProductPage from "@/components/ProductPage/ProductPage";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import { useProductById } from "../../shared/hooks/queries/useProductById";
import { useEffect } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  availability: boolean;
};

type Characteristic = {
  id: number;
  itemId: number;
  frameMatherials: string;
  linzeMatherials: string;
  linzeTypes: string;
  linzeUVDefences: string;
  linzeEffects: string;
};

type Photo = {
  id: number;
  itemId: number;
  photoLink: string;
  isMainPhoto: boolean;
};

type ProductPageProps = {
  product: Product;
  characteristics: Characteristic[];
  roundRating: number;
  quantityRatings: number;
  photos: Photo[];
};

type Props = {
  productId: number;
};

// export type ProductInfo = {
//   item: Product;
//   photos: Photo[];
//   characteristics: Characteristic[];
//   posts: Post[];
//   averageRating: number;
//   postsCount: number;
// };

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
      /> : <h1>Product not found</h1>}
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   const res = await fetch("http://127.0.0.1:3000/api/products");
//   const data = await res.json();
//   const products: Product[] = data.items;

//   if (!Array.isArray(products)) {
//     throw new Error("Expected an array but got: " + JSON.stringify(products));
//   }

//   return {
//     paths: products.map((product) => ({
//       params: { id: product.id.toString() },
//     })),
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
//   const res = await fetch(`http://127.0.0.1:3000/api/products/${params?.id}`);
//   const data = await res.json();
  
//   return {
//     props: {
//       product: data.item || null,
//       characteristics: data.characteristics || [],
//       roundRating: data.averageRating || 0.0,
//       quantityRatings: data.postsCount || 0,
//       photos: data.photos || [],
//     },
//   };
// };
