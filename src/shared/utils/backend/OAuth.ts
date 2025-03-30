import { Yandex } from "arctic";

export const yandex = new Yandex(
  process.env.YANDEX_CLIENT_ID ?? "",
  process.env.YANDEX_CLIENT_SECRET ?? "",
  "",
);
