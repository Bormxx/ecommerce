import { Fieldset } from "@headlessui/react";
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
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import MyModal from "../Dialog/Dialog";
import { useUserStore } from "@/store/auth";
import { useRouter } from "next/router";
import { signUp } from "@/services/auth";
import AuthInput
  from "../AuthFormsComponents/InputAuth";


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
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { isValid },
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
                <AuthInput
                  control={control}
                  name="name"
                  placeholder="Ярополк"
                  type={"text"}
                />
              </FormField>
              <FormField text={"Фамилия"}>
                <AuthInput
                  control={control}
                  name="surname"
                  placeholder="Иванов"
                  type={"text"}
                />
              </FormField>
              <FormField text={"Email"}>
                <AuthInput
                  control={control}
                  name="email"
                  placeholder="ivanov@yandex.ru"
                  type={"text"}
                />
              </FormField>
              <FormField text={"Придумайте пароль"}>
                <AuthInput
                  onChange={() => trigger("passwordCompare")}
                  control={control}
                  name="password"
                  placeholder="*******"
                  type={"password"}
                />
              </FormField>
              <FormField text={"Повторите пароль"}> 
                <AuthInput
                  control={control}
                  name="passwordCompare"
                  placeholder="*******"
                  type={"password"}
                />
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
