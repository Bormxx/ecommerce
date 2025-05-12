import React, { ReactNode } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import SkeletonCard from "../MiniCard/SkeletonCard";

type PropType = {
  slides: ReactNode[];
};

const EmblaCarousel: React.FC<PropType> = ({ slides }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      slidesToScroll: 1,
      align: "start",
    },
    [Autoplay()],
  );

  return (
    <div className="flex">
      <section className="m-auto w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {slides.length > 0
              ? slides.map((slide, i) => (
                  <div
                    key={i}
                    className="flex-[0_0_50%] sm:flex-[0_0_33.3333%] md:flex-[0_0_25%] lg:flex-[0_0_16.6666%]"
                  >
                    {slide}
                  </div>
                ))
              : Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_50%] sm:flex-[0_0_33.3333%] md:flex-[0_0_25%] lg:flex-[0_0_16.6666%]"
                  >
                    <SkeletonCard variable="mini" />
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmblaCarousel;
