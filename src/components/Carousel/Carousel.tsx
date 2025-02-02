// Carousel.tsx
import { useEffect, useState, useRef } from "react";
import MiniCard from "../MiniCard/MiniCard"; // Импорт по умолчанию
import product from "../../images/Product-172x172.jpg";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0); // Текущий индекс слайда
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

  // Функция для прокрутки слайдов
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length); // Цикличное увеличение индекса
  };

  // Эффект для автопрокрутки
  useEffect(() => {
    slideIntervalRef.current = setInterval(nextSlide, 2000); // Прокрутка каждые 3 секунды

    return () => {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current); // Очистка интервала при размонтировании
    };
  }, []);

  // Функция для ручного перехода к слайду
  const scrollToSlide = (index: number) => {
    setCurrentIndex(index); // Устанавливаем текущий индекс вручную
  };

  // Автоматическая прокрутка слайдов при изменении индекса
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth =
        sliderRef.current.children[0].getBoundingClientRect().width; // Получаем ширину одного слайда
      sliderRef.current.scrollLeft = currentIndex * slideWidth; // Прокручиваем контейнер слайдов
    }
  }, [currentIndex]);

  return (
    <div className="mt-[20px] rounded-[8px] bg-white px-[24px] py-[16px]">
      <div
        className="flex overflow-hidden transition-all" // Используем transition-all для плавной анимации
        ref={sliderRef}
        style={{ scrollBehavior: "smooth" }} // Добавляем плавную прокрутку
      >
        {products.map((product, index) => (
          <div
            key={index}
            className="mx-[10px] h-auto w-[172px] flex-shrink-0"
            onClick={() => scrollToSlide(index)} // Ручной клик для перехода на слайд
          >
            <MiniCard
              title={product.title}
              price={product.price}
              img_url={product.img_url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
