import {
  HeartIcon,
  HomeIcon,
  QueueListIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import ButtonLong from "@/components/ui/ButtonLong";
import ECIconLink from "@/components/ui/icon-link";

export default function LoginMenu() {
  const userName = "";
  const router = useRouter();
  function clickRegistration() {
    router.replace("/registration");
  }
  return (
    <>
      <div className="flex w-full justify-between gap-[15px]">
        {!userName ? (
          <>
            <ECIconLink
              link="/auth"
              icon={<UserIcon />}
              text="Войти"
              lg_hidden=""
            />
            <ButtonLong
              text="Зарегистрироваться"
              onClick={clickRegistration}
              type="button"
            />
          </>
        ) : (
          <>
            <ECIconLink
              link="/"
              icon={<HomeIcon />}
              text="Главная"
              lg_hidden="md:hidden"
            />
            <ECIconLink
              link="/"
              icon={<QueueListIcon />}
              text="Товары"
              lg_hidden="md:hidden"
            />

            <ECIconLink
              link="/profile"
              icon={<UserIcon />}
              text="Профиль"
              lg_hidden=""
            />
            <ECIconLink
              link="/"
              icon={<HeartIcon />}
              text="Избранное"
              lg_hidden=""
            />
            <ECIconLink
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
