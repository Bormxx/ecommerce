import { useEffect, useState, useRef } from "react";
import MiniCard from "../MiniCard/MiniCard";
const product = "/images/Product-with-shadow.png";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  // const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
            title={product.title}
            price={product.price}
            img_url={product.img_url}
            variable="mini"
          />
        </div>
      ))}
    </div>
  );
}
