import { inter, roboto } from "@/app/fonts";
import { useState } from "react";

export default function OrderHistory() {
  const [showOrders, setShowOrders] = useState(false);

  const actionShowButton = () => { setShowOrders(prev => !prev) }

  return (
    <div className='flex flex-col p-5'>
      <h1 className={`${roboto.className} text-2xl font-bold`}>История заказов</h1>
      {/*Список*/}
      <div className='flex flex-col gap-4 '>
        {/*Карточка*/}
        <div className='flex flex-col gap-4 p-4 rounded-xl shadow-lg min-w-[580px]'>
          <div className='flex justify-between border-b border-gray-400'>
            {/*Секция с информацией*/}
            <div className='flex flex-col gap-2'>
              {/*Время*/}
              <div className='flex items-end gap-2'>
                <p className={`${roboto.className} text-xl font-bold text-gray-800`}>От 1 февраля 2024</p>
                <p className={`${inter.className} text-base font-normal text-gray-800`}>№ 0032</p>
              </div>
              {/*Статус*/}
              <div className='flex gap-2'>
                <p className={`${inter.className} text-base font-bold text-emerald-500`}>Получен</p>
                <p className={`${inter.className} text-small font-normal text-gray-500`}>в пункте выдачи</p>
              </div>
            </div>
            {/*Цена*/}
            <div className='flex flex-col items-end gap-2 mb-4'>
              <p className={`${roboto.className} text-2xl font-bold text-gray-800`}>15 000 ₽</p>
              <p className={`${inter.className} text-xs font-normal text-gray-500`}>Оплачено картой</p>
            </div>
          </div>
          {/*Список товаров*/}
          { showOrders && <div className='border-b border-gray-400 pb-4'>Будет список</div> }
          <button className={`${inter.className} mx-auto text-base font-normal text-blue-600`} onClick={() => actionShowButton()}>Показать товары в корзине</button>
        </div>
      </div>
    </div>
  );
}
