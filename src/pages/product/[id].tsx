import HomeContainer from "@/components/HomeContainer/HomeContainer";
import ProductPage from "@/components/ProductPage/ProductPage";
import { GetStaticProps, GetStaticPaths } from "next";

export default function Product({ product, characteristics, posts, photos }: { 
  product: any, 
  characteristics: any[], 
  posts: any[], 
  photos: any[] 
}) {
  return (
    <HomeContainer>
      <ProductPage 
        product={product} 
        characteristics={characteristics} 
        posts={posts} 
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
  
  console.log("API Response:", data.requestItem);

  return { 
    props: { 
      product: data.requestItem, 
      characteristics: data.requestCharacteristics,
      posts: data.requestPosts,
      photos: data.requestPhoto 
    } 
  };
};
