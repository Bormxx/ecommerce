export const getBasketItems = async () => {
  const response = await fetch('api/basket');
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}