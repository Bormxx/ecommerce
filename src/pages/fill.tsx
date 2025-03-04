import axios from "axios";
import EmblaCarousel from "./carousel";
import filling from "./filling"
import { EmblaOptionsType } from "embla-carousel";
import { number } from "zod";

// Заполняем таблицу с пользователями
const usersUrl = 'api/users'
const usersValue = [
  {
    name: "Иван",
    surname: "Иванов",
    email: "ivan@ya.ru",
    password: "12345678",
  },
  {
    name: "Геннадий",
    surname: "Геннадьев",
    email: "gena@ya.ru",
    password: "12345678",
  },
  {
    name: "Пётр",
    surname: "Петров",
    email: "petr@ya.ru",
    password: "12345678",
  },
  {
    name: "Владимир",
    surname: "Владимиров",
    email: "vova@ya.ru",
    password: "12345678",
  },
  {
    name: "Михаил",
    surname: "Михайлов",
    email: "michael@ya.ru",
    password: "12345678",
  },
  {
    name: "Фёдор",
    surname: "Фёдоров",
    email: "fedor@ya.ru",
    password: "12345678",
  },
];

// Заполняем таблицу с товарами
const itemsUrl = 'api/items'
const itemsValue = [
  {
    title: "Очки 1",
    price: 10000,
    description: "Повседневные очки",
    availability: true,
  },
  {
    title: "Очки 2",
    price: 15000,
    description: "Повседневные очки",
    availability: true,
  },
  {
    title: "Очки 3",
    price: 10000,
    description: "Повседневные очки",
    availability: true,
  },
  {
    title: "Очки 4",
    price: 3000,
    description: "Повседневные очки эконом-класса",
    availability: true,
  },
  {
    title: "Очки 5",
    price: 1900,
    description: "Повседневные очки эконом-класса",
    availability: true,
  },
  {
    title: "Очки 6",
    price: 10500,
    description: "Повседневные очки",
    availability: true,
  },
  {
    title: "Очки 7",
    price: 12300,
    description: "Повседневные очки",
    availability: true,
  },
  {
    title: "Очки 8",
    price: 14000,
    description: "Повседневные очки",
    availability: true,
  },
  {
    title: "Очки 9",
    price: 9200,
    description: "Повседневные очки",
    availability: true,
  },
  {
    title: "Очки 10",
    price: 2400,
    description: "Повседневные очки эконом-класса",
    availability: true,
  },
  {
    title: "Очки 11",
    price: 90200,
    description: "Повседневные очки премиум-класса",
    availability: true,
  },
  {
    title: "Очки 12",
    price: 2500,
    description: "Повседневные очки эконом-класса",
    availability: true,
  },
];

// Заполняем таблицу с корзинами
// Берём данные из таблицы товаров и генерируем корзины с рандомными значениями товаров
// Берём данные из таблицы пользователей и генерируем корзины с рандомными значениями товаров

const basketUrl: string = 'api/basket'
const basketValue: object[] = []
const basketSize: number = 11; // Размер массива с корзинами
const maxItemsInBasket: number = 4; // Максимальное количество одного товара в корзине

async function fillingBasket() {
  for (let i = 0; i < basketSize; i++) {
    let userId = await getRandomUser();
    let itemId = await getRandomItem();
    let flag: boolean = true // Даёт разрешение на добавление корзины в массив basketValue
    basketValue.map((item: any) => {
      if (item.userId !== userId && item.itemId !== itemId ) {
        // Если в массиве basketValue нет корзины с таким userId и itemId, то flag = true
        flag = true
      } else if (item.userId === userId && item.itemId === itemId) { 
        // Если в массиве basketValue есть корзина с таким userId и itemId, то flag = false
        flag = false;
      }
    });
    // Если flag = true, то добавляем в массив basketValue объект
    if (flag === true || basketValue.length === 0) {
      basketValue.push({
        userId: userId,
        itemId: itemId,
        quantity: Math.floor(Math.random() * (maxItemsInBasket - 1 + 1)) + 1,
      });
    }
  }
  filling(basketUrl, basketValue);
}

async function getRandomUser() {
  const response = await axios.get('api/users');
  const users = response.data.request;
  let result = Math.floor(Math.random() * users.length);
  return users[result].id;
}

async function getRandomItem() {
  const response = await axios.get('api/items');
  const items = response.data.request;
  let result = Math.floor(Math.random() * items.length);
  return items[result].id;
}



// Получаем случайного пользователяс с id > 0
// Для корзины пользователи могут повторяться
// function getRandomUser() {
//   let result = Math.floor(Math.random() * usersValue.length);
//   if (result === 0) {
//     while (result === 0) {
//       result = Math.floor(Math.random() * usersValue.length)
//     };
//   }
//   return result;
// }

// // Получаем случайный товар, с условием что товар не повторяется в корзине и c id > 0
// function getRandomItems(count: number, max: number) {
//   const result: number[] = [];
//   while (result.length < count) {
//     let randomNumber: number = Math.floor(Math.random() * max);
//     if (!result.includes(randomNumber)) {
//       if(randomNumber === 0) {
//         for(let i = 0; i < 1; i++) {
//             randomNumber = Math.floor(Math.random() * max);
//             if (randomNumber === 0) {i=0};
//         }
//       }
//       result.push(randomNumber);
//     }
//   };
//   return result;
// }

// // Функция заполнения таблицы данными
// function fillingBasket() {
//   const arr = getRandomItems(11, itemsValue.length - 1);
  
//   for (let i = 0; i < 11; i++) {
//     basketValue.push({
//       userId: getRandomUser(),
//       itemId: arr[i],
//       quantity: Math.floor(Math.random() * 4) + 1,
//     });
//   }
//   return basketValue;
// }

// // Вызываем функцию заполнения таблицы данными
// fillingBasket();

const OPTIONS: EmblaOptionsType = { align: "start", loop: true };
const SLIDE_COUNT = 7;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function fill() {
  return (
    <div className="grid">
      <div className="m-auto mt-10">
        <img src="images/avatar.png" className="w-32 h-32 rounded-full" alt="avatar" />
      </div>
      <div className="m-auto mt-10">
        <button className="
          px-5 
          py-3 
          text-xl 
          text-white 
          font-bold 
          bg-blue-400 
          rounded-xl"
          onClick={() => filling(usersUrl, usersValue)}
        >Заполнить таблицу пользователей</button>
      </div>
      <div className="m-auto mt-10">
        <button className="
          px-5 
          py-3 
          text-xl 
          text-white 
          font-bold 
          bg-blue-400 
          rounded-xl"
          onClick={() => filling(itemsUrl, itemsValue)}
        >Заполнить таблицу товаров</button>
      </div>
      <div className="m-auto mt-10">
        <button className="
          px-5 
          py-3 
          text-xl 
          text-white 
          font-bold 
          bg-blue-400 
          rounded-xl"
          onClick={() => {
            // filling(basketUrl, basketValue)
            fillingBasket();
            // getRandomUser()
            // getRandomUser().then((res) => {
            //   console.log(res.request);
            //   res.request.map((item) => console.log(item.id))
            // })
          }}
        >Заполнить таблицу корзин</button>
      </div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  )
}
