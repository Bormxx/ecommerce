import { useEffect, useState, useRef } from "react";
import MiniCard from "../MiniCard/MiniCard";
const product = "/images/Product-172x172.jpg";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  // const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const products = [
    { title: "Классные очки", price: 10000, img_url: product, id: 1112 },
    { title: "Стильные часы", price: 5000, img_url: product, id: 1113 },
    { title: "Модный рюкзак", price: 15000, img_url: product, id: 1114 },
    { title: "Красивые наушники", price: 8000, img_url: product, id: 1115 },
    { title: "Классные очки", price: 2000, img_url: product, id: 1116 },
    { title: "Модная сумка", price: 12000, img_url: product, id: 1117 },
    { title: "Классные очки", price: 10000, img_url: product, id: 1118 },
    { title: "Стильные часы", price: 5000, img_url: product, id: 1119 },
    { title: "Модный рюкзак", price: 15000, img_url: product, id: 11110 },
    { title: "Красивые наушники", price: 8000, img_url: product, id: 11111 },
    { title: "Классные очки", price: 2000, img_url: product, id: 11112 },
    { title: "Модная сумка", price: 12000, img_url: product, id: 11113 },
  ];

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  // };

  useEffect(() => {
    // slideIntervalRef.current = setInterval(nextSlide, 2000);
    // return () => {
    //   if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    // };
  }, []);

  const scrollToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth =
        sliderRef.current.children[0].getBoundingClientRect().width;

      // Сдвиг карусели по индексу
      sliderRef.current.scrollTo({
        left: currentIndex * slideWidth,
        behavior: "smooth", // Для плавного сдвига
      });
    }
  }, [currentIndex]);

  return (
    <div
      className="flex gap-2 overflow-x-auto rounded-lg bg-white py-4 transition-all md:gap-5 md:px-6"
      ref={sliderRef}
      style={{ scrollBehavior: "smooth" }}
    >
      {products.map((product, index) => (
        <div
          className="w-[170px]"
          key={index}
          onClick={() => scrollToSlide(index)}
        >
          <MiniCard
            key={index}
            itemId={product.id}
            title={product.title}
            price={product.price}
            img_url={product.img_url}
            variable="mini"
            productDetail="/images/Product-172x172.jpg"
          />
        </div>
      ))}
    </div>
  );
}
