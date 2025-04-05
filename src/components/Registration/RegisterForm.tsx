import { Fieldset } from "@headlessui/react";
import FormHeader from "../AuthFormsComponents/FormHeader";
import FormField from "../AuthFormsComponents/FormField";
import FormButton from "../AuthFormsComponents/FormButton";
import AlterAuth from "../AuthFormsComponents/AlterAuth";
import FormFooter from "../AuthFormsComponents/FormFooter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import MyModal from "../Dialog/Dialog";
import { useRouter } from "next/router";
import AuthInput from "../AuthFormsComponents/InputAuth";
import {
  formDataSchema,
  registerFormSchema,
  TRegisterForm,
  TFormData,
} from "@/shared/types/schemas/auth";
import { useUserStore } from "@/shared/store/auth";
import { signUp } from "@/shared/services/auth";
import AuthModal from "../Dialog/Variants/AuthModal";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

export default function RegisterForm() {
  const [reqStatus, setReqStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [blockModal, setBlockModal] = useState(false);
  const [blockButton, setBlockButton] = useState(true);

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
      setErrorMessage(err.message);
      setBlockModal(false);
      setBlockButton(true);
    },
    onMutate: () => {
      setBlockModal(true);
      setReqStatus(true);
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
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordCompare: "",
    },
  });

  return (
    <>
      <div className="flex h-screen w-full flex-col justify-between gap-6 p-6 min-[390px]:max-w-[380px] md:h-fit md:rounded-xl md:bg-white md:shadow-lg">
        <Link
          href={"/"}
          className="flex w-fit gap-1 transition hover:text-black/50 md:pointer-events-none"
        >
          <ArrowLongLeftIcon className="size-6 self-center md:hidden" />
          <FormHeader>Регистрация</FormHeader>
        </Link>
        <div className="flex flex-col gap-6">
          <form
            onSubmit={handleSubmit((data) => {
              setBlockButton(false);
              mutation.mutate(formDataSchema.parse(data));
            })}
            className="flex flex-col gap-6"
          >
            <Fieldset className="flex flex-col gap-4">
              <FormField text={"Имя*"}>
                <AuthInput
                  control={control}
                  name="name"
                  placeholder="Ярополк"
                  type={"text"}
                />
              </FormField>
              <FormField text={"Фамилия*"}>
                <AuthInput
                  control={control}
                  name="surname"
                  placeholder="Иванов"
                  type={"text"}
                />
              </FormField>
              <FormField text={"Email*"}>
                <AuthInput
                  control={control}
                  name="email"
                  placeholder="ivanov@yandex.ru"
                  type={"text"}
                />
              </FormField>
              <FormField text={"Придумайте пароль*"}>
                <AuthInput
                  onChange={() => trigger("passwordCompare")}
                  control={control}
                  name="password"
                  placeholder="*******"
                  type={"password"}
                />
              </FormField>
              <FormField text={"Повторите пароль*"}>
                <AuthInput
                  control={control}
                  name="passwordCompare"
                  placeholder="*******"
                  type={"password"}
                />
              </FormField>
            </Fieldset>
            <FormButton
              text={"Зарегистрироваться"}
              isValid={isValid && blockButton}
            />
          </form>
          <AlterAuth text={"Регистрация с помощью"} />
        </div>
        <FormFooter
          headerText={"Уже зарегистрированы?"}
          link={"/auth"}
          footerText={"Войти в аккаунт"}
        />
      </div>
      <MyModal isTrue={reqStatus} closeFn={setReqStatus} isBlocked={blockModal}>
        {mutation.isPending || mutation.isSuccess ? (
          <LoadingIcon />
        ) : (
          <AuthModal
            isTrue={reqStatus}
            errorMessage={errorMessage}
            closeFn={setReqStatus}
          />
        )}
      </MyModal>
    </>
  );
}
