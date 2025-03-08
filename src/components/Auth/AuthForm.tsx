import { Fieldset } from "@headlessui/react";
import { inter } from "@/app/fonts";
import FormHeader from "../AuthFormsComponents/FormHeader";
import FormField from "../AuthFormsComponents/FormField";
import FormButton from "../AuthFormsComponents/FormButton";
import AlterAuth from "../AuthFormsComponents/AlterAuth";
import FormFooter from "../AuthFormsComponents/FormFooter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authFormSchema, TAuthForm } from "../../../types/schemas/auth";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import MyModal from "../Dialog/Dialog";
import { useUserStore } from "@/store/auth";
import { useRouter } from "next/router";
import { signIn } from "@/services/auth";
import AuthInput from "../AuthFormsComponents/InputAuth";

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
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { isValid },
  } = useForm<TAuthForm>({
    resolver: zodResolver(authFormSchema),
    mode: "all",
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
                <AuthInput
                  control={control}
                  name="email"
                  placeholder="ivanov@yandex.ru"
                  type={"text"}
                />
              </FormField>
              <FormField text={"Пароль"}>
                <AuthInput
                  control={control}
                  name="password"
                  placeholder="*******"
                  type={"password"}
                />
                <p
                  className={`${inter.className} text-right text-base font-normal text-gray-500`}
                >
                  Забыли пароль?
                </p>
              </FormField>
            </Fieldset>
            <FormButton text={"Войти"} isValid={isValid} trigger={trigger}/>
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
