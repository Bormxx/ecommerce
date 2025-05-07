import { Inter, Roboto } from "next/font/google";

//Основной текст, подписи и мелкий текст, текст в кнопках
export const inter = Inter({
  subsets: ["cyrillic"],
  weight: ["400", "700"], // 400 - Regular, 700 - Bold
  display: "swap",
});

//Заголовки
export const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: ["700"], // 700 - Bold
  display: "swap",
});
