import { Fieldset, Input } from "@headlessui/react";
import FormHeader from "../AuthFormsComponents/FormHeader";
import FormField from "../AuthFormsComponents/FormField";
import FormButton from "../AuthFormsComponents/FormButton";
import AlterAuth from "../AuthFormsComponents/AlterAuth";
import FormFooter from "../AuthFormsComponents/FormFooter";
import {
  formDataSchema,
  registerFormSchema,
  TRegisterForm,
  TFormData,
} from "../../../types/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/utils/frontend/cn";
import ErrorMessage from "../AuthFormsComponents/ErrorMessage";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import MyModal from "../Dialog/Dialog";
import { useUserStore } from "@/store/auth";
import { useRouter } from "next/router";
import { signUp } from "@/services/auth";


export default function RegisterForm() {
  const [reqStatus, setReqStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsAuthenticated, setUserData } = useUserStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (form: TFormData) => signUp(form),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUserData(data);
      reset();
      const path = router.query.from;
      router.replace(typeof path === "string" ? path : "/");
    },
    onError: (err) => {
      setReqStatus(!reqStatus);
      setErrorMessage(err.message);
      console.log(err.message);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TRegisterForm>({
    resolver: zodResolver(registerFormSchema),
    mode: "all",
  });


  return (
    <>
      <div className="flex min-w-[380px] flex-col gap-10 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-6">
          <FormHeader>Регистрация</FormHeader>
          <form
            onSubmit={handleSubmit((data) => {
              mutation.mutate(formDataSchema.parse(data));
            })}
            className="flex flex-col gap-6"
          >
            <Fieldset className="flex flex-col gap-4">
              <FormField text={"Имя"}>
                <Input
                  {...register("name")}
                  type={"text"}
                  className={cn(
                    `${errors.name ? "border-red-500" : "border-gray-400"} rounded px-3 py-2`,
                  )}
                  placeholder={"Ярополк"}
                />
                {errors.name && (
                  <ErrorMessage text={"Поле должно быть длиннее 2 символов"} />
                )}
              </FormField>
              <FormField text={"Фамилия"}>
                <Input
                  {...register("surname")}
                  type={"text"}
                  className={cn(
                    `${errors.surname ? "border-red-500" : "border-gray-400"} rounded px-3 py-2`,
                  )}
                  placeholder={"Иванов"}
                />
                {errors.surname && (
                  <ErrorMessage text={"Поле должно быть длиннее 2 символов"} />
                )}
              </FormField>
              <FormField text={"Email"}>
                <Input
                  {...register("email")}
                  type={"text"}
                  className={cn(
                    `${errors.email ? "border-red-500" : "border-gray-400"} rounded px-3 py-2`,
                  )}
                  placeholder={"ivanov@yandex.ru"}
                />
                {errors.email && <ErrorMessage text={"Некорректный email"} />}
              </FormField>
              <FormField text={"Придумайте пароль"}>
                <Input
                  {...register("password")}
                  type={"password"}
                  className={cn(
                    `${errors.password ? "border-red-500" : "border-gray-400"} rounded px-3 py-2`,
                  )}
                  placeholder={"*******"}
                />
                {errors.password && (
                  <ErrorMessage
                    text={"Пароль не может быть меньше 6 символов"}
                  />
                )}
              </FormField>
              <FormField text={"Повторите пароль"}>
                <Input
                  {...register("passwordCompare")}
                  type={"password"}
                  className={cn(
                    `${errors.passwordCompare ? "border-red-500" : "border-gray-400"} rounded px-3 py-2`,
                  )}
                  placeholder={"*******"}
                />
                {errors.passwordCompare && (
                  <ErrorMessage text={"Пароли не совпадают"} />
                )}
              </FormField>
            </Fieldset>
            <FormButton text={"Зарегистрироваться"} isValid={isValid} />
          </form>
          <AlterAuth text={"Регистрация с помощью"} />
        </div>
        <FormFooter
          headerText={"Уже зарегистрированы?"}
          link={"/auth"}
          footerText={"Войти в аккаунт"}
        />
      </div>
      <MyModal
        isTrue={reqStatus}
        closeFn={setReqStatus}
        errorMessage={errorMessage}
      />
    </>
  );
}
