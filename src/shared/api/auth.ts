import { TAuthForm, TFormData } from "../types/schemas/auth";

export const signUp = async (form: TFormData) => {
  const response = await fetch(`/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const signIn = async (form: TAuthForm) => {
  const response = await fetch(`/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const checkAuth = async (isAuth: boolean) => {
  if (!isAuth) {
    throw new Error("Пользователь не авторизирован");
  }

  const response = await fetch("/api/old/findUser");

  if (!response.ok) {
    throw new Error("Ошибка авторизации");
  }

  return response.json();
};

export const yandexOauth = async (
  code: string | string[],
  state: string | string[],
) => {
  const response = await fetch("/api/oauth/callback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: code, state: state }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
};

export const getYandexUrl = async () => {
  const response = await fetch("/api/oauth/yandex");
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data.url;
};

export const logOut = async () => {
  const response = await fetch(`/api/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.error || "Не удалось выйти из аккаунта");
  }

  return true;
};
