import EmblaCarousel from "./carousel";
import filling from "./filling"
import { EmblaOptionsType } from "embla-carousel";

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
];

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
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  )
}
