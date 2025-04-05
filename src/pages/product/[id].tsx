import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProductPage from "@/components/ProductPage/ProductPage";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Product({ product, characteristics, roundRating, quantityRatings, photos }: { 
  product: any, 
  characteristics: any[], 
  roundRating: any[], 
  quantityRatings: any[], 
  photos: any[] 
}) {
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
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();
  const products = data.request;

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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3000/api/products/${params?.id}`);
  const data = await res.json();
  
  console.log("API Response:", data);

  return { 
    props: { 
      product: data.requestItem || {}, 
      characteristics: data.requestCharacteristics || [],
      roundRating: data.roundRating || 0.0,
      quantityRatings: data.quantityRatings || 0,
      photos: data.requestPhoto || []
    } 
  };
};
