import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProductPage from "@/components/ProductPage/ProductPage";
import { GetStaticProps, GetStaticPaths } from "next";

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

export default function Product({ 
  product, 
  characteristics, 
  roundRating, 
  quantityRatings, 
  photos 
}: ProductPageProps) {
  return (
    <HomeContainer>
      <ProductPage 
        product={product} 
        characteristics={characteristics} 
        roundRating={roundRating}
        quantityRatings={quantityRatings} 
        photos={photos} 
      />
    </HomeContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://127.0.0.1:3000/api/products");
  const data = await res.json();
  const products: Product[] = data.items;

  if (!Array.isArray(products)) {
    throw new Error("Expected an array but got: " + JSON.stringify(products));
  }

  return {
    paths: products.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async ({ params }) => {
  const res = await fetch(`http://127.0.0.1:3000/api/products/${params?.id}`);
  const data = await res.json();
  
  return {
    props: {
      product: data.item || null,
      characteristics: data.characteristics || [],
      roundRating: data.averageRating || 0.0,
      quantityRatings: data.postsCount || 0,
      photos: data.photos || [],
    },
  };
};
