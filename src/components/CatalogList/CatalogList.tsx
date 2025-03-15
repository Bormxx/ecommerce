import MiniCard from "../MiniCard/MiniCard";
const product = "/images/Product-with-shadow.png";
type CatalogListProps = {
  variable: string;
};

export default function CatalogList({ variable }: CatalogListProps) {
  const products = [
    { title: "Классные очки", price: 10000, img_url: product },
    { title: "Стильные часы", price: 5000, img_url: product },
    { title: "Модный рюкзак", price: 15000, img_url: product },
    { title: "Красивые наушники", price: 8000, img_url: product },
    { title: "Классные очки", price: 2000, img_url: product },
    { title: "Модная сумка", price: 12000, img_url: product },
    { title: "Классные очки", price: 10000, img_url: product },
    { title: "Стильные часы", price: 5000, img_url: product },
    { title: "Модный рюкзак", price: 15000, img_url: product },
    { title: "Красивые наушники", price: 8000, img_url: product },
    { title: "Классные очки", price: 2000, img_url: product },
    { title: "Модная сумка", price: 12000, img_url: product },
  ];
  return (
    <section
      className={`grid-list w-full gap-2 md:gap-5 ${variable === "horizontal" ? "flex flex-col" : "grid"}`}
    >
      {products.map((product, index) => (
        <MiniCard
          key={index}
          title={product.title}
          price={product.price}
          img_url={product.img_url}
          variable={variable}
        />
      ))}
    </section>
  );
}
