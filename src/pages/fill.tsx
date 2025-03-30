import axios from "axios";
import EmblaCarousel from "./carousel";
import filling from "./filling"
import { EmblaOptionsType } from "embla-carousel";
import { TItems } from "../shared/types";
import MiniCard from "../components/MiniCard/MiniCard";
import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getItemsCarousel } from "../shared/services/carousel";

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
const itemDescriptionText = "Описание Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Описание Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
const itemsValue = [
  {
    title: "Очки 1",
    price: 10000,
    description: itemDescriptionText,
    availability: true,
  },
  {
    title: "Очки 2",
    price: 15000,
    description: itemDescriptionText,
    availability: true,
  },
  {
    title: "Очки 3",
    price: 10000,
    description: itemDescriptionText,
    availability: true,
  },
  {
    title: "Очки 4",
    price: 3000,
    description: itemDescriptionText,
    availability: true,
  },
  {
    title: "Очки 5",
    price: 1900,
    description: itemDescriptionText,
    availability: true,
  },
  {
    title: "Очки 6",
    price: 10500,
    description: itemDescriptionText,
    availability: true,
  },
  {
    title: "Очки 7",
    price: 12300,
    description: itemDescriptionText,
    availability: true,
  },
  {
    title: "Очки 8",
    price: 14000,
    description: itemDescriptionText,
    availability: true,
  },
  {
    title: "Очки 9",
    price: 9200,
    description: itemDescriptionText,
    availability: true,
  },
  {
    title: "Очки 10",
    price: 2400,
    description: itemDescriptionText,
    availability: true,
  },
  {
    title: "Очки 11",
    price: 90200,
    description: itemDescriptionText,
    availability: true,
  },
  {
    title: "Очки 12",
    price: 2500,
    description: itemDescriptionText,
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

type Characteristics = {
  itemId: number;
  frameMatherials: string[];
  linzeMatherials: string[];
  linzeTypes: string[];
  linzeUVDefences: string[];
  linzeEffects: string[];
};

const characteristicsUrl: string = "api/characteristics";
const frameMatherials: string[] = ['Титан', 'Пластик', 'Нержавеющая сталь']
const linzeMatherials: string[] = ['Пластик', 'Стекло']
const linzeTypes: string[] = ['Без диоптрий', 'С диоптриями', 'Солнцезащиные']
const linzeUVDefences: string[] = ['Без УФ-фильтра', 'С УФ-фильтром']
const linzeEffects: string[] = ['Без автозатемнения', 'С автозатемнением']
const characteristicsValue: object[] = []
async function fillingCharacteristics() {
  const itemsRequest = await axios.get("api/items");
  itemsRequest.data.request.map((item: Characteristics) => {
    characteristicsValue.push({
      itemId: item.itemId,
      frameMatherials: frameMatherials[Math.floor(Math.random() * frameMatherials.length)],
      linzeMatherials: linzeMatherials[Math.floor(Math.random() * linzeMatherials.length)],
      linzeTypes: linzeTypes[Math.floor(Math.random() * linzeTypes.length)],
      linzeUVDefences: linzeUVDefences[Math.floor(Math.random() * linzeUVDefences.length)],
      linzeEffects: linzeEffects[Math.floor(Math.random() * linzeEffects.length)],
  })});
  filling(characteristicsUrl, characteristicsValue);
}

type TPostValue = {
  userId: number;
  itemId: number;
  rating: number;
  post: string;
};


const postsUrl: string = "api/posts";
let postsValue: TPostValue[] = [];
const postsArray: string[] = [
  "Я купил эти очки и был очень доволен. Они очень удобные и стильные. Я бы рекомендовал их всем.",
  "Эти очки просто великолепны! Они очень удобные и обеспечивают отличное зрение. Я очень доволен своей покупкой.",
  'Очки сделаны из качественных материалов и имеют отличное качество. Я рекомендую их всем, кто ищет стильные очки с хорошим качеством.',
  'Идеально подошли мне. Очки очень стильные и качественные. Я очень доволен очками.',
  'Данные очки обеспечивают комфортное ношение в течении дня. Линзы не вызывают дискомфорта.',
];
const ratings: number[] = [1, 2, 3, 4, 5];
async function fillingPosts() {
  const itemsRequest = await axios.get("api/items");
  const usersRequest = await axios.get("api/users");
  let flag: boolean = true;
  itemsRequest.data.request.map(async(item: TItems, i: number, row: TItems[])=>{
    const postCount =
      Math.floor(Math.random() * usersRequest.data.request.length) + 1;
    for (let i = 0; i < postCount; i++) {
      let userId = await getRandomUser();
      const itemId = item.id;
      // Проверка на дубликаты, чтобы пользователь не мог дважды оставлять пост к одному товару
      for (let j = 0; j < postsValue.length; j++) {
        if (
          postsValue[j].userId === userId &&
          postsValue[j].itemId === itemId
        ) {
          flag = false; // Если встретили дубликат, то флаг становится false и выходим из цикла
          break;
        } else flag = true; // Если не встретили дубликат, то флаг остается true
      }
      // Если флаг остается true, то добавляем объект в массив postsValue
      if (flag === true) {
        postsValue.push({
          userId: userId,
          itemId: itemId,
          rating: ratings[Math.floor(Math.random() * ratings.length)],
          post: postsArray[Math.floor(Math.random() * postsArray.length)],
        });
      }
    }
    // Когда мы набили массив postsValue данными, запускаем функцию filling
    if (i + 1 === row.length) {
      filling(postsUrl, postsValue);
    }
  } 
  );
}
export const county: number = 7 + 1
export default function fill() {
  const items = useQuery({
    queryKey: ["getItemsCarousel"],
    queryFn: getItemsCarousel,
  });
  const OPTIONS: EmblaOptionsType = { align: "start", loop: true };
  const SLIDE_COUNT = county;
  // const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  const SLIDE: ReactNode[] = [];
  items.data?.data.map((items: any, i: number) => {
    if (i + 1 < SLIDE_COUNT) {
      SLIDE.push(
        <MiniCard
          key={items.requestItem.id}
          title={items.requestItem.title}
          price={items.requestItem.price}
          img_url={items.requestPhoto[i - i].photoLink}
          variable="standart"
          productDetail={`/products/${items.requestItem.id}`}
        />,
      );
    }
  });

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
            fillingCharacteristics();
          }}
        >Заполнить таблицу характеристик товаров</button>
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
            fillingPosts();
          }}
        >Заполнить таблицу отзывов</button>
      </div>
      <EmblaCarousel slides={SLIDE} options={OPTIONS} />
    </div>
  )
}
