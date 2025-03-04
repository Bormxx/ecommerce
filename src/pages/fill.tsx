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

// Заполняем таблицу с фотками товаров

const photosPerItem: number = 6;
const photosUrlArray: string[] = [
  '/images/glasses1.jpeg',
  '/images/glasses2.jpeg',
  '/images/glasses3.jpeg',
];
const photosUrl: string = 'api/photos';
const photosValue: object[] = [];

const getRandomPhoto = () => photosUrlArray[Math.floor(Math.random() * photosUrlArray.length)];
async function fillingPhotos() {
  const itemsRequest = await axios.get('api/items');
  const itemsSize = itemsRequest.data.request.length;
  for(let i = 0; i < itemsSize; i++) {
    let flag = true;
    for(let j = 0; j < photosPerItem; j++) {
      photosValue.push({
        itemId: i + 1,
        photoLink: getRandomPhoto(),
        isMainPhoto: flag,
      });
      flag = false;
    }
  }
  filling(photosUrl, photosValue);
}



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
            fillingBasket();
          }}
        >Заполнить таблицу корзин</button>
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
            fillingPhotos();
          }}
        >Заполнить таблицу фоток товаров</button>
      </div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  )
}
