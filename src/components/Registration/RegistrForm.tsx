import { Fieldset } from "@headlessui/react";
import FormHeader from "../FormsComponents/FormHeader";
import FormField from "../FormsComponents/FormField";
import FormButton from "../FormsComponents/FormButton";
import AlterAuth from "../FormsComponents/AlterAuth";
import FormFooter from "../FormsComponents/FormFooter";

export default function RegistrForm() {
  return (
    <div className="flex flex-col min-w-[380px] p-6 gap-10 shadow-lg rounded-xl bg-white">
      <div className="flex flex-col gap-6">
        <FormHeader text={"Регистрация"} />
        <form action="" className="flex flex-col gap-6">
          <Fieldset className="flex flex-col gap-4">
            <FormField name={"name"} type={"text"} text={"Имя"} placeholder={"Ярополк"} />
            <FormField name={"surname"} type={"text"} text={"Фамилия"} placeholder={"Иванов"} />
            <FormField name={"email"} type={"text"} text={"Email"} placeholder={"ivanov@yandex.ru"} />
            <FormField name={"password"} type={"password"} text={"Придумайте пароль"} placeholder={"*******"} />
            <FormField name={"password-compare"} type={"password"} text={"Повторите пароль"} placeholder={"*******"} />
          </Fieldset>
          <FormButton text={"Зарегистрироваться"} />
        </form>
        <AlterAuth text={"Регистрация с помощью"} />
      </div>
      <FormFooter headerText={"Уже зарегистрированы?"} link={"/auth"} footerText={"Войти в аккаунт"} />
    </div>
  );
}