import { useEffect, useRef, useState } from "react";
import { ECProductCard } from "@/components/cards/product-card/ECProductCard";

const product = "/images/Product-172x172.jpg";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const products = [
    { name: "Классные очки", price: 10000, photo: product },
    { name: "Стильные часы", price: 5000, photo: product },
    { name: "Модный рюкзак", price: 15000, photo: product },
    { name: "Красивые наушники", price: 8000, photo: product },
    { name: "Классные очки", price: 2000, photo: product },
    { name: "Модная сумка", price: 12000, photo: product },
    { name: "Классные очки", price: 10000, photo: product },
    { name: "Стильные часы", price: 5000, photo: product },
    { name: "Модный рюкзак", price: 15000, photo: product },
    { name: "Красивые наушники", price: 8000, photo: product },
    { name: "Классные очки", price: 2000, photo: product },
    { name: "Модная сумка", price: 12000, photo: product },
  ];

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
      className="mt-5 flex gap-5 overflow-x-auto rounded-lg bg-white px-6 py-4 transition-all"
      ref={sliderRef}
      style={{ scrollBehavior: "smooth" }}
    >
      {products.map((product, index) => (
        <div
          key={index}
          className="mx-3 h-auto w-44 flex-shrink-0"
          onClick={() => scrollToSlide(index)}
        >
          <ECProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
