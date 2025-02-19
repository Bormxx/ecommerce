import { Fieldset, Input } from "@headlessui/react";
import FormHeader from "../FormsComponents/FormHeader";
import FormField from "../FormsComponents/FormField";
import FormButton from "../FormsComponents/FormButton";
import AlterAuth from "../FormsComponents/AlterAuth";
import FormFooter from "../FormsComponents/FormFooter";
import { formDataSchema, registrFormSchema, TRegistrForm } from "../../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";
import ErrorMessage from "../FormsComponents/ErrorMessage";

  
export default function RegistrForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TRegistrForm>({ resolver: zodResolver(registrFormSchema), mode: "onChange" });

  return (
    <div className="flex flex-col min-w-[380px] p-6 gap-10 shadow-lg rounded-xl bg-white">
      <div className="flex flex-col gap-6">
        <FormHeader text={"Регистрация"} />
        <form onSubmit={handleSubmit((data) => console.log(formDataSchema.parse(data)))} className="flex flex-col gap-6">
          <Fieldset className="flex flex-col gap-4">
            <FormField text={"Имя"}>
              <Input 
                {...register("name")}
                type={"text"}
                className={cn(`${ errors.name ? "border-red-500" : "border-gray-400" } rounded py-2 px-3`)}
                placeholder={"Ярополк"}
              />
              { errors.name && <ErrorMessage text={"Поле должно быть длиннее 2 символов"}/> }
            </FormField>           
            <FormField text={"Фамилия"}>
              <Input 
                {...register("surname")}
                type={"text"}
                className={cn(`${ errors.surname ? "border-red-500" : "border-gray-400" } rounded py-2 px-3`)}
                placeholder={"Иванов"}
              />
              { errors.surname && <ErrorMessage text={"Поле должно быть длиннее 2 символов"}/> }
            </FormField>
            <FormField text={"Email"}>
              <Input 
                {...register("email")}
                type={"text"}
                className={cn(`${ errors.email ? "border-red-500" : "border-gray-400" } rounded py-2 px-3`)}
                placeholder={"ivanov@yandex.ru"}
              />
              { errors.email && <ErrorMessage text={"Некорректный email"}/> }
            </FormField>
            <FormField text={"Придумайте пароль"}>
              <Input 
                {...register("password")}
                type={"password"}
                className={cn(`${ errors.password ? "border-red-500" : "border-gray-400" } rounded py-2 px-3`)}
                placeholder={"*******"}
              />
              { errors.password && <ErrorMessage text={"Пароль не может быть меньше 6 символов"}/> }
            </FormField>
            <FormField text={"Повторите пароль"}>
              <Input
                {...register("passwordCompare")}
                type={"password"}
                className={cn(`${ errors.passwordCompare ? "border-red-500" : "border-gray-400" } rounded py-2 px-3`)}
                placeholder={"*******"}
              />
              { errors.passwordCompare && <ErrorMessage text={"Пароли не совпадают"}/>}
            </FormField>
          </Fieldset>
          <FormButton text={"Зарегистрироваться"} isValid={isValid} />
        </form>
        <AlterAuth text={"Регистрация с помощью"} />
      </div>
      <FormFooter headerText={"Уже зарегистрированы?"} link={"/auth"} footerText={"Войти в аккаунт"} />
    </div>
  );
}