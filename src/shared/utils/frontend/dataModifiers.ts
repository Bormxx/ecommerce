import { storages } from "@/shared/consts/consts";
import { orderFormSchema, TOrderSchema } from "@/shared/types/schemas/order";
import { ChangeEvent } from "react";

export const modifyStringToNumbers = (e: ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  if (!/\D/g.test(val)) {
    return val;
  } else {
    return val.replace(/\D/g, "");
  }
};

export const modifyOrderData = (data: TOrderSchema) => {
  if (!data.isCourier && data.city) {
    data.address = storages[data.city];
  }
  const address = "г. " + data.city + ", " + data.address;
  return orderFormSchema.parse({address, ...data});
};
