export const formattedPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU").format(price);
};
