import { Fieldset } from "@headlessui/react";
import FormHeader from "../AuthFormsComponents/FormHeader";
import FormField from "../AuthFormsComponents/FormField";
import FormButton from "../AuthFormsComponents/FormButton";
import AlterAuth from "../AuthFormsComponents/AlterAuth";
import FormFooter from "../AuthFormsComponents/FormFooter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import MyModal from "../Dialog/Dialog";
import { useUserStore } from "@/shared/store/auth";
import { useRouter } from "next/router";
import AuthInput from "../AuthFormsComponents/InputAuth";
import { inter } from "@/styles/fonts";
import { authFormSchema, TAuthForm } from "@/shared/types/schemas/auth";
import { signIn, yandexOauth } from "@/shared/services/auth";
import AuthModal from "../Dialog/Variants/AuthModal";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

export default function AuthForm() {
  const [reqStatus, setReqStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [blockModal, setBlockModal] = useState(false);
  const [blockButton, setBlockButton] = useState(true);

  const hasSentRequest = useRef(false);

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
      setErrorMessage(err.message);
      setBlockModal(false);
      setBlockButton(true);
    },
    onMutate: () => {
      setBlockModal(true);
      setReqStatus(true);
    },
  });

  

  const { code, state } = router.query;

  const oauth = useMutation({
    mutationKey: ['oauth', code, state],
    mutationFn: (form: {code: string | string[], state: string | string[]}) => yandexOauth(form.code, form.state),
    onSuccess: (data) => {
      setIsAuthenticated(true);
      setUserData(data);
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
    formState: { isValid },
  } = useForm<TAuthForm>({
    resolver: zodResolver(authFormSchema),
    defaultValues: { email: "", password: "" },
    mode: "all",
  });
  
  useEffect(() => {
    if( !hasSentRequest.current && code && state ) {
      hasSentRequest.current = true;
      oauth.mutate({code, state});
    }
  }, [code, oauth, state])

  return (
    <>
      <div className="flex h-screen w-full flex-col justify-between gap-6 p-6 min-[390px]:max-w-[380px] md:h-fit md:rounded-xl md:bg-white md:shadow-lg">
        <Link
          href={"/"}
          className="flex w-fit gap-1 transition hover:text-black/50 md:pointer-events-none"
        >
          <ArrowLongLeftIcon className="size-6 self-center md:hidden" />
          <FormHeader>Вход в аккаунт</FormHeader>
        </Link>
        <div className="flex flex-col gap-6">
          <form
            onSubmit={handleSubmit((data) => {
              setBlockButton(false);
              mutation.mutate(data);
            })}
            className="flex flex-col gap-6"
          >
            <Fieldset className="flex flex-col gap-4">
              <FormField text={"Ваш email*"}>
                <AuthInput
                  control={control}
                  name="email"
                  placeholder="ivanov@yandex.ru"
                  type={"text"}
                />
              </FormField>
              <FormField text={"Пароль*"}>
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
            <FormButton text={"Войти"} isValid={isValid && blockButton} />
          </form>
          <AlterAuth text={"Войти с помощью"} />
        </div>
        <FormFooter
          headerText={"У вас ещё нет аккаунта?"}
          link={"/registration"}
          footerText={"Зарегистрироваться"}
        />
      </div>
      <MyModal isTrue={reqStatus} closeFn={setReqStatus} isBlocked={blockModal}>
        {blockModal ? (
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
