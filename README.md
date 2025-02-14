
## [ !!! Чек-лист !!!](https://practicum.yandex.ru/learn/high-education-web-developer-magistr/courses/796aa395-f3b3-49b0-90b4-3e903d9fb0bd/sprints/479640/topics/f1c6e9f8-96ca-4a94-ae70-3023f6839b20/lessons/1e01dac9-4fdc-4802-998c-c715e057eb23/)

### Начало работы

После клонирования репозитория откройте интерфейс командной строки в этой папке и выполните команду:

```
npm install
```

### Общие требования

<p align="center"><img src="./imagez/tt.png" alt="Требования к реализации." width="400"></p>

### Доска Миро целиком

[Доска Миро](https://miro.com/app/board/uXjVKPFlI1Y=/)

Пароль: 11223344

### Почитать сокращения tailwind

[Справочник тут](https://tailwindcss.com/docs/installation/using-vite)

С левой стороны выбираете что нужно и копируете сокращение tailwind.

### Иконки, которые понадобятся в проекте

Смотреть иконки и их названия [тут](https://heroicons.com/)

Пример использования иконки из этой библиотеки и стили tailwind в index.tsx 

### Посмотреть пример от Яндекс.Практикум тудушка на Next.js

[Тудушка](https://disk.yandex.ru/d/q7ySzypHfWweJQ/%D0%92%D1%81%D1%82%D1%80%D0%B5%D1%87%D0%B8%20%D0%BF%D0%BE%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%B0%D0%BC%20%D1%81%20%D0%AF%D0%9F/%D0%92%D1%81%D1%82%D1%80%D0%B5%D1%87%D0%B0%2017.01.mp4)

### Рекомендуемое дополнение к vscode

[tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### Используемые библиотеки ###

[Next.js](https://nextjs.org/docs) /
[Tailwind CSS](https://v3.tailwindcss.com/) /
[TanStack Query](https://tanstack.com/query/latest) /
[React Hook Form](https://react-hook-form.com/) /
[Zod](https://zod.dev/) /
[Zustand](https://github.com/pmndrs/zustand) /
[HeadlessUI](https://headlessui.com/) /
[Heroicons](https://heroicons.com/) /
[Luxon](https://moment.github.io/luxon/#/?id=luxon) /
[Clsx](https://www.npmjs.com/package/clsx) /
[Tailwind-merge](https://www.npmjs.com/package/tailwind-merge) /

### Общие правила написания кода

1. __Иконки__
    - По умолчанию, для вставки иконок используется библиотека [Heroicons](https://heroicons.com/)
    - Если такой иконки нет в Heroicons, используется компонент `Image` из `next/image`. Сами иконки хранятся в папке `icons`, которая лежит в папке `public`
2. __Шрифты__
    - Шрифты добавляются согласно документации `Next.js`
    - Для хранения шрифтов используется папка `fonts`, которая лежит в папке `public`
3. __Картинки__
    - Для вставки изображений используется компонент `Image` из `next/image`. Сами картинки хранятся в папке `images`, которая лежит в папке `public`
4. __Стили__
    - Для написания стилей используется библиотека [Tailwind CSS](https://v3.tailwindcss.com/)
    - По умолчанию используются стандартные стили из Tailwind CSS, например: `text-red-400`
    - Если в Tailwind CSS отсутствует какой-либо стиль, тогда используется кастомный, например `text-[#50d71e]`
    - Для объединения групп стилей или для использования стилей с условиями выполнения используется функция `cn`, которая лежит в `src/utils`
5. __Функции__
    - Часто используемые функции лежат в папке `utils` внутри папки `src`
6. __Компоненты__
    - Часто используемые и отдельные компоненты страниц хранятся в папке `components` внутри папки `src`, в папках соответсвующих названию компонентов
    - Для компонентов форм (_input, checkbox, button, и т.д._) используется [HeadlessUI](https://headlessui.com/)
    - Для валидации компонентов форм исполуется [Zod](https://zod.dev/)
7. __API__
    - Для валидации API запросов используется [Zod](https://zod.dev/)
