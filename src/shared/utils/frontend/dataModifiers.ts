import { ChangeEvent } from "react";

export const modifyStringToNumbers = (e: ChangeEvent<HTMLInputElement>) => {
  const val = e.target.value;
  if (!/\D/g.test(val)) {
    return val;
  } else {
    return val.replace(/\D/g, "");
  }
};

export const separateCardNumber = (number: string) => {
  const chunks = number.match(/\d{1,4}/g);

  if (chunks) {
    return chunks.join(' ');
  }

  return number;
}

export const setPhoneNumber = (phone: string, position:number=0):string => {
  if (!phone) return "";
  if (position === 11) return "";
  if (position === 0) return "+7" + setPhoneNumber(phone.slice(1), position+1);

  let sep = "";
  switch(position) {
    case(1):
      sep += " (";
      break;
    case(4):
      sep += ") ";
      break;
    case(7):
      sep += "-";
      break;
    case(9):
      sep += "-";
      break;
  }

  return sep + phone[0] + setPhoneNumber(phone.slice(1), position+1);
}