  import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
  import Image from 'next/image';
  import { useRouter } from "next/router";
  import { useState } from "react";

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
    const router = useRouter();
    const { id } = router.query;
  
    console.log("Product ID:", id);
    console.log("Product Data:", product);
    console.log("Characteristics:", characteristics[0]);
    console.log("RoundRating:", roundRating);
    console.log("QuantityRatings:", quantityRatings);
    console.log("Photos:", photos);

    const defaultMainPhoto = photos.find(p => p.isMainPhoto)?.photoLink || "/images/product_for_dev.png";
    const [mainPhotoLink, setMainPhotoLink] = useState<string>(defaultMainPhoto);
    const nonMainPhotos = photos.filter(photo => !photo.isMainPhoto).slice(0, 4);
    const availabilityProduct = product.availability ? "Есть в наличии" : "Нет в наличии";
    const characteristicsList = characteristics[0]
    ? {
        "Материал оправы": characteristics[0].frameMatherials,
        "Линзы": characteristics[0].linzeEffects,
        "Материал линз": characteristics[0].linzeMatherials,
        "Тип линз": characteristics[0].linzeTypes,
        "Наличие УФ фильтра": characteristics[0].linzeUVDefences,
      }
    : {};

    const categoryName = id
      ? typeof id === "string"
        ? "Очки " + id.charAt(0).toUpperCase() + id.slice(1)
        : ""
      : "Каталог";

      console.log("categoryName:", categoryName);

    return (
      <div className="mx-auto max-w-[980px]">
        <Breadcrumbs className="md:pb-5 md:pt-0"/>
        <div className="relative flex flex-wrap justify-center gap-4 mb-8 md:rounded-xl md:bg-white md:p-6 md:shadow-custom">
          <div className="gap-5 md:flex md:justify-center">

            <div>
              <div className="w-[456px] h-[460px] bg-white rounded-lg overflow-hidden flex items-center justify-center">
                <Image 
                  src={mainPhotoLink}
                  alt="Основная фотография очков" 
                  width={456} 
                  height={460} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="flex justify-center gap-2 mt-4">
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
                <h1 className="font-bold text-[30px] leading-9 text-[#1F2937]">{product.title}</h1> 

                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-2">
                    <Image 
                      className="w-8 h-8 text-[#2563EB] object-center object-contain" 
                      src="/images/Star.svg" 
                      alt="Рейтинг" 
                      width={32} 
                      height={32} 
                    />
                    <span className="font-bold text-[30px] leading-9 text-[#1F2937]">{roundRating}</span>
                  </div>
                </div>
              
              </div>
              <div className="flex justify-end">
                <span className="mt-1 font-normal text-[14px] leading-5 text-[#6B7280]">{quantityRatings} оценок</span>
              </div>
             
              
              <div className="text-[#10B981] font-bold text-[30px] leading-9">{product.price} ₽</div>


              <div className="mt-4 flex justify-between gap-4">

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

              <p className="mt-4 font-bold text-[16px] leading-6 text-[#1F2937]">Описание</p>

              <p className="mt-4 font-normal text-[14px] leading-5 text-[#6B7280]">
                {product.description}
              </p>

              <h2 className="mt-4 font-bold text-[16px] leading-6 text-[#1F2937]">О товаре</h2>


              <div className="mt-[14px]">
                {Object.entries(characteristicsList).map(([key, value], index, array) => (
                  <div
                    key={key}
                    className={`flex justify-between ${
                      index === array.length - 1 ? 'pt-2' : index === 0 ? 'border-b pb-2': 'border-b py-2'
                    }`}
                  >
                    <span className="font-normal text-[12px] leading-4 text-[#6B7280]">{key}</span>
                    <span className="font-normal text-[16px] leading-6 text-[#1F2937]">{value}</span>
                  </div>
                ))}
              </div>
    
            </main>
          </div>
        </div>
      </div>
    );
  }
  