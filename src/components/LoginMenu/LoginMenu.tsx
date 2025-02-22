import IconLink from "../IconLink/IconLink";
import { inter } from "@/app/fonts";
import {
  HeartIcon,
  HomeIcon,
  QueueListIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function LoginMenu() {
  const userName = "";

  return (
    <>
      <div className="flex w-full justify-between gap-[15px]">
        {!userName ? (
          <>
            <IconLink
              link="/login"
              icon={<UserIcon />}
              text="Войти"
              lg_hidden=""
            />
            <button
              className={`${inter.className} flex-grow rounded-[8px] bg-[#1E40AF] px-4 py-2 text-base font-bold text-white`}
            >
              Зарегистрироваться
            </button>
          </>
        ) : (
          <>
            <IconLink
              link="/"
              icon={<HomeIcon />}
              text="Главная"
              lg_hidden="lg:hidden"
            />
            <IconLink
              link="/"
              icon={<QueueListIcon />}
              text="Товары"
              lg_hidden="lg:hidden"
            />

            <IconLink
              link="/"
              icon={<UserIcon />}
              text="Профиль"
              lg_hidden=""
            />
            <IconLink
              link="/"
              icon={<HeartIcon />}
              text="Избранное"
              lg_hidden=""
            />
            <IconLink
              link="/cart"
              icon={<ShoppingBagIcon />}
              text="Корзина"
              lg_hidden=""
            />
          </>
        )}
      </div>
    </>
  );
}
