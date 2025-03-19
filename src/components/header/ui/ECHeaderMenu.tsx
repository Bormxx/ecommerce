import {
  HeartIcon,
  HomeIcon,
  QueueListIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import ECIconLink from "@/components/ui/icon-link";
import ECButton from "@/components/ui/default-button";

export function ECHeaderMenu() {
  const userName = "";
  const router = useRouter();

  const clickRegistration = () => router.replace("/registration");

  return (
    <>
      <div className="flex w-full justify-between gap-[15px]">
        {!userName ? (
          <>
            <ECIconLink
              href="/auth"
              icon={<UserIcon />}
              text="Войти"
              lg_hidden=""
            />
            <ECButton
              type="button"
              variant="primary"
              onClick={clickRegistration}
            >
              Зарегистрироваться
            </ECButton>
          </>
        ) : (
          <>
            <ECIconLink
              href="/"
              icon={<HomeIcon />}
              text="Главная"
              lg_hidden="md:hidden"
            />
            <ECIconLink
              href="/category/1"
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
