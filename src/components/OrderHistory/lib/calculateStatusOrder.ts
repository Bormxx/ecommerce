export const calculateStatusOrder = (createdDate: string) => {
  const createdDateFormat = new Date(createdDate).getTime();
  const currentDateFormat = new Date();
  const dateOrder = new Date(createdDateFormat + 1000 * 60 * 60 * 24 * 2);
  return dateOrder < currentDateFormat ? "Получен" : "В работе";
};
