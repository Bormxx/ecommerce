import { useEffect, useState, useRef } from "react";
import MiniCard from "../MiniCard/MiniCard";
import product from "../../images/Product-172x172.jpg";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  useEffect(() => {
    slideIntervalRef.current = setInterval(nextSlide, 2000);

    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth =
        sliderRef.current.children[0].getBoundingClientRect().width;
      sliderRef.current.scrollLeft = currentIndex * slideWidth;
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
          <MiniCard
            title={product.title}
            price={product.price}
            img_url={product.img_url}
          />
        </div>
      ))}
    </div>
  );
}
