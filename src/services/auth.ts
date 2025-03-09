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
}

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
}

export const checkAuth = async (isAuth: boolean) => {
  if (!isAuth) {
    throw new Error("Пользователь не авторизирован");
  }

  const response = await fetch("/api/findUser");

  if (!response.ok) {
    throw new Error("Ошибка авторизации");
  }

  return response.json();
};
