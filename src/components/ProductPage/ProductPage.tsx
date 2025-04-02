import {
    AdjustmentsHorizontalIcon,
  } from "@heroicons/react/24/outline";
  import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
  import { useState } from "react";
  import { inter, roboto } from "@/styles/fonts";
  import Image from 'next/image';
  import { Photos, TItems } from "@/shared/types";
  import { useRouter } from "next/router";
  export interface TypeRequest {
    items: TItems[] | null;
    photos: Photos[] | null;
  }
  
  export default function ProductPage({ items, photos }: TypeRequest) {
    const router = useRouter();
    const { id } = router.query;
    const categoryName = id
      ? typeof id === "string"
        ? "Очки " + id.charAt(0).toUpperCase() + id.slice(1)
        : ""
      : "Каталог";

    return (
      <div className="mx-auto max-w-[980px]">
        <Breadcrumbs className="md:pb-5 md:pt-0"/>
        <div className="relative flex flex-wrap justify-center gap-4 mb-8 md:rounded-xl md:bg-white md:p-6 md:shadow-custom">
          <div className="gap-5 md:flex md:justify-center">

          <div>
          <div className="w-[456px] h-[460px] bg-white rounded-lg overflow-hidden flex items-center justify-center">
            <Image 
              src="/images/product_for_dev.png" 
              alt="Очки классные" 
              width={456} 
              height={460} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-[97px] h-[96px] bg-gray-200 rounded-lg">
              <Image 
                src="/images/product_for_dev.png" 
                alt="Очки классные" 
                width={97} 
                height={96} 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="w-[97px] h-[96px] bg-gray-200 rounded-lg">
              <Image 
                src="/images/product_for_dev.png" 
                alt="Очки классные" 
                width={97} 
                height={96} 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="w-[97px] h-[96px] bg-gray-200 rounded-lg">
              <Image 
                src="/images/product_for_dev.png" 
                alt="Очки классные" 
                width={97} 
                height={96} 
                className="w-full h-full object-cover" 
              />
            </div>

            <div className="w-[97px] h-[96px] bg-gray-200 rounded-lg">
              <Image 
                src="/images/product_for_dev.png" 
                alt="Очки классные" 
                width={97} 
                height={96} 
                className="w-full h-full object-cover" 
              />
            </div>



          </div>


          </div>

            <main className="w-full max-w-[456px]">
              <div className="flex justify-between">
                <h1 className="font-bold text-[30px] leading-9 text-[#1F2937]">{categoryName}</h1> 

                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="flex items-center gap-2">
                    <Image 
                      className="w-8 h-8 text-[#2563EB] object-center object-contain" 
                      src="/images/Star.svg" 
                      alt="Рейтинг" 
                      width={32} 
                      height={32} 
                    />
                    <span className="font-bold text-[30px] leading-9 text-[#1F2937]">4.0</span>
                  </div>
                </div>
              
              </div>
              <div className="flex justify-end">
                <span className="mt-1 font-normal text-[14px] leading-5 text-[#6B7280]">125 оценок</span>
              </div>
             
              
              <div className="text-[#10B981] font-bold text-[30px] leading-9">10 000 ₽</div>


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

                <p className="font-normal text-[16px] leading-6 text-[#6B7280] self-end">Есть в наличии</p>
              </div>

              <p className="mt-4 font-bold text-[16px] leading-6 text-[#1F2937]">Описание</p>

              <p className="mt-4 font-normal text-[14px] leading-5 text-[#6B7280]">
                Описание Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Описание Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <h2 className="mt-4 font-bold text-[16px] leading-6 text-[#1F2937]">О товаре</h2>


              <div className="mt-[14px]">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-normal text-[12px] leading-4 text-[#6B7280]">Характеристика</span>
                  <span className="font-normal text-[16px] leading-6 text-[#1F2937]">Значение</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="font-normal text-[12px] leading-4 text-[#6B7280]">Характеристика</span>
                  <span className="font-normal text-[16px] leading-6 text-[#1F2937]">Значение</span>
                </div>
                <div className="flex justify-between border-b py-2">
                  <span className="font-normal text-[12px] leading-4 text-[#6B7280]">Характеристика</span>
                  <span className="font-normal text-[16px] leading-6 text-[#1F2937]">Значение</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-normal text-[12px] leading-4 text-[#6B7280]">Характеристика</span>
                  <span className="font-normal text-[16px] leading-6 text-[#1F2937]">Значение</span>
                </div>
              </div>
    
            </main>
          </div>
        </div>
      </div>
    );
  }
  