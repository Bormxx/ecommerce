import { ChangeEvent } from "react";

export const modifyStringToNumbers = (e: ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  if (!/\D/g.test(val)) {
    return val;
  } else {
    return val.replace(/\D/g, "");
  }
};