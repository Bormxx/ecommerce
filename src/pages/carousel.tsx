import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import MiniCard from "../components/MiniCard/MiniCard";
import axios from "axios";
import placeHolderImage from '../../public/images/Product-172x172.jpg'



type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

let itemsArray: object[] = []
export async function getItems() {
  const itemsRequest = await axios.get("api/items");
  itemsArray = itemsRequest.data.request
}
getItems();


const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  console.log(itemsArray[0])
  
  
  return (
    <div className="mt-10">
      <section className="embla">
        <div className="embla__viewport pl-5" ref={emblaRef}>
          <div className="embla__container ">
            {slides.map((index) => (
              <div className="embla__slide " key={index}>
                <MiniCard
                  key={index}
                  title={'itemsArray[index].title'}
                  price={Number(4000)}
                  img_url={placeHolderImage}
                  variable="standart"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmblaCarousel;
