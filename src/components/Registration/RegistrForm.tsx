import { Fieldset, Input } from "@headlessui/react";
import FormHeader from "../FormsComponents/FormHeader";
import FormField from "../FormsComponents/FormField";
import FormButton from "../FormsComponents/FormButton";
import AlterAuth from "../FormsComponents/AlterAuth";
import FormFooter from "../FormsComponents/FormFooter";
import { formDataSchema, registrFormSchema, TRegistrForm, TFormData } from "../../../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/cn";
import ErrorMessage from "../FormsComponents/ErrorMessage";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import MyModal from "../Dialog/Dialog";
import { useUserStore, type TUser } from "@/store/auth";

export async function signUp(form: TFormData ) {
  const response = await fetch(`/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form), 
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}

export default function RegistrForm() {
  const [reqStatus, setReqStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { userData, setIsAuthenticated, setUserData, isAuthenticated } = useUserStore();
  console.log(isAuthenticated, userData);

  const mutation = useMutation({
    mutationFn: ( form: TFormData ) => signUp(form),
    onSuccess: (data: TUser) => {
      setUserData(data);
      setIsAuthenticated(true);
      console.log(isAuthenticated, userData);
    },
    onError: (err) => {
      setReqStatus(!reqStatus);
      setErrorMessage(err.message);
      console.log(err.message);
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TRegistrForm>({ resolver: zodResolver(registrFormSchema), mode: "onChange" });

  useEffect(() => {
    fetch('/api/users')
  }, [])

  return (
    <>
    <div className="flex flex-col min-w-[380px] p-6 gap-10 shadow-lg rounded-xl bg-white">
      <div className="flex flex-col gap-6">
        <FormHeader>Регистрация</FormHeader>
        <form onSubmit={handleSubmit((data) => { 
              mutation.mutate(formDataSchema.parse(data));
              reset();
            })} 
            className="flex flex-col gap-6"
        >
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
    <MyModal isTrue={reqStatus} closeFn={setReqStatus} errorMessage={errorMessage}/>
    </>
  );
}