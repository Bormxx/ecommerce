import IconLink from "./IconLink";
import {
  HeartIcon,
  HomeIcon,
  QueueListIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import ButtonLong from "../ui-kit/ButtonLong";
import { useUserStore } from "@/shared/store/auth";

export default function LoginMenu() {
  const { isAuthenticated, name } = useUserStore();

  const router = useRouter();
  function clickRegistration() {
    router.replace("/registration");
  }
  return (
    <>
      <div className="flex w-full justify-between gap-[15px]">
        {!isAuthenticated ? (
          <>
            <IconLink
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
            <IconLink
              link="/"
              icon={<HomeIcon />}
              text="Главная"
              lg_hidden="md:hidden"
            />
            <IconLink
              link="/"
              icon={<QueueListIcon />}
              text="Товары"
              lg_hidden="md:hidden"
            />

            <IconLink
              link="/profile"
              icon={<UserIcon />}
              text={name.length > 8 ? name.slice(0, 5) + "..." : name}
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
