import { Fieldset } from "@headlessui/react";
import { inter } from "@/app/fonts";
import FormHeader from "../FormsComponents/FormHeader";
import FormField from "../FormsComponents/FormField";
import FormButton from "../FormsComponents/FormButton";
import AlterAuth from "../FormsComponents/AlterAuth";
import FormFooter from "../FormsComponents/FormFooter";

const a = () => {console.log(5)} // Тестовая функция

export default function AuthForm() {
  return (
    <div className="flex flex-col max-w-[380px] p-6 gap-10 shadow-lg rounded-xl">
      <div className="flex flex-col gap-6">
        <FormHeader text={"Вход в аккаунт"} />
        <form action={a} className="flex flex-col gap-6">
          <Fieldset className="flex flex-col gap-4">
            <FormField name={"login"} type={"text"} text={"Ваш email"} placeholder={"ivanov@yandex.ru"} />
            <FormField name={"password"} type={"password"} text={"Пароль"} placeholder={"*******"}>
              <p className={`${inter.className} font-normal text-base text-right text-gray-500`}>Забыли пароль?</p>
            </FormField>
          </Fieldset>
          <FormButton text={"Войти"} />
        </form>
        <AlterAuth text={"Войти с помощью"} />
      </div>
      <FormFooter text={"У вас ещё нет аккаунта?"} link={""} />
    </div>
  );
}