import React, { ReactNode } from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

type PropType = {
  slides: ReactNode[];
  options?: EmblaOptionsType;
};


const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()]);
  
  return (
    <div className="mt-10 flex">
      <section className="carousel1 m-auto">
        <div className="w-[1180px] overflow-hidden" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((index, i) => (
              <div className="embla__slide" key={i}>
                {index}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmblaCarousel;
