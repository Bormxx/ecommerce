import { TOrderFormSchema } from "../types/schemas/order";

export const addOrder = async(form: TOrderFormSchema) => {
  const response = await fetch(`/api/orders`, {
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