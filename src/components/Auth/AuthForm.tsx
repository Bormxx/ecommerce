import { Fieldset, Input } from "@headlessui/react";
import { inter } from "@/app/fonts";
import FormHeader from "../FormsComponents/FormHeader";
import FormField from "../FormsComponents/FormField";
import FormButton from "../FormsComponents/FormButton";
import AlterAuth from "../FormsComponents/AlterAuth";
import FormFooter from "../FormsComponents/FormFooter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema, TAuthForm } from "../../../types/schemas/auth";
import ErrorMessage from "../FormsComponents/ErrorMessage";
import { cn } from "@/utils/frontend/cn";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import MyModal from "../Dialog/Dialog";
import { useUserStore } from "@/store/auth";
import { useRouter } from "next/router";
import { signIn } from "@/services/auth";


export default function AuthForm() {
  const [reqStatus, setReqStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsAuthenticated, setUserData } = useUserStore();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (form: TAuthForm) => signIn(form),
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
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TAuthForm>({
    resolver: zodResolver(authFormSchema),
    mode: "onChange",
  });

  return (
    <>
      <div className="flex min-w-[380px] flex-col gap-10 rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-6">
          <FormHeader>Вход в аккаунт</FormHeader>
          <form
            onSubmit={handleSubmit((data) => {
              mutation.mutate(data);
            })}
            className="flex flex-col gap-6"
          >
            <Fieldset className="flex flex-col gap-4">
              <FormField text={"Ваш email"}>
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
              <FormField text={"Пароль"}>
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
                <p
                  className={`${inter.className} text-right text-base font-normal text-gray-500`}
                >
                  Забыли пароль?
                </p>
              </FormField>
            </Fieldset>
            <FormButton text={"Войти"} isValid={isValid} />
          </form>
          <AlterAuth text={"Войти с помощью"} />
        </div>
        <FormFooter
          headerText={"У вас ещё нет аккаунта?"}
          link={"/registration"}
          footerText={"Зарегистрироваться"}
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
