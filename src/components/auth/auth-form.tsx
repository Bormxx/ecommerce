import { Roboto, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const roboto = Roboto({
  weight: "700",
  subsets: ["cyrillic"],
});

const inter = Inter ({
  weight: "400",
  subsets: ["cyrillic"],
});

const interWeight = Inter ({
  weight: "700",
  subsets: ["cyrillic"],
});

export default function AuthForm() {
  return (
    <div className="flex flex-col w-[380px] p-6 gap-10 shadow-lg rounded-xl">
      <div className="flex flex-col gap-6">
        <h2 className={`${roboto.className} text-2xl`}>Вход в аккаунт</h2>
        <form action="" className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-[2px]">
              <label htmlFor="login" className={`${inter.className} text-sm text-neutral-500`}>Ваш email или логин</label>
              <input 
                id="login"
                type="text"
                className="rounded py-2 px-3 text-neutral-400  border-neutral-400"
                placeholder="ivanov@yandex.ru"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <label htmlFor="password" className={`${inter.className} text-sm text-neutral-500`}>Пароль</label>
              <input 
                id="password"
                type="password"
                className="rounded py-2 px-3 text-neutral-400 border-neutral-400"
                placeholder="*******"
              />
              <p className={`${inter.className} text-base text-right text-neutral-500`}>Забыли пароль?</p>
            </div>
          </div>
          <button
            type="submit"
            className={`${interWeight.className} py-3 px-4 rounded-md bg-blue-800 hover:bg-blue-600 text-base text-center text-white`}
          >
            Войти
          </button>
        </form>
        <div className="flex flex-col gap-2 items-center">
          <p className={`${inter.className} text-base text-neutral-500`}>Войти с помощью</p>
          <Image 
            src={"/icons/vkLogo.svg"}
            alt={"VK"}
            width={32}
            height={32}
          />
        </div>
      </div>
      <div className="gap-[2px]">
        <p className={`${inter.className} text-sm text-neutral-500`}>У вас ещё нет аккаунта?</p>
        <Link
          href={""}
          className={`${interWeight.className} text-sm text-blue-600`}
        >
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}