export const formatedDate = (date: string) =>
  new Date(date).toLocaleString("ru", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });