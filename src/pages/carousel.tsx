import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import MiniCard from "../components/MiniCard/MiniCard";



type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

let itemsRequest: any = [];
const request: Promise<any> = new Promise((res, rej) => {
  fetch(`api/items`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Ошибка по адресу ${res.url}, статус ошибки ${res.status}`);
      } else {
        itemsRequest = res.json();
        // return res.json();
      }
})})

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  
  return (
    <div className="mt-10">
      <section className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {slides.map((index) => (
              <div className="embla__slide border" key={index}>
                {/* <MiniCard title={index} price={} img_url={} /> */}
                <div className="embla__slide__number">{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmblaCarousel;
