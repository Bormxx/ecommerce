  import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
  import Image from 'next/image';
  import { useState } from "react";
  import { getRatingsWord } from "@/shared/utils/frontend/cartHelpers";

  type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    availability: boolean;
  };
  
  type Characteristic = {
    id: number;
    itemId: number;
    frameMatherials: string;
    linzeMatherials: string;
    linzeTypes: string;
    linzeUVDefences: string;
    linzeEffects: string;
  };
  
  type Photo = {
    id: number;
    itemId: number;
    photoLink: string;
    isMainPhoto: boolean;
  };
  
  type ProductPageProps = {
    product: Product;
    characteristics: Characteristic[];
    roundRating: number;
    quantityRatings: number;
    photos: Photo[];
  };

  export default function ProductPage({
    product,
    characteristics,
    roundRating,
    quantityRatings,
    photos,
  }: ProductPageProps) {

    const defaultMainPhoto = photos.find(p => p.isMainPhoto)?.photoLink || "/images/product_for_dev.png";
    const [mainPhotoLink, setMainPhotoLink] = useState<string>(defaultMainPhoto);
    const nonMainPhotos = photos.filter(photo => !photo.isMainPhoto).slice(0, 4);
    const availabilityProduct = product.availability ? "Есть в наличии" : "Нет в наличии";
    const ratingsWord = getRatingsWord(quantityRatings);

    const characteristicsList = characteristics[0]
    ? {
        "Материал оправы": characteristics[0].frameMatherials,
        "Линзы": characteristics[0].linzeEffects,
        "Материал линз": characteristics[0].linzeMatherials,
        "Тип линз": characteristics[0].linzeTypes,
        "Наличие УФ фильтра": characteristics[0].linzeUVDefences,
      }
    : {};

    return (
      <div className="mx-auto max-w-[980px]">
        <Breadcrumbs className="hidden md:block md:pb-5 md:pt-0"/>
        <div className="relative flex flex-wrap justify-center gap-4 mb-4 md:mb-8 md:rounded-xl md:bg-white md:p-6 md:shadow-custom">


          <div className="px-5 md:px-0 gap-5 flex flex-col items-center md:items-start md:flex-row md:justify-center">

            <div>
              <div className="min-w-[335px] min-h-[288px] bg-white rounded-lg overflow-hidden flex items-center justify-center mt-5 md:mt-0 mb-3 md:mb-0">
                <Image 
                  src={mainPhotoLink}
                  alt="Основная фотография очков" 
                  width={456} 
                  height={460} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="hidden md:flex justify-center gap-2 mt-4">
                {nonMainPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="w-[97px] h-[96px] bg-gray-200 rounded-lg hover:cursor-pointer"
                    onClick={() => setMainPhotoLink(photo.photoLink)}
                  >
                    <Image
                      src={photo.photoLink}
                      alt="Другие фотографии очков"
                      width={97}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <main className="w-full max-w-[456px]">
              <div className="flex justify-between">
                <h1 className="font-bold text-[24px] md:text-[30px] leading-8 md:leading-9 text-[#1F2937]">{product.title}</h1> 

                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-2">
                    <Image 
                      className="w-4 h-4 md:w-8 md:h-8 text-[#2563EB] object-center object-contain" 
                      src="/images/Star.svg" 
                      alt="Рейтинг" 
                      width={32} 
                      height={32} 
                    />
                    <span className="font-bold text-[24px] md:text-[30px] leading-8 md:leading-9 text-[#1F2937]">{roundRating}</span>
                  </div>
                </div>
              
              </div>
              <div className="flex justify-end">
                <span className="mt-0 md:mt-1 font-normal text-[14px] leading-5 text-[#6B7280]">{ratingsWord}</span>
              </div>
             
              <div className="text-[#10B981] font-bold text-[24px] md:text-[30px] leading-8 md:leading-9">{product.price} ₽</div>

              <div className="hidden md:flex mt-4 justify-between gap-4">

                <div className="flex gap-1">
              
                  <button className="bg-[#1E40AF] w-[180px] h-[40px] text-white rounded-[6px] flex items-center justify-center">
                    <Image 
                      src="/images/button_bag.svg" 
                      alt="Корзина" 
                      width={24} 
                      height={24} 
                      className="w-6 h-6"
                    />
                  </button>

                  <button className="flex w-[40px] h-[40px] items-center justify-center">
                    <Image 
                      className="w-5 h-[18px] text-[#1E40AF] object-center object-contain" 
                      src="/images/Heart.svg" 
                      alt="Лайк" 
                      width={20} 
                      height={18} 
                    />
                  </button>
                </div>

                <p className="font-normal text-[16px] leading-6 text-[#6B7280] self-end">{availabilityProduct}</p>
              </div>

              <p className="mt-3 md:mt-4 font-bold text-[14px] md:text-[16px] leading-5 md:leading-6 text-[#1F2937]">Описание</p>
              <p className="mt-1 md:mt-4 font-normal text-[12px] md:text-[14px] leading-4 md:leading-5 text-[#6B7280]">
                {product.description}
              </p>
              <h2 className="mt-3 md:mt-4 font-bold text-[14px] md:text-[16px] leading-5 md:leading-6 text-[#1F2937]">О товаре</h2>

              <div className="mt-[6px] md:mt-[14px]">
                {Object.entries(characteristicsList).map(([key, value], index, array) => (
                  <div
                    key={key}
                    className={`flex justify-between ${
                      index === array.length - 1 ? 'pt-[6px] md:pt-2' : index === 0 ? 'border-b pb-[6px] md:pb-2': 'border-b py-[6px] md:py-2'
                    }`}
                  >
                    <span className="font-normal text-[12px] leading-4 text-[#6B7280]">{key}</span>
                    <span className="font-normal text-[14px] md:text-[16px] leading-5 md:leading-6 text-[#1F2937]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="block md:hidden mt-4 gap-4">

                <div className="flex justify-between gap-0">
              
                  <button className="bg-[#1E40AF] flex-1 h-[40px] text-white rounded-[6px] flex items-center justify-center">
                    {product.availability ? 
                    <Image 
                      src="/images/button_bag.svg" 
                      alt="Корзина" 
                      width={24} 
                      height={24} 
                      className="w-6 h-6"
                    /> : 
                    "Нет в наличии"
                    }
                  </button>

                  <button className="flex w-[40px] h-[40px] items-center justify-center">
                    <Image 
                      className="w-5 h-[18px] text-[#1E40AF] object-center object-contain" 
                      src="/images/Heart.svg" 
                      alt="Лайк" 
                      width={20} 
                      height={18} 
                    />
                  </button>
                </div>
              </div>
    
            </main>
          </div>
        </div>
      </div>
    );
  }
  