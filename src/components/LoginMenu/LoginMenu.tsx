import iconLogin from "../../images/Icon-login.svg";
import iconFavorite from "../../images/icon-favorite.svg";
import iconTrash from "../../images/icon-trash.svg";
import iconProducts from "../../images/icon-products.svg";
import iconHome from "../../images/icon-home.svg";
// import { inter } from "@/app/fonts";

import IconLink from "../IconLink/IconLink";
import { inter } from "@/app/fonts";

export default function LoginMenu() {
  const userName = "Kristina";

  return (
    <>
      <div className="flex w-full justify-between gap-[15px]">
        {!userName ? (
          <>
            <IconLink
              link="/"
              icon={iconLogin}
              icon_alt="login"
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
              icon={iconHome}
              icon_alt="main"
              text="Главная"
              lg_hidden="lg:hidden"
            />
            <IconLink
              link="/"
              icon={iconProducts}
              icon_alt="products"
              text="Товары"
              lg_hidden="lg:hidden"
            />

            <IconLink
              link="/"
              icon={iconLogin}
              icon_alt="login"
              text="Профиль"
              lg_hidden=""
            />
            <IconLink
              link="/"
              icon={iconFavorite}
              icon_alt="Favorite"
              text="Избранное"
              lg_hidden=""
            />
            <IconLink
              link="/"
              icon={iconTrash}
              icon_alt="Trash"
              text="Корзина"
              lg_hidden=""
            />
          </>
        )}
      </div>
    </>
  );
}
