import { Fieldset, Input } from "@headlessui/react";
import { inter } from "@/app/fonts";
import FormHeader from "../FormsComponents/FormHeader";
import FormField from "../FormsComponents/FormField";
import FormButton from "../FormsComponents/FormButton";
import AlterAuth from "../FormsComponents/AlterAuth";
import FormFooter from "../FormsComponents/FormFooter";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { authFormSchema, TAuthForm } from "../../../types";
import ErrorMessage from "../FormsComponents/ErrorMessage";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import MyModal from "../Dialog/Dialog";
import { useUserStore } from "@/store/auth";
import { useRouter } from "next/router";

export async function signIn(form: TAuthForm ) {
  const response = await fetch(`/api/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form), 
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error)
  }
  return data;
}

export default function AuthForm() {
  const [reqStatus, setReqStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsAuthenticated, setUserData } = useUserStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: ( form: TAuthForm ) => signIn(form),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUserData(data);
      router.replace('/');
    },
    onError: (err) => {
      setReqStatus(!reqStatus);
      setErrorMessage(err.message);
    }
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },   
  } = useForm<TAuthForm>({ resolver: zodResolver(authFormSchema), mode: "onChange" });

  useEffect(() => {
    fetch('/api/users')
  }, [])

  return (
    <>
      <div className="flex flex-col min-w-[380px] p-6 gap-10 shadow-lg rounded-xl bg-white">
        <div className="flex flex-col gap-6">
          <FormHeader>Вход в аккаунт</FormHeader>
          <form onSubmit={
            handleSubmit((data) => {
              mutation.mutate(data);
              reset();
            })} 
            className="flex flex-col gap-6"
          >
            <Fieldset className="flex flex-col gap-4">
              <FormField text={"Ваш email"}>
                <Input 
                  {...register("email")}
                  type={"text"}
                  className={cn(`${ errors.email ? "border-red-500" : "border-gray-400" } rounded py-2 px-3`)}
                  placeholder={"ivanov@yandex.ru"}
                />
                { errors.email && <ErrorMessage text={"Некорректный email"}/> }
              </FormField>
              <FormField text={"Пароль"}>
                <Input 
                  {...register("password")}
                  type={"password"}
                  className={cn(`${ errors.password ? "border-red-500" : "border-gray-400" } rounded py-2 px-3`)}
                  placeholder={"*******"}
                />
                { errors.password && <ErrorMessage text={"Пароль не может быть меньше 6 символов"}/> }
                <p className={`${inter.className} font-normal text-base text-right text-gray-500`}>Забыли пароль?</p>
              </FormField>
            </Fieldset>
            <FormButton text={"Войти"} isValid={isValid} />
          </form>
          <AlterAuth text={"Войти с помощью"} />
        </div>
        <FormFooter headerText={"У вас ещё нет аккаунта?"} link={"/registration"} footerText={"Зарегистрироваться"} />
      </div>
      <MyModal isTrue={reqStatus} closeFn={setReqStatus} errorMessage={errorMessage}/>
    </>
  );
}