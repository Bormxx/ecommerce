import { useEffect, useState, useRef, ReactElement } from "react";

type Props = {
  children: ReactElement | ReactElement[];
};

export default function Carousel({ children }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sliderRef.current || sliderRef.current.children.length === 0) return;

    const slideWidth = sliderRef.current.children[0].getBoundingClientRect().width;
    sliderRef.current.scrollTo({
      left: currentIndex * slideWidth,
      behavior: "smooth",
    });
  }, [currentIndex]);

  return (
    <div
      ref={sliderRef}
      className="mt-5 flex gap-5 overflow-x-auto rounded-lg bg-white px-6 py-4 transition-all"
      style={{ scrollBehavior: "smooth" }}
    >
      {children}
    </div>
  );
}
