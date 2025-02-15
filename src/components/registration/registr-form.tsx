import { Roboto, Inter } from "next/font/google";
import { Label, Input, Fieldset, Field, Button } from "@headlessui/react";
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

export default function RegistrForm() {
  return (
    <div className="flex flex-col w-[380px] p-6 gap-10 shadow-lg rounded-xl">
      <div className="flex flex-col gap-6">
        <h2 className={`${roboto.className} text-2xl`}>Регистрация</h2>
        <form action="" className="flex flex-col gap-6">
          <Fieldset className="flex flex-col gap-4">
            <Field className="flex flex-col gap-[2px]">
              <Label className={`${inter.className} text-sm text-gray-500`}>Имя</Label>
              <Input 
                name="name"
                type="text"
                className="rounded py-2 px-3 text-gray-400  border-gray-400"
                placeholder="Ярополк"
              />
            </Field>
            <Field className="flex flex-col gap-[2px]">
              <Label className={`${inter.className} text-sm text-gray-500`}>Фамилия</Label>
              <Input 
                name="surname"
                type="text"
                className="rounded py-2 px-3 text-gray-400  border-gray-400"
                placeholder="Иванов"
              />
            </Field>
            <Field className="flex flex-col gap-[2px]">
              <Label className={`${inter.className} text-sm text-gray-500`}>Email</Label>
              <Input 
                name="email"
                type="text"
                className="rounded py-2 px-3 text-gray-400  border-gray-400"
                placeholder="ivanov@yandex.ru"
              />
            </Field>
            <Field className="flex flex-col gap-[2px]">
              <Label className={`${inter.className} text-sm text-gray-500`}>Придумайте пароль</Label>
              <Input 
                name="password"
                type="password"
                className="rounded py-2 px-3 text-gray-400 border-gray-400"
                placeholder="*******"
              />
            </Field>
            <Field className="flex flex-col gap-[2px]">
              <Label htmlFor="password-compare" className={`${inter.className} text-sm text-gray-500`}>Повторите пароль</Label>
              <Input 
                name="password-compare"
                type="password"
                className="rounded py-2 px-3 text-gray-400 border-gray-400"
                placeholder="*******"
              />
            </Field>
          </Fieldset>
          <Button
            type="submit"
            className={`${interWeight.className} py-3 px-4 rounded-md bg-blue-800 hover:bg-blue-600 text-base text-center text-white`}
          >
            Зарегистрироваться
          </Button>
        </form>
        <div className="flex flex-col gap-2 items-center">
          <p className={`${inter.className} text-base text-gray-500`}>Регистрация с помощью</p>
          <Image 
            src={"/icons/vkLogo.svg"}
            alt={"VK"}
            width={32}
            height={32}
          />
        </div>
      </div>
      <div className="gap-[2px]">
        <p className={`${inter.className} text-sm text-gray-500`}>Уже зарегистрированы?</p>
        <Link
          href={""}
          className={`${interWeight.className} text-sm text-blue-600`}
        >
          Войти в аккаунт
        </Link>
      </div>
    </div>
  );
}